import SectionHeading from './SectionHeading'

export default function Education({ education = [], achievements = [], resumeUrl }) {
  return (
    <section id="education" className="section">
      <SectionHeading>education/</SectionHeading>
      <p className="section-sub">Academic background, certifications, and achievements.</p>

      <div className="timeline">
        {education.map((e, i) => (
          <div key={i} className="commit">
            <div className="commit-line">
              <span className="commit-msg">{e.degree} <span className="muted">@ {e.school}</span></span>
            </div>
            <div className="commit-date mono">{e.period}</div>
            {e.detail && <div className="commit-points"><li className="mono">{e.detail}</li></div>}
          </div>
        ))}
      </div>

      {achievements?.length > 0 && (
        <div className="achievements-block">
          <div className="ls-header mono">$ cat achievements.log</div>
          {achievements.map((a, i) => (
            <div key={i} className="achievement-row">
              <span className="achievement-badge" aria-hidden="true">{a.badge}</span>
              <div className="achievement-body">
                <div className="achievement-title">{a.title}</div>
                <div className="achievement-detail">{a.detail}</div>
                <div className="achievement-date mono">{a.date}</div>
                <div className="ls-items">
                  {a.link && <a href={a.link} target="_blank" rel="noreferrer" className="inline-link">{a.linkLabel || 'link'}</a>}
                  {a.officialLink && <a href={a.officialLink} target="_blank" rel="noreferrer" className="inline-link">{a.officialLabel || 'official'}</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
