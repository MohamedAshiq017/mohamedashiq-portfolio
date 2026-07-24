import SectionHeading from './SectionHeading'

const SKILL_MAP = {
  JavaScript: ['javascript', 'F7DF1E', '000'],
  TypeScript: ['typescript', '3178C6', 'fff'],
  Java: ['java', '007396', 'fff', 'iconify'],
  Python: ['python', '3776AB', 'fff'],
  SQL: ['postgresql', '4169E1', 'fff'],
  'React.js': ['react', '61DAFB', '000'],
  'Vue.js': ['vuedotjs', '4FC08D', 'fff'],
  Bootstrap: ['bootstrap', '7952B3', 'fff'],
  'Tailwind CSS': ['tailwindcss', '06B6D4', 'fff'],
  EJS: ['ejs', 'B4CA65', '000'],
  'Node.js': ['nodedotjs', '339933', 'fff'],
  'Express.js': ['express', '000000', 'fff'],
  'Spring Boot': ['springboot', '6DB33F', 'fff'],
  'REST APIs': ['fastapi', '009688', 'fff'],
  PostgreSQL: ['postgresql', '4169E1', 'fff'],
  MongoDB: ['mongodb', '47A248', 'fff'],
  MySQL: ['mysql', '4479A1', 'fff'],
  Git: ['git', 'F05032', 'fff'],
  Jenkins: ['jenkins', 'D24939', 'fff'],
  Maven: ['apachemaven', 'C71A36', 'fff'],
  Postman: ['postman', 'FF6C37', 'fff'],
  'AWS CodeCommit': ['amazonaws', '232F3E', 'fff'],
  Claude: ['claude', '111111', 'fff'],
}

function getBadgeData(name) {
  const entry = SKILL_MAP[name]
  if (!entry) {
    return { bg: '1c1f26', fg: 'fff', iconSlug: null }
  }
  const [slug, bg, fg] = entry
  return { bg, fg, iconSlug: slug }
}

function skillBadgeIconUrl(slug) {
  return slug ? `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg` : null
}

export default function Skills({ skills }) {
  return (
    <section id="skills" className="section">
      <SectionHeading>skills/</SectionHeading>

      <div className="ls-block">
        {Object.entries(skills).map(([cat, items]) => (
          <div key={cat} className="ls-row">
            <span className="ls-cat">{cat}/</span>
            <span className="ls-items">
              {items.map((item) => {
                const { bg, fg, iconSlug } = getBadgeData(item)
                return (
                  <span
                    key={item}
                    className="skill-badge"
                    title={item}
                    style={{ backgroundColor: `#${bg}`, color: `#${fg}` }}
                  >
                    {iconSlug && (
                      <img
                        className="skill-badge-icon"
                        src={skillBadgeIconUrl(iconSlug)}
                        alt=""
                        aria-hidden="true"
                      />
                    )}
                    <span className="skill-badge-label">{item}</span>
                  </span>
                )
              })}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
