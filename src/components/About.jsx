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
              <div className="line-prompt">$ curl -O "mohamed Ashiq S.pdf"</div>
              <div className="line-output">{running ? `downloading... ${progress}%` : 'ready to run'}</div>
              <div style={{ marginTop: 8 }}>
                <button className="lookup-go" onClick={() => { if (!running) { setProgress(0); setRunning(true) } }}>{running ? 'running…' : 'download'}</button>
              </div>
            </div>
          </div>
            
        </div>
      </div>
    </section>
  )
}

const SKILL_DOT_COLORS = ['#e8a33d', '#5fb3b3', '#7fbf7f', '#c574c5', '#e0665f']

const SKILL_ICONS = {
  JavaScript: '🟨', TypeScript: '🔷', Python: '🐍', Java: '☕', SQL: '🗄️',
  React: '⚛️', 'React.js': '⚛️', 'Vue.js': '🟩', 'Node.js': '🟩',
  'Express.js': '🚂', 'Spring Boot': '🌱', 'PostgreSQL': '🐘', MongoDB: '🍃',
  Git: '🔧', Jenkins: '⚙️', AWS: '☁️', Docker: '🐳', Tailwind: '🎨',
}
