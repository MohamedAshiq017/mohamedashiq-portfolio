// Fetches a bit more detail about a single repo, on demand, only when its
// dialog is opened. Every call is best-effort — a private repo, a missing
// file, or a rate-limited request should never break the dialog, so each
// piece degrades to "not found" instead of throwing.

function decodeBase64(content) {
  try {
    return decodeURIComponent(escape(atob(content.replace(/\n/g, ''))))
  } catch {
    return atob(content.replace(/\n/g, ''))
  }
}

async function safeJson(promise) {
  try {
    const res = await promise
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function fetchRepoDetails(fullName) {
  const [languagesJson, packageJson, dockerJson] = await Promise.all([
    safeJson(fetch(`https://api.github.com/repos/${fullName}/languages`)),
    safeJson(fetch(`https://api.github.com/repos/${fullName}/contents/package.json`)),
    safeJson(fetch(`https://api.github.com/repos/${fullName}/contents/Dockerfile`)),
  ])

  const languages = languagesJson ? Object.keys(languagesJson) : []

  let deps = []
  if (packageJson?.content) {
    try {
      const parsed = JSON.parse(decodeBase64(packageJson.content))
      deps = [
        ...Object.keys(parsed.dependencies || {}),
        ...Object.keys(parsed.devDependencies || {}),
      ].slice(0, 14)
    } catch {
      deps = []
    }
  }

  let dockerPreview = null
  if (dockerJson?.content) {
    try {
      dockerPreview = decodeBase64(dockerJson.content)
        .split('\n')
        .filter((line) => line.trim().length > 0)
        .slice(0, 8)
        .join('\n')
    } catch {
      dockerPreview = null
    }
  }

  return { languages, deps, dockerPreview, dockerized: Boolean(dockerPreview) }
}
