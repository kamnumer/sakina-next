const COL = ['241,220,154', '111,227,220', '255,255,255']
const TAU = Math.PI * 2

// Draws one frame of a layered symmetric pattern. Slow motion only, never flashing.
export function scene(c, w, h, cx, cy, R, s, k, P, still) {
  c.clearRect(0, 0, w, h)
  const fade = P.fade ? Math.max(0.3, 1 - s / 150) : 1
  const gr = c.createRadialGradient(cx, cy, 0, cx, cy, R * (0.6 + 0.5 * k))
  gr.addColorStop(0, `rgba(120,220,210,${0.4 * fade})`)
  gr.addColorStop(1, 'rgba(120,220,210,0)')
  c.fillStyle = gr
  c.fillRect(0, 0, w, h)
  c.lineWidth = 1.2
  for (const L of P.L) {
    const col = COL[L.c || 0], al = (L.a || 0.6) * fade
    const sc = 1 + (L.b || 0) * (k - 0.5) * 2
    const rot = still ? 0 : (L.v || 0) * s
    const n = L.n || 1, r = R * (L.r || 0) * sc
    c.strokeStyle = `rgba(${col},${al})`
    c.fillStyle = `rgba(${col},${al * 0.9})`
    const at = (i, rad = r) => { const a = rot + (i * TAU) / n; return [cx + Math.cos(a) * rad, cy + Math.sin(a) * rad, a] }
    if (L.t === 'ring') { c.beginPath(); c.arc(cx, cy, r, 0, 7); c.stroke() }
    else if (L.t === 'poly') {
      const j = L.j || 1
      c.beginPath()
      for (let i = 0; i <= n; i++) { const a = rot + (i * j * TAU) / n; c.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r) }
      c.stroke()
    } else if (L.t === 'star') {
      const z = R * (L.z || 0.1) * sc, p = L.p || 8
      for (let i = 0; i < n; i++) {
        const [x, y, a] = at(i), sp = a + (still ? 0 : (L.s || 0) * s)
        c.beginPath()
        for (let q = 0; q < p * 2; q++) { const aa = sp + (q * Math.PI) / p, rr = q % 2 ? z * 0.45 : z; c.lineTo(x + Math.cos(aa) * rr, y + Math.sin(aa) * rr) }
        c.closePath(); c.fill()
      }
    } else if (L.t === 'petal') {
      const z = R * (L.z || 0.2) * sc
      for (let i = 0; i < n; i++) { const [x, y, a] = at(i); c.beginPath(); c.ellipse(x, y, z, z * 0.38, a, 0, 7); c.stroke() }
    } else if (L.t === 'dot') {
      for (let i = 0; i < n; i++) { const [x, y] = at(i); c.beginPath(); c.arc(x, y, R * (L.z || 0.02), 0, 7); c.fill() }
    } else if (L.t === 'circ') {
      for (let i = 0; i < n; i++) { const [x, y] = at(i); c.beginPath(); c.arc(x, y, R * (L.z || 0.3) * sc, 0, 7); c.stroke() }
    } else if (L.t === 'rays') {
      const z = R * (L.z || 0.3)
      for (let i = 0; i < n; i++) { const [x, y, a] = at(i); c.beginPath(); c.moveTo(cx + Math.cos(a) * z, cy + Math.sin(a) * z); c.lineTo(x, y); c.stroke() }
    } else if (L.t === 'ripple') {
      for (let i = 0; i < n; i++) {
        const f = still ? (i + 1) / n : (s * (L.v || 0.1) + i / n) % 1
        c.strokeStyle = `rgba(${col},${al * (1 - f)})`
        c.beginPath(); c.arc(cx, cy, R * (L.r || 1) * f, 0, 7); c.stroke()
      }
    }
  }
}
