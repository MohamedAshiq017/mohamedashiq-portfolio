import { useState, useEffect, useMemo, useRef } from 'react'
import './App.css'
import { CONFIG, TABS } from './config'
import { useTypewriter } from './hooks/useTypewriter'
import { useGithub, defaultOrder } from './hooks/useGithub'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Education from './components/Education'
import Skills from './components/Skills'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import ScrollSparkler from './components/ScrollSparkler'

const OWNER_KEY = 'portfolio_owner'

export default function App() {
  const [active, setActive] = useState('home')
  const [username, setUsername] = useState(CONFIG.githubUsername)
  const [inputVal, setInputVal] = useState(CONFIG.githubUsername)
  const { status, user, repos, error } = useGithub(username)
  const sectionRefs = useRef({})
  const [navOpen, setNavOpen] = useState(false)
  const scrollPause = useRef(null)
  const tipRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Reorder controls are an authoring tool, not something a visitor should
  // see. Visit once with ?owner=1 in the URL and this browser remembers it;
  // everyone else never sees the toggle at all.
  const [isOwner, setIsOwner] = useState(false)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('owner') === '1') {
      try { localStorage.setItem(OWNER_KEY, '1') } catch { /* ignore */ }
    }
    try { setIsOwner(localStorage.getItem(OWNER_KEY) === '1') } catch { setIsOwner(false) }
  }, [])

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0)
      setActive('home')
    }
  }, [])

  const typedLines = useMemo(() => ([
    `> whoami`,
    CONFIG.name,
    `> cat role.txt`,
    CONFIG.role,
    `> echo $TAGLINE`,
    CONFIG.tagline,
  ]), [])

  // Render outputs (the text results) faster while prompts type at normal speed.
  const normalPrompts = useMemo(() => ([`> whoami`, `> cat role.txt`, `> echo $TAGLINE`]), [])
  const fastOutputs = useMemo(() => ([CONFIG.name, CONFIG.role, CONFIG.tagline]), [])
  const { out: normalOut, done: normalDone } = useTypewriter(normalPrompts, 18, 0, 1)
  const { out: fastOut, done: fastDone } = useTypewriter(fastOutputs, 2, 0, 1)
  const typed = useMemo(() => {
    const out = []
    for (let i = 0; i < 3; i++) {
      out.push(normalOut[i] || '')
      out.push(fastOut[i] || '')
    }
    return out
  }, [normalOut, fastOut])
  const typedDone = normalDone && fastDone

  const languages = useMemo(() => {
    const set = new Set()
    repos.forEach(r => r.language && set.add(r.language))
    return ['all', ...Array.from(set)]
  }, [repos])
  const [langFilter, setLangFilter] = useState('all')

  const orderKey = `portfolio_order_${username.toLowerCase()}`
  const [order, setOrder] = useState([])
  const [reorderMode, setReorderMode] = useState(false)
  const dragIdRef = useRef(null)

  useEffect(() => {
    if (status !== 'ok') return
    const nonForks = repos.filter(r => !r.fork)
    let saved = null
    try {
      const raw = localStorage.getItem(orderKey)
      if (raw) saved = JSON.parse(raw)
    } catch { /* ignore */ }
    const liveIds = new Set(nonForks.map(r => r.id))
    if (saved && Array.isArray(saved) && saved.length) {
      const kept = saved.filter(id => liveIds.has(id))
      const missing = nonForks.map(r => r.id).filter(id => !kept.includes(id))
      setOrder([...kept, ...missing])
    } else {
      setOrder(defaultOrder(nonForks, CONFIG.pinnedRepos))
    }
    setLangFilter('all')
    setReorderMode(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, repos, username])

  const orderedRepos = useMemo(() => {
    const byId = new Map(repos.map(r => [r.id, r]))
    let list = order.map(id => byId.get(id)).filter(Boolean)
    if (langFilter !== 'all') list = list.filter(r => r.language === langFilter)
    return list
  }, [order, repos, langFilter])

  // Point-based, not time-based — a raw "2 months ago" can look bad even
  // when nothing's actually wrong, so we surface *which* repo instead of *when*.
  const recentActivity = useMemo(() => {
    if (!repos.length) return null
    const withPush = repos.filter(r => r.pushed_at)
    const sorted = [...withPush].sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    const latestActive = sorted[0] || null
    const deployed = repos.filter(r => r.homepage && r.homepage.trim())
    const deploySorted = [...deployed].sort((a, b) => new Date(b.pushed_at || b.updated_at) - new Date(a.pushed_at || a.updated_at))
    const latestDeployment = deploySorted[0] || null
    if (!latestActive && !latestDeployment) return null
    return {
      latestActiveRepo: latestActive ? { name: latestActive.name, url: latestActive.html_url } : null,
      latestDeployment: latestDeployment ? { name: latestDeployment.name, url: latestDeployment.homepage || latestDeployment.html_url } : null,
    }
  }, [repos])

  function persistOrder(next) {
    setOrder(next)
    try { localStorage.setItem(orderKey, JSON.stringify(next)) } catch { /* ignore */ }
  }

  function handleDragStart(id) { dragIdRef.current = id }

  function handleDrop(targetId) {
    const dragId = dragIdRef.current
    if (dragId == null || dragId === targetId) return
    const current = [...order]
    const from = current.indexOf(dragId)
    const to = current.indexOf(targetId)
    if (from === -1 || to === -1) return
    current.splice(from, 1)
    current.splice(to, 0, dragId)
    persistOrder(current)
  }

  function nudge(id, dir) {
    const current = [...order]
    const i = current.indexOf(id)
    const j = i + dir
    if (i === -1 || j < 0 || j >= current.length) return
    ;[current[i], current[j]] = [current[j], current[i]]
    persistOrder(current)
  }

  function resetOrder() {
    persistOrder(defaultOrder(repos.filter(r => !r.fork), CONFIG.pinnedRepos))
  }

  const scrollTo = (id) => {
    setNavOpen(false)
    const target = document.getElementById(id)
    if (target) {
      if (scrollPause.current) {
        clearTimeout(scrollPause.current)
      }
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: targetTop, behavior: 'smooth' })
      setActive(id)
      scrollPause.current = setTimeout(() => { scrollPause.current = null }, 800)
    }
  }

  useEffect(() => {
    const getActiveSection = () => {
      // Bottom of page check
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
        return TABS[TABS.length - 1].id
      }

      const anchorLine = 120
      const sections = TABS.map((tab) => {
        const el = document.getElementById(tab.id)
        if (!el) return null
        const rect = el.getBoundingClientRect()
        return { id: tab.id, top: rect.top, bottom: rect.bottom }
      }).filter(Boolean)

      if (!sections.length) return 'home'

      let best = sections[0]
      let bestDistance = Math.abs(best.top - anchorLine)
      for (const section of sections) {
        const distance = Math.abs(section.top - anchorLine)
        if (distance < bestDistance) {
          best = section
          bestDistance = distance
        }
      }

      return best.id
    }

    const handleScroll = () => {
      // Update scroll progress
      const winScroll = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0
      setScrollProgress(scrolled)

      if (scrollPause.current) return
      const next = getActiveSection()
      setActive((current) => (current === next ? current : next))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollPause.current) clearTimeout(scrollPause.current)
    }
  }, [])

  const accountAge = user?.created_at
    ? Math.max(1, new Date().getFullYear() - new Date(user.created_at).getFullYear())
    : null

  return (
    <div className="app">
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ height: `${scrollProgress}%` }}>
          <div className="scroll-progress-tip" ref={tipRef} />
          <ScrollSparkler className="scroll-sparkler" width={76} height={160} tipY={90} />
        </div>
      </div>
      <Nav tabs={TABS} active={active} navOpen={navOpen} setNavOpen={setNavOpen} onNavigate={scrollTo} />

      <main>
        <section id="home" ref={el => sectionRefs.current.home = el} className={`section hero ${active === 'home' ? 'active' : ''}`}>
          <Hero
            name={CONFIG.name}
            typed={typed}
            typedDone={typedDone}
            inputVal={inputVal}
            setInputVal={setInputVal}
            onRun={setUsername}
            status={status}
            user={user}
            accountAge={accountAge}
            recentActivity={recentActivity}
            error={error}
          />
        </section>

        <section id="experience" ref={el => sectionRefs.current.experience = el} className={`section ${active === 'experience' ? 'active' : ''}`}>
          <Experience experience={CONFIG.experience} education={CONFIG.education} achievements={CONFIG.achievements} />
        </section>

        <section id="projects" ref={el => sectionRefs.current.projects = el} className={`section ${active === 'projects' ? 'active' : ''}`}>
          <Projects
            status={status}
            error={error}
            username={username}
            languages={languages}
            langFilter={langFilter}
            setLangFilter={setLangFilter}
            repos={repos}
            orderedRepos={orderedRepos}
            reorderMode={reorderMode}
            setReorderMode={setReorderMode}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onNudge={nudge}
            onReset={resetOrder}
            featuredProject={CONFIG.featuredProject}
            isOwner={isOwner}
          />
        </section>

        <section id="skills" ref={el => sectionRefs.current.skills = el} className={`section ${active === 'skills' ? 'active' : ''}`}>
          <Skills skills={CONFIG.skills} />
        </section>

        <section id="education" ref={el => sectionRefs.current.education = el} className={`section ${active === 'education' ? 'active' : ''}`}>
          <Education education={CONFIG.education} achievements={CONFIG.achievements} resumeUrl={CONFIG.resumeUrl} />
        </section>

        <section id="about" ref={el => sectionRefs.current.about = el} className={`section ${active === 'about' ? 'active' : ''}`}>
          <About bio={CONFIG.bio} skills={CONFIG.skills} status={status} username={username} resumeUrl={CONFIG.resumeUrl} />
        </section>

        <section id="contact" ref={el => sectionRefs.current.contact = el} className={`section ${active === 'contact' ? 'active' : ''}`}>
          <Contact email={CONFIG.email} linkedin={CONFIG.linkedin} instagram={CONFIG.instagram} twitter={CONFIG.twitter} resumeUrl={CONFIG.resumeUrl} username={username} />
        </section>
      </main>
    </div>
  )
}
