import { useState } from 'react'
import SectionHeading from './SectionHeading'
import { GithubIcon, LinkedinIcon, XIcon, InstagramIcon, MailIcon } from './Icons'

function lastSegment(url) {
  try {
    const u = new URL(url)
    return u.pathname.replace(/\/$/, '').split('/').filter(Boolean).pop() || u.hostname
  } catch {
    return url
  }
}

export default function Contact({ email, linkedin, instagram, twitter, resumeUrl, username }) {
  const [hoveredKey, setHoveredKey] = useState(null)

  const socials = [
    { key: 'email', label: 'Email', Icon: MailIcon, handle: email, href: `mailto:${email}`, external: false },
    { key: 'github', label: 'GitHub', Icon: GithubIcon, handle: username, href: `https://github.com/${username}`, external: true },
    { key: 'linkedin', label: 'LinkedIn', Icon: LinkedinIcon, handle: lastSegment(linkedin), href: linkedin, external: true },
    { key: 'x', label: 'X', Icon: XIcon, handle: lastSegment(twitter), href: twitter, external: true },
    { key: 'instagram', label: 'Instagram', Icon: InstagramIcon, handle: lastSegment(instagram), href: instagram, external: true },
  ]

  return (
    <section id="contact" className="section contact">
      <SectionHeading>contact/</SectionHeading>
      <p className="section-sub">If you need a dev, a debate, or a well-timed coffee referral, I’m available.</p>

      <div className="social-row">
        {socials.map((s) => (
          <a
            key={s.key}
            className="social-item mono"
            href={s.href}
            target={s.external ? '_blank' : undefined}
            rel={s.external ? 'noopener noreferrer' : undefined}
            onMouseEnter={() => setHoveredKey(s.key)}
            onMouseLeave={() => setHoveredKey(null)}
            onFocus={() => setHoveredKey(s.key)}
            onBlur={() => setHoveredKey(null)}
          >
            <span className="social-icon"><s.Icon /></span>
            <span className="social-handle">{s.handle}</span>
            {hoveredKey === s.key && <span className="social-tooltip mono">{s.label}</span>}
          </a>
        ))}
      </div>
    </section>
  )
}
