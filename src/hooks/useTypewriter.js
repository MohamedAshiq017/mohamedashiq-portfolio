import { useEffect, useState } from 'react'

// Matrix-flavored glyphs used for the brief scramble before each real
// character locks in — nods to the "decoding" look without a literal
// falling-rain animation, which would fight the terminal-window aesthetic.
const GLYPHS = '01アイウエオカキクケコ$#%&*+=<>/\\'
const randGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export function useTypewriter(lines, speed = 9, startDelay = 200) {
  const [out, setOut] = useState([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false
    const result = lines.map(() => '')
    setOut([...result])
    setDone(false)

    const SCRAMBLE_STEPS = 2
    const SCRAMBLE_DELAY = Math.max(7, speed)
    const REVEAL_DELAY = speed

    async function typeLine(lineIdx) {
      const line = lines[lineIdx]
      for (let i = 0; i < line.length; i++) {
        if (cancelled) return
        for (let s = 0; s < SCRAMBLE_STEPS; s++) {
          if (cancelled) return
          result[lineIdx] = line.slice(0, i) + randGlyph()
          setOut([...result])
          await wait(SCRAMBLE_DELAY)
        }
        result[lineIdx] = line.slice(0, i + 1)
        setOut([...result])
        await wait(REVEAL_DELAY)
      }
    }

    async function run() {
      await wait(startDelay)
      for (let l = 0; l < lines.length; l++) {
        if (cancelled) return
        await typeLine(l)
        await wait(180)
      }
      if (!cancelled) setDone(true)
    }

    run()
    return () => { cancelled = true }
  }, [lines, speed, startDelay])

  return { out, done }
}
