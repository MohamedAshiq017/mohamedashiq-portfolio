import { useState } from 'react'
import ProjectCard from './ProjectCard'
import FeaturedProject from './FeaturedProject'
import ProjectDialog from './ProjectDialog'
import SectionHeading from './SectionHeading'
import { langColor } from '../config'

export default function Projects({
  status, username, languages, langFilter, setLangFilter,
  repos, orderedRepos, reorderMode, setReorderMode,
  onDragStart, onDrop, onNudge, onReset, featuredProject, isOwner,
}) {
  const [openRepo, setOpenRepo] = useState(null)
  const liveRepo = featuredProject
    ? repos.find(r => r.name.toLowerCase() === featuredProject.repoName.toLowerCase())
    : null

  return (
    <section id="projects" className="section">
      <SectionHeading>projects/</SectionHeading>
      <p className="section-sub">All public repositories, live from GitHub. Click a card for the details.</p>

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
          <div className="err">$ fetch failed: could not resolve user "{username}"</div>
          <div className="muted">Try a different username above.</div>
        </div>
      )}

      {status === 'ok' && (
        <div className={`project-grid ${reorderMode ? 'grid-reorder' : ''}`}>
          {orderedRepos.length === 0 && (
            <p className="muted mono">no public repos match this filter.</p>
          )}
          {orderedRepos.map((repo, idx) => (
            <ProjectCard
              key={repo.id}
              repo={repo}
              index={idx}
              total={orderedRepos.length}
              reorderMode={reorderMode}
              onDragStart={onDragStart}
              onDrop={onDrop}
              onNudge={onNudge}
              onOpen={setOpenRepo}
            />
          ))}
        </div>
      )}

      <ProjectDialog repo={openRepo} onClose={() => setOpenRepo(null)} />
    </section>
  )
}
