export default function Hero({
  name, typed, typedDone, inputVal, setInputVal, onRun,
  status, user, accountAge, recentActivity, error,
}) {
  return (
    <>
      <div className="terminal">
        <div className="terminal-titlebar">
          <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
          <span className="terminal-title mono">bash — {name.toLowerCase().replace(/\s+/g, '-')}</span>
        </div>
        <div className={`terminal-body mono ${!typedDone ? 'decoding' : ''}`}>
          {typed.map((line, i) => (
            <div key={i} className={i % 2 === 0 ? 'line-prompt' : 'line-output'}>
              {i % 2 === 0 ? <span className="prompt-sym">$</span> : null} {line}
            </div>
          ))}
          {typedDone && <span className="cursor-blink">▍</span>}
        </div>
      </div>

      <div className="hero-side">
        <p className="eyebrow mono">// live github lookup</p>
        <label className="lookup mono">
          <span className="prompt-sym">$</span> whoami --user
          <input
            className="lookup-input mono"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && inputVal.trim()) onRun(inputVal.trim()) }}
            placeholder="github-username"
            aria-label="GitHub username"
          />
          <button className="lookup-go mono" onClick={() => inputVal.trim() && onRun(inputVal.trim())}>run</button>
        </label>

        {status === 'loading' && <p className="muted mono">fetching profile…</p>}
        {status === 'error' && <p className="err mono">{`user lookup failed: ${error || 'user not found'}`}</p>}
        {status === 'ok' && user && (
          <>
            <div className="stat-grid">
              <div className="stat"><span className="stat-num mono">{user.public_repos}</span><span className="stat-label">repos</span></div>
              <div className="stat"><span className="stat-num mono">{accountAge}y</span><span className="stat-label">on github</span></div>
            </div>
            {recentActivity?.latestActiveRepo && (
              <p className="muted mono small activity-line">
                ↳ latest active repo: <a className="activity-repo inline-link" href={recentActivity.latestActiveRepo.url} target="_blank" rel="noreferrer">{recentActivity.latestActiveRepo.name}</a>
              </p>
            )}
            {recentActivity?.latestDeployment && (
              <p className="muted mono small activity-line">
                ↳ latest deployment: <a className="activity-repo inline-link" href={recentActivity.latestDeployment.url} target="_blank" rel="noreferrer">{recentActivity.latestDeployment.name}</a>
              </p>
            )}
          </>
        )}
      </div>
    </>
  )
}
