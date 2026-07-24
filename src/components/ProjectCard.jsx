import { langColor } from '../config'
import { ExternalIcon } from './Icons'

function formatCardDate(value) {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function ProjectCard({ repo, index, total, reorderMode, onDragStart, onDrop, onNudge, onOpen }) {
  const cardDate = formatCardDate(repo.updated_at || repo.created_at)

  return (
    <div
      className={`card ${reorderMode ? 'card-draggable' : ''}`}
      draggable={reorderMode}
      onDragStart={() => onDragStart(repo.id)}
      onDragOver={(e) => reorderMode && e.preventDefault()}
      onDrop={() => reorderMode && onDrop(repo.id)}
    >
      {reorderMode && (
        <div className="drag-handle mono">
          <button aria-label="Move up" onClick={() => onNudge(repo.id, -1)} disabled={index === 0}>▲</button>
          <span>⠿ drag</span>
          <button aria-label="Move down" onClick={() => onNudge(repo.id, 1)} disabled={index === total - 1}>▼</button>
        </div>
      )}
      <button
        type="button"
        className="card-body"
        onClick={() => !reorderMode && onOpen(repo)}
      >
        <div className="card-head">
          <span className="card-name mono">{repo.name}</span>
          {cardDate && <span className="card-date mono">{cardDate}</span>}
        </div>
        <p className="card-desc">{repo.description || 'No description provided.'}</p>
        <div className="card-meta mono">
          {repo.language && (
            <span className="meta-item">
              <span className="chip-dot" style={{ background: langColor(repo.language) }} />
              {repo.language}
            </span>
          )}
          {repo.homepage && (
            <a className="meta-item meta-live" href={repo.homepage} target="_blank" rel="noopener noreferrer">
              <ExternalIcon /> live
            </a>
          )}
        </div>
      </button>
    </div>
  )
}
