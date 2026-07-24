import { useEffect, useState } from 'react'

// Matrix-flavored glyphs used for the brief scramble before each real
// character locks in — nods to the "decoding" look without a literal
// falling-rain animation, which would fight the terminal-window aesthetic.
const GLYPHS = '01アイウエオカキクケコ$#%&*+=<>/\\'
const randGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export function useTypewriter(lines, speed = 9, startDelay = 200, parallelGroups = 1) {
  const [out, setOut] = useState([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false
    const result = lines.map(() => '')
    setOut([...result])
    setDone(false)

    const SCRAMBLE_STEPS = 2
    const SCRAMBLE_DELAY = Math.max(4, Math.floor(speed / 2))
    const REVEAL_DELAY = Math.max(3, Math.floor(speed / 1.5))

    // groupCount indicates how many parallel groups we should run.
    // Lines are assumed to be interleaved per group (e.g. group0-line0, group1-line0...).
    const groups = []
    if (parallelGroups <= 1) {
      groups.push(lines.map((_, idx) => idx))
    } else {
      // partition indices into parallelGroups buckets preserving order
      for (let g = 0; g < parallelGroups; g++) {
        groups.push([])
      }
      for (let i = 0; i < lines.length; i++) {
        groups[i % parallelGroups].push(i)
      }
    }

    async function typeIndex(idx) {
      const line = lines[idx]
      for (let i = 0; i < line.length; i++) {
        if (cancelled) return
        for (let s = 0; s < SCRAMBLE_STEPS; s++) {
          if (cancelled) return
          result[idx] = line.slice(0, i) + randGlyph()
          setOut([...result])
          await wait(SCRAMBLE_DELAY)
        }
        result[idx] = line.slice(0, i + 1)
        setOut([...result])
        await wait(REVEAL_DELAY)
      }
    }

    async function runGroup(indices) {
      for (let j = 0; j < indices.length; j++) {
        if (cancelled) return
        await typeIndex(indices[j])
        await wait(120)
      }
    }

    async function runAll() {
      await wait(startDelay)
      await Promise.all(groups.map(g => runGroup(g)))
      if (!cancelled) setDone(true)
    }

    runAll()
    return () => { cancelled = true }
  }, [lines, speed, startDelay, parallelGroups])

  return { out, done }
}
