import { useEffect, useState } from 'react'

const STACK_ICON_SLUGS = {
  React: 'react',
  'Node.js': 'nodedotjs',
  Express: 'express',
  MongoDB: 'mongodb',
  JWT: 'jsonwebtokens',
  Cloudinary: 'cloudinary',
}

function stackIconUrl(name) {
  const slug = STACK_ICON_SLUGS[name]
  return slug ? `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg` : null
}

export default function FeaturedProject({ projects, repos }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const shouldAutoRotate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (projects.length < 2 || !shouldAutoRotate || isHovered || isFocused) return
    const timer = window.setTimeout(() => {
      setActiveIndex((activeIndex + 1) % projects.length)
    }, 4000)
    return () => window.clearTimeout(timer)
  }, [activeIndex, isFocused, isHovered, projects.length, shouldAutoRotate])

  useEffect(() => {
    if (activeIndex >= projects.length) setActiveIndex(0)
  }, [activeIndex, projects.length])

  const project = projects[activeIndex]
  if (!project) return null
  const liveRepo = repos.find(repo => repo.name.toLowerCase() === project.repoName.toLowerCase())
  const sourceLink = project.showSource === false ? null : liveRepo?.html_url || project.repoUrl || null
  const demoLink = liveRepo?.homepage || project.liveUrl || null

  return (
    <div
      className="spotlight"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured builds"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false)
      }}
    >
      <div className="spotlight-toolbar">
        <div className="spotlight-eyebrow mono">featured build</div>
        {projects.length > 1 && (
          <div className="spotlight-controls" role="group" aria-label="Featured build navigation">
            <button
              type="button"
              className="spotlight-control"
              aria-label="Previous featured build"
              title="Previous featured build"
              onClick={() => setActiveIndex(index => (index - 1 + projects.length) % projects.length)}
            >
              ←
            </button>
            <button
              type="button"
              className="spotlight-control"
              aria-label="Next featured build"
              title="Next featured build"
              onClick={() => setActiveIndex(index => (index + 1) % projects.length)}
            >
              →
            </button>
          </div>
        )}
      </div>
      <div className="spotlight-card" role="group" aria-roledescription="slide" aria-label={`${activeIndex + 1} of ${projects.length}`}>
        <div className="spotlight-head">
          <span className="spotlight-title">{project.title}</span>
          <span className="spotlight-tag mono">{project.tagline}</span>
        </div>
        <p className="spotlight-desc">{project.description}</p>
        <div className="spotlight-stack">
          {project.stack.map(s => (
            <span key={s} className="badge">
              {stackIconUrl(s) && <img className="badge-icon" src={stackIconUrl(s)} alt="" aria-hidden="true" />}
              {s}
            </span>
          ))}
        </div>
        <ul className="spotlight-points">
          {project.points.map((p, i) => (
            <li key={i} className="mono"><span className="diff-plus">+</span> {p}</li>
          ))}
        </ul>
        <div className="spotlight-footer mono">
          <span className="muted">{project.date}</span>
          <span className="spotlight-links">
            {sourceLink && <a href={sourceLink} target="_blank" rel="noopener noreferrer" className="spotlight-link">↗ view source</a>}
            {demoLink && (
              <a href={demoLink} target="_blank" rel="noopener noreferrer" className="spotlight-link spotlight-link-live">↗ live demo</a>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
