import { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
import FeaturedProject from './FeaturedProject'
import ProjectDialog from './ProjectDialog'
import SectionHeading from './SectionHeading'
import { langColor } from '../config'

const MOBILE_PROJECT_LIMIT = 6

export default function Projects({
  status, error, username, languages, langFilter, setLangFilter,
  repos, orderedRepos, reorderMode, setReorderMode,
  onDragStart, onDrop, onNudge, onReset, featuredProject, isOwner,
}) {
  const [openRepo, setOpenRepo] = useState(null)
  const [isCompactMobile, setIsCompactMobile] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)

  useEffect(() => {
    const updateViewport = () => {
      const compact = window.innerWidth <= 640
      setIsCompactMobile(compact)
      if (!compact) setShowAllProjects(false)
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  const liveRepo = featuredProject
    ? repos.find(r => r.name.toLowerCase() === featuredProject.repoName.toLowerCase())
    : null
  const visibleRepos = orderedRepos.filter(
    (repo) => !featuredProject || repo.name.toLowerCase() !== featuredProject.repoName.toLowerCase()
  )

  const displayedRepos = isCompactMobile && !showAllProjects
    ? visibleRepos.slice(0, MOBILE_PROJECT_LIMIT)
    : visibleRepos

  return (
    <section id="projects" className="section">
      <SectionHeading>projects/</SectionHeading>

      <FeaturedProject project={featuredProject} liveRepo={liveRepo} />

      <div className="controls-row">
        {languages.length > 1 && (
          <div className="filter-row">
            {languages.map(l => (
              <button
                key={l}
                className={`chip mono ${langFilter === l ? 'chip-active' : ''}`}
                onClick={() => setLangFilter(l)}
              >
                {l !== 'all' && <span className="chip-dot" style={{ background: langColor(l) }} />}
                {l}
              </button>
            ))}
          </div>
        )}
        {isOwner && status === 'ok' && repos.length > 0 && (
          <div className="reorder-controls">
            <button
              className={`chip mono ${reorderMode ? 'chip-active' : ''}`}
              onClick={() => setReorderMode(m => !m)}
            >
              {reorderMode ? '✓ done reordering' : '↕ reorder projects'}
            </button>
            {reorderMode && (
              <button className="chip mono" onClick={onReset}>reset to default</button>
            )}
          </div>
        )}
      </div>

      {status === 'loading' && (
        <div className="term-log mono">
          <div>$ git clone --stats ./repos</div>
          <div className="muted">Cloning into 'repos'... resolving objects…</div>
        </div>
      )}

      {status === 'error' && (
        <div className="term-log mono">
          <div className="err">$ fetch failed: {error || `could not resolve user "${username}"`}</div>
          <div className="muted">Try a different username above or check GitHub API rate limits.</div>
        </div>
      )}

      {status === 'ok' && (
        <>
          <div className={`project-grid ${reorderMode ? 'grid-reorder' : ''}`}>
            {displayedRepos.length === 0 && (
              <p className="muted mono">no public repos match this filter.</p>
            )}
            {displayedRepos.map((repo, idx) => (
              <ProjectCard
                key={repo.id}
                repo={repo}
                index={idx}
                total={displayedRepos.length}
                reorderMode={reorderMode}
                onDragStart={onDragStart}
                onDrop={onDrop}
                onNudge={onNudge}
                onOpen={setOpenRepo}
              />
            ))}
          </div>

          {isCompactMobile && visibleRepos.length > MOBILE_PROJECT_LIMIT && (
            <div className="project-toggle-row">
              <button
                type="button"
                className="chip mono"
                onClick={() => setShowAllProjects(s => !s)}
              >
                {showAllProjects ? 'show less' : 'show more'}
              </button>
            </div>
          )}
        </>
      )}

      <ProjectDialog repo={openRepo} onClose={() => setOpenRepo(null)} />
    </section>
  )
}
