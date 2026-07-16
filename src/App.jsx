import { useState, useEffect, useMemo, useRef } from 'react'
import './App.css'
import { CONFIG, TABS } from './config'
import { useTypewriter } from './hooks/useTypewriter'
import { useGithub, defaultOrder } from './hooks/useGithub'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Education from './components/Education'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'

const OWNER_KEY = 'portfolio_owner'

export default function App() {
  const [active, setActive] = useState('home')
  const [username, setUsername] = useState(CONFIG.githubUsername)
  const [inputVal, setInputVal] = useState(CONFIG.githubUsername)
  const { status, user, repos } = useGithub(username)
  const sectionRefs = useRef({})
  const [navOpen, setNavOpen] = useState(false)

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

  const typedLines = useMemo(() => ([
    `> whoami`,
    CONFIG.name,
    `> cat role.txt`,
    CONFIG.role,
    `> echo $TAGLINE`,
    CONFIG.tagline,
  ]), [])
  const { out: typed, done: typedDone } = useTypewriter(typedLines, 1, 0)

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
    const latestActiveRepo = sorted[0]?.name || null
    const deployed = repos.filter(r => r.homepage && r.homepage.trim())
    const deploySorted = [...deployed].sort((a, b) => new Date(b.pushed_at || b.updated_at) - new Date(a.pushed_at || a.updated_at))
    const latestDeployment = deploySorted[0]?.name || null
    if (!latestActiveRepo && !latestDeployment) return null
    return { latestActiveRepo, latestDeployment }
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
    setActive(id)
    setNavOpen(false)
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Scroll-spy: keep the tab bar's active state in sync with whatever
  // section is actually in view, not just the last one clicked.
  useEffect(() => {
    const ids = TABS.map(t => t.id)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = ids.find((key) => sectionRefs.current[key] === entry.target)
            if (id) setActive(id)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    ids.forEach((id) => {
      const el = sectionRefs.current[id]
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const accountAge = user?.created_at
    ? Math.max(1, new Date().getFullYear() - new Date(user.created_at).getFullYear())
    : null

  return (
    <div className="app">
      <Nav tabs={TABS} active={active} navOpen={navOpen} setNavOpen={setNavOpen} onNavigate={scrollTo} />

      <main>
        <div ref={el => sectionRefs.current.home = el}>
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
          />
        </div>

        <div ref={el => sectionRefs.current.experience = el}>
          <Experience experience={CONFIG.experience} education={CONFIG.education} achievements={CONFIG.achievements} />
        </div>

        <div ref={el => sectionRefs.current.projects = el}>
          <Projects
            status={status}
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
        </div>

        <div ref={el => sectionRefs.current.education = el}>
          <Education education={CONFIG.education} achievements={CONFIG.achievements} resumeUrl={CONFIG.resumeUrl} />
        </div>

        <div ref={el => sectionRefs.current.about = el}>
          <About bio={CONFIG.bio} skills={CONFIG.skills} status={status} username={username} resumeUrl={CONFIG.resumeUrl} />
        </div>

        <div ref={el => sectionRefs.current.contact = el}>
          <Contact email={CONFIG.email} linkedin={CONFIG.linkedin} instagram={CONFIG.instagram} twitter={CONFIG.twitter} resumeUrl={CONFIG.resumeUrl} username={username} />
        </div>
      </main>
    </div>
  )
}
