import { useState, useEffect } from 'react'

export function useGithub(username) {
  const [state, setState] = useState({ status: 'loading', user: null, repos: [] })
  useEffect(() => {
    let cancelled = false
    setState({ status: 'loading', user: null, repos: [] })
    async function run() {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        ])
        if (!uRes.ok || !rRes.ok) throw new Error('lookup failed')
        const user = await uRes.json()
        const repos = await rRes.json()
        if (!cancelled) setState({ status: 'ok', user, repos: Array.isArray(repos) ? repos : [] })
      } catch (e) {
        if (!cancelled) setState({ status: 'error', user: null, repos: [] })
      }
    }
    run()
    return () => { cancelled = true }
  }, [username])
  return state
}

// Builds the default view order: pinnedRepos first (in that exact order),
// then everything else sorted by stars.
export function defaultOrder(repos, pinnedNames) {
  const byName = new Map(repos.map(r => [r.name.toLowerCase(), r]))
  const pinned = pinnedNames
    .map(n => byName.get(n.toLowerCase()))
    .filter(Boolean)
  const pinnedIds = new Set(pinned.map(r => r.id))
  const rest = repos
    .filter(r => !pinnedIds.has(r.id))
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
  return [...pinned, ...rest].map(r => r.id)
}
