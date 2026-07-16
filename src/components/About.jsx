import { useState, useEffect } from 'react'
import SectionHeading from './SectionHeading'

export default function About({ bio, skills, status, username, resumeUrl }) {

  const [progress, setProgress] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    let t
    if (running && progress < 100) {
      t = setTimeout(() => setProgress(p => Math.min(100, p + Math.ceil((100 - p) / 6))), 120)
    }
    if (progress === 100 && running) {
      setRunning(false)
      // kick off resume download if a real URL is provided
      try { if (resumeUrl && resumeUrl !== '#') window.open(resumeUrl, '_blank') } catch {}
    }
    return () => clearTimeout(t)
  }, [running, progress])

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
          <div className="ls-header mono">$ ./resume_download.cron</div>
          <div className="terminal" style={{ marginTop: 12 }}>
            <div className="terminal-titlebar">
              <div className="dot dot-r" />
              <div className="dot dot-y" />
              <div className="dot dot-g" />
              <div className="terminal-title mono">resume-downloader</div>
            </div>
            <div className={`terminal-body mono ${running ? 'decoding' : ''}`}>
              <div className="line-prompt">$ curl -O resume.pdf</div>
              <div className="line-output">{running ? `downloading... ${progress}%` : 'ready to run'}</div>
              <div style={{ marginTop: 8 }}>
                <button className="lookup-go" onClick={() => { if (!running) { setProgress(0); setRunning(true) } }}>{running ? 'running…' : 'run'}</button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10 }} className="muted small">This simulates a small terminal and will start the resume download when it reaches 100%.</div>
        </div>
      </div>
    </section>
  )
}

const SKILL_DOT_COLORS = ['#e8a33d', '#5fb3b3', '#7fbf7f', '#c574c5', '#e0665f']
