'use client'
import { useEffect, useRef } from 'react'
import { scene } from '../lib/scene'

// Breath cycle: in 4s, hold 4s, out 6s.
const bk = (s) => { const c = s % 14; return c < 4 ? c / 4 : c < 8 ? 1 : 1 - (c - 8) / 6 }

export default function PatternCanvas({ pattern, session, onLabel }) {
  const ref = useRef(null)
  useEffect(() => {
    const cv = ref.current, g = cv.getContext('2d')
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    const t0 = performance.now()
    let id, last = ''
    const loop = (now) => {
      const w = cv.clientWidth, h = cv.clientHeight, d = devicePixelRatio || 1
      if (w && cv.width !== Math.round(w * d)) { cv.width = Math.round(w * d); cv.height = Math.round(h * d); g.setTransform(d, 0, 0, d, 0, 0) }
      const s = (now - t0) / 1000
      scene(g, w, h, w / 2, session ? h * 0.42 : h / 2, session ? Math.min(w, h) * 0.36 : h * 0.44, s, still ? 0.5 : bk(s), pattern, still)
      if (onLabel) {
        const c = s % 14
        const l = c < 4 ? `Breathe in… ${Math.ceil(4 - c)}` : c < 8 ? `Hold… ${Math.ceil(8 - c)}` : `Breathe out… ${Math.ceil(14 - c)}`
        if (l !== last) { last = l; onLabel(l) }
      }
      id = requestAnimationFrame(loop)
    }
    id = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(id)
  }, [pattern, session, onLabel])
  return <canvas ref={ref} className={session ? 'cvs' : 'pv'} role="img" aria-label="Pattern" />
}
