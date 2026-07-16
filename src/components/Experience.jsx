import SectionHeading from './SectionHeading'

export default function Experience({ experience, education, achievements }) {
  return (
    <section id="experience" className="section">
      <SectionHeading>experience/</SectionHeading>
      <p className="section-sub mono">$ git log --author="me" --pretty=full</p>

      <div className="timeline">
        {experience.map((job, i) => (
          <div key={i} className="commit">
            <div className="commit-line">
              <span className="commit-msg">{job.role} <span className="muted">@ {job.company}</span></span>
            </div>
            <div className="commit-date mono">{job.period}</div>
            <ul className="commit-points">
              {job.points.map((p, j) => (
                <li key={j} className="mono"><span className="diff-plus">+</span> {p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {education?.length > 0 && (
        <div className="edu-block">
          <div className="ls-header mono">$ cat education.log</div>
          {education.map((e, i) => (
            <div key={i} className="edu-row">
              <span className="edu-degree">{e.degree}</span>
              <span className="muted"> — {e.school}</span>
              <span className="edu-period mono">{e.period}</span>
              {e.detail && <div className="edu-detail mono">{e.detail}</div>}
            </div>
          ))}
        </div>
      )}

      {achievements?.length > 0 && (
        <div className="achievements-block">
          <div className="ls-header mono">$ cat recognition.log</div>
          {achievements.map((a, i) => (
            <div key={i} className="achievement-row">
              <span className="achievement-badge" aria-hidden="true">{a.badge}</span>
              <div className="achievement-body">
                <div className="achievement-title">{a.title}</div>
                <div className="achievement-detail">{a.detail}</div>
                <div className="achievement-date mono">{a.date}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
