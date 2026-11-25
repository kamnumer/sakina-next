const TAU = Math.PI * 2

// Layer tone: [saturation, lightness, hue offset] for c = 0 (gold), 1 (coral), 2 (pale light)
const TONE = [[95, 66, 0], [88, 64, 0.35], [80, 90, 0.6]]

// Sunset hue band: magenta (330) through coral and orange to amber (45), looping smoothly.
const sunset = (t) => 330 + 75 * (0.5 - 0.5 * Math.cos(TAU * t))

const paint = (c, t, al) => {
  const [sat, lit, off] = TONE[c] || TONE[0]
  return `hsla(${sunset(t + off).toFixed(1)},${sat}%,${lit}%,${al})`
}

// Draws one frame of a layered symmetric pattern. Slow motion only, never flashing.
// Colours are tied to each element's angle, so they sweep around as the layer rotates.
export function scene(c, w, h, cx, cy, R, s, k, P, still) {
  c.clearRect(0, 0, w, h)
  const fade = P.fade ? Math.max(0.3, 1 - s / 150) : 1
  const drift = still ? 0 : s * 0.012
  const gr = c.createRadialGradient(cx, cy, 0, cx, cy, R * (0.6 + 0.5 * k))
  gr.addColorStop(0, `hsla(${sunset(drift + 0.6).toFixed(1)},95%,62%,${0.42 * fade})`)
  gr.addColorStop(0.55, `hsla(${sunset(drift).toFixed(1)},85%,45%,${0.16 * fade})`)
  gr.addColorStop(1, 'hsla(330,80%,30%,0)')
  c.fillStyle = gr
  c.fillRect(0, 0, w, h)
  c.lineWidth = 1.2
  P.L.forEach((L, li) => {
    const tone = L.c || 0, al = (L.a || 0.6) * fade
    const sc = 1 + (L.b || 0) * (k - 0.5) * 2
    const rot = still ? 0 : (L.v || 0) * s
    const n = L.n || 1, r = R * (L.r || 0) * sc
    const base = drift + li * 0.13
    const tAt = (a) => base + a / TAU
    const at = (i, rad = r) => { const a = rot + (i * TAU) / n; return [cx + Math.cos(a) * rad, cy + Math.sin(a) * rad, a] }
    const set = (t, alpha = al) => { c.strokeStyle = paint(tone, t, alpha); c.fillStyle = paint(tone, t, alpha * 0.9) }

    if (L.t === 'ring') {
      const seg = 48
      for (let i = 0; i < seg; i++) {
        const a0 = rot + (i * TAU) / seg
        set(tAt(a0))
        c.beginPath(); c.arc(cx, cy, r, a0, a0 + TAU / seg + 0.01); c.stroke()
      }
    } else if (L.t === 'poly') {
      const j = L.j || 1
      for (let i = 0; i < n; i++) {
        const a0 = rot + (i * j * TAU) / n, a1 = rot + ((i + 1) * j * TAU) / n
        set(tAt(rot + (i * TAU) / n))
        c.beginPath()
        c.moveTo(cx + Math.cos(a0) * r, cy + Math.sin(a0) * r)
        c.lineTo(cx + Math.cos(a1) * r, cy + Math.sin(a1) * r)
        c.stroke()
      }
    } else if (L.t === 'star') {
      const z = R * (L.z || 0.1) * sc, p = L.p || 8
      for (let i = 0; i < n; i++) {
        const [x, y, a] = at(i), sp = a + (still ? 0 : (L.s || 0) * s)
        set(tAt(a))
        c.beginPath()
        for (let q = 0; q < p * 2; q++) { const aa = sp + (q * Math.PI) / p, rr = q % 2 ? z * 0.45 : z; c.lineTo(x + Math.cos(aa) * rr, y + Math.sin(aa) * rr) }
        c.closePath(); c.fill()
      }
    } else if (L.t === 'petal') {
      const z = R * (L.z || 0.2) * sc
      for (let i = 0; i < n; i++) { const [x, y, a] = at(i); set(tAt(a)); c.beginPath(); c.ellipse(x, y, z, z * 0.38, a, 0, 7); c.stroke() }
    } else if (L.t === 'dot') {
      for (let i = 0; i < n; i++) { const [x, y, a] = at(i); set(tAt(a)); c.beginPath(); c.arc(x, y, R * (L.z || 0.02), 0, 7); c.fill() }
    } else if (L.t === 'circ') {
      for (let i = 0; i < n; i++) { const [x, y, a] = at(i); set(tAt(a)); c.beginPath(); c.arc(x, y, R * (L.z || 0.3) * sc, 0, 7); c.stroke() }
    } else if (L.t === 'rays') {
      const z = R * (L.z || 0.3)
      for (let i = 0; i < n; i++) { const [x, y, a] = at(i); set(tAt(a)); c.beginPath(); c.moveTo(cx + Math.cos(a) * z, cy + Math.sin(a) * z); c.lineTo(x, y); c.stroke() }
    } else if (L.t === 'ripple') {
      for (let i = 0; i < n; i++) {
        const f = still ? (i + 1) / n : (s * (L.v || 0.1) + i / n) % 1
        c.strokeStyle = paint(tone, base + f * 0.5, al * (1 - f))
        c.beginPath(); c.arc(cx, cy, R * (L.r || 1) * f, 0, 7); c.stroke()
      }
    }
  })
}
