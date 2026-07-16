import { useEffect, useRef, useState } from 'react'
import { GithubIcon, ExternalIcon, CloseIcon } from './Icons'
import { langColor } from '../config'
import { fetchRepoDetails } from '../lib/repoDetails'

export default function ProjectDialog({ repo, onClose }) {
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imageOk, setImageOk] = useState(true)
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (!repo) return
    let cancelled = false
    setLoading(true)
    setDetails(null)
    setImageOk(true)
    fetchRepoDetails(repo.full_name).then((d) => {
      if (!cancelled) { setDetails(d); setLoading(false) }
    })
    closeBtnRef.current?.focus()
    return () => { cancelled = true }
  }, [repo])

  useEffect(() => {
    if (!repo) return
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [repo, onClose])

  if (!repo) return null

  const ogImage = `https://opengraph.githubassets.com/1/${repo.full_name}`

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div
        className="dialog-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${repo.name} details`}
      >
        <button ref={closeBtnRef} className="dialog-close" onClick={onClose} aria-label="Close dialog">
          <CloseIcon />
        </button>

        {imageOk && (
          <img
            className="dialog-image"
            src={ogImage}
            alt={`${repo.name} preview`}
            loading="lazy"
            onError={() => setImageOk(false)}
          />
        )}

        <div className="dialog-body">
          <div className="dialog-head">
            <span className="card-icon mono">{'{}'}</span>
            <h3 className="dialog-title mono">{repo.name}</h3>
          </div>
          <p className="dialog-desc">{repo.description || 'No description provided.'}</p>

          <div className="dialog-meta mono">
            <span>★ {repo.stargazers_count}</span>
            <span>⑂ {repo.forks_count}</span>
            {repo.language && (
              <span className="meta-item">
                <span className="chip-dot" style={{ background: langColor(repo.language) }} />
                {repo.language}
              </span>
            )}
          </div>

          {loading && <p className="muted mono small dialog-loading">$ reading repo…</p>}

          {!loading && details?.languages?.length > 0 && (
            <div className="dialog-section">
              <div className="ls-header mono">languages</div>
              <div className="ls-items">
                {details.languages.map((l) => (
                  <span key={l} className="badge">
                    <span className="chip-dot" style={{ background: langColor(l) }} /> {l}
                  </span>
                ))}
              </div>
            </div>
          )}

          {!loading && details?.deps?.length > 0 && (
            <div className="dialog-section">
              <div className="ls-header mono">$ cat package.json | jq .dependencies</div>
              <div className="ls-items">
                {details.deps.map((d) => <span key={d} className="badge">{d}</span>)}
              </div>
            </div>
          )}

          {!loading && details?.dockerized && (
            <div className="dialog-section">
              <div className="ls-header mono">🐳 Dockerfile</div>
              <pre className="docker-log mono">{details.dockerPreview}</pre>
            </div>
          )}

          {!loading && !details?.languages?.length && !details?.deps?.length && !details?.dockerized && (
            <p className="muted mono small dialog-loading">no extra manifest detected in the repo root.</p>
          )}

          <div className="dialog-links mono">
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="dialog-link">
              <GithubIcon width={16} height={16} /> {repo.full_name}
            </a>
            {repo.homepage && (
              <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="dialog-link dialog-link-live">
                <ExternalIcon /> live demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
