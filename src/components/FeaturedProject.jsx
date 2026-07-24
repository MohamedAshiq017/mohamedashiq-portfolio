export default function FeaturedProject({ project, liveRepo }) {
  if (!project) return null
  const link = liveRepo?.html_url || project.repoUrl || null

  return (
    <div className="spotlight">
      <div className="spotlight-eyebrow mono">featured build</div>
      <div className="spotlight-card">
        <div className="spotlight-head">
          <span className="spotlight-title">{project.title}</span>
          <span className="spotlight-tag mono">{project.tagline}</span>
        </div>
        <p className="spotlight-desc">{project.description}</p>
        <div className="spotlight-stack">
          {project.stack.map(s => <span key={s} className="badge">{s}</span>)}
        </div>
        <ul className="spotlight-points">
          {project.points.map((p, i) => (
            <li key={i} className="mono"><span className="diff-plus">+</span> {p}</li>
          ))}
        </ul>
        <div className="spotlight-footer mono">
          <span className="muted">{project.date}</span>
          <span className="spotlight-links">
            {link && <a href={link} target="_blank" rel="noopener noreferrer" className="spotlight-link">↗ view source</a>}
            {(liveRepo?.homepage || project.liveUrl || project.repoUrl) && (
              <a href={liveRepo?.homepage || project.liveUrl || project.repoUrl} target="_blank" rel="noopener noreferrer" className="spotlight-link spotlight-link-live">↗ live demo</a>
            )}
            {!link && !liveRepo?.homepage && !project.liveUrl && (
              <span className="muted small">add a live link in config.featuredProject once hosted</span>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
