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

  // Try to pull images out of the README (best-effort). Prefer absolute URLs,
  // fall back to a raw.githubusercontent.com master path for simple relative
  // links so dialogs can show screenshots included in README files.
  const readmeJson = await safeJson(fetch(`https://api.github.com/repos/${fullName}/readme`))
  let readmeImages = []
  if (readmeJson?.content) {
    try {
      const readme = decodeBase64(readmeJson.content)
      const mdImgRe = /!\[[^\]]*\]\(([^)]+)\)/g
      const htmlImgRe = /<img[^>]+src=["']([^"']+)["'][^>]*>/g
      const set = new Set()
      let m
      while ((m = mdImgRe.exec(readme))) {
        let url = m[1].split(/\s+/)[0]
        if (!/^https?:\/\//i.test(url)) url = `https://raw.githubusercontent.com/${fullName}/master/${url.replace(/^\.\//, '')}`
        set.add(url)
      }
      while ((m = htmlImgRe.exec(readme))) {
        let url = m[1]
        if (!/^https?:\/\//i.test(url)) url = `https://raw.githubusercontent.com/${fullName}/master/${url.replace(/^\.\//, '')}`
        set.add(url)
      }
      readmeImages = Array.from(set).slice(0, 6)
    } catch {
      readmeImages = []
    }
  }

  return { languages, deps, dockerPreview, dockerized: Boolean(dockerPreview), readmeImages }
}

