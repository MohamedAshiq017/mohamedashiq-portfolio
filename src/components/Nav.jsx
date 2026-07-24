export default function Nav({ tabs, active, navOpen, setNavOpen, onNavigate }) {
  return (
    <header className="tabbar">
      <div className="tabbar-inner">
        <div className="tabbar-brand mono">~/portfolio</div>
        <nav className={`tabs ${navOpen ? 'tabs-open' : ''}`}>
          {tabs.map(t => (
            <button
              key={t.id}
              className={`tab ${active === t.id ? 'tab-active' : ''}`}
              onClick={() => onNavigate(t.id)}
              aria-current={active === t.id ? 'page' : undefined}
            >
              <span className="tab-dot" aria-hidden="true" />
              {t.label}
            </button>
          ))}
        </nav>
        <button className="nav-toggle mono" onClick={() => setNavOpen(o => !o)} aria-label="Toggle navigation">
          {navOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}
