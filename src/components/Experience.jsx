import SectionHeading from './SectionHeading'

export default function Experience({ experience }) {
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

      {/* Education and achievements moved to a dedicated Education section */}
    </section>
  )
}
