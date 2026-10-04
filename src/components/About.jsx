import SectionHeading from './SectionHeading'

function resumeDownloadUrl(url) {
  if (!url) return '#'
  try {
    const parsedUrl = new URL(url)
    if (parsedUrl.hostname.endsWith('dropbox.com')) parsedUrl.searchParams.set('dl', '1')
    return parsedUrl.href
  } catch {
    return url
  }
}

export default function About({ bio, resumeUrl }) {

  return (
    <section id="about" className="section">
      <SectionHeading>about/</SectionHeading>
      <div className="about-grid">
        <div className="about-bio">
          {bio.map((p, i) => <p key={i} className="bio-line">{p}</p>)}
        </div>

        <div className="github-panel resume-terminal-panel">
          <div className="ls-header mono">$ ./resume_download.cron</div>
          <div className="terminal resume-terminal">
            <div className="terminal-titlebar">
              <div className="dot dot-r" />
              <div className="dot dot-y" />
              <div className="dot dot-g" />
              <div className="terminal-title mono">resume-downloader</div>
            </div>
            <div className="terminal-body mono">
              <div className="line-prompt">$ curl -O "Mohamed-Ashiq-S.pdf"</div>
              <div className="line-output">resume.pdf ready to download</div>
              {resumeUrl && resumeUrl !== '#' && (
                <a
                  className="resume-download-button mono"
                  href={resumeDownloadUrl(resumeUrl)}
                  aria-label="Download resume PDF"
                >
                  <span className="resume-download-face" aria-hidden="true" />
                  <span className="resume-download-icon" aria-hidden="true">↓</span>
                  <span>download resume</span>
                  <span className="resume-download-format">PDF ↗</span>
                </a>
              )}
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
