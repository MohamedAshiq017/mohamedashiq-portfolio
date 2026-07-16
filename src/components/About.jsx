import { useState } from 'react'
import SectionHeading from './SectionHeading'

export default function About({ bio, skills, status, username }) {
  const [heatmapOk, setHeatmapOk] = useState(true)
  const [statsOk, setStatsOk] = useState(true)
  const [langsOk, setLangsOk] = useState(true)

  const statsParams = new URLSearchParams({
    username,
    show_icons: 'true',
    theme: 'dark',
    hide_border: 'true',
    bg_color: '1c1f26',
    title_color: 'e8a33d',
    text_color: 'e8e6e1',
    icon_color: '5fb3b3',
  }).toString()
  const langParams = new URLSearchParams({
    username,
    layout: 'compact',
    theme: 'dark',
    hide_border: 'true',
    bg_color: '1c1f26',
    title_color: 'e8a33d',
    text_color: 'e8e6e1',
  }).toString()

  return (
    <section id="about" className="section">
      <SectionHeading>about/</SectionHeading>
      <div className="about-grid">
        <div className="about-bio">
          {bio.map((p, i) => <p key={i} className="bio-line">{p}</p>)}
          <div className="ls-block mono">
            <div className="ls-header">$ ls -la ./skills</div>
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat} className="ls-row">
                <span className="ls-cat">{cat}/</span>
                <span className="ls-items">
                  {items.map((item, i) => (
                    <span key={item} className="badge">
                      <span className="chip-dot" style={{ background: SKILL_DOT_COLORS[i % SKILL_DOT_COLORS.length] }} />
                      {item}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="github-panel">
          <div className="ls-header mono">$ git log --graph --contributions</div>
          {status === 'ok' && (
            <>
              <div className="heatmap-wrap">
                {heatmapOk ? (
                  <img
                    className="heatmap-img"
                    src={`https://ghchart.rshah.org/e8a33d/${username}`}
                    alt={`${username}'s GitHub contribution graph`}
                    loading="lazy"
                    onError={() => setHeatmapOk(false)}
                  />
                ) : (
                  <p className="muted mono small">
                    contribution graph unavailable right now — <a className="inline-link" href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">view on GitHub</a>
                  </p>
                )}
              </div>

              {statsOk ? (
                <img
                  className="stats-img"
                  src={`https://github-readme-stats.vercel.app/api?${statsParams}`}
                  alt="GitHub stats"
                  loading="lazy"
                  onError={() => setStatsOk(false)}
                />
              ) : (
                <p className="muted mono small">stats card unavailable right now.</p>
              )}

              {langsOk ? (
                <img
                  className="stats-img"
                  src={`https://github-readme-stats.vercel.app/api/top-langs/?${langParams}`}
                  alt="Most used languages"
                  loading="lazy"
                  onError={() => setLangsOk(false)}
                />
              ) : (
                <p className="muted mono small">language breakdown unavailable right now.</p>
              )}

              <p className="muted mono small">refreshes live from github on every visit</p>
            </>
          )}
          {status !== 'ok' && <p className="muted mono">waiting on github lookup…</p>}
        </div>
      </div>
    </section>
  )
}

const SKILL_DOT_COLORS = ['#e8a33d', '#5fb3b3', '#7fbf7f', '#c574c5', '#e0665f']
