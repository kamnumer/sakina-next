let ctx

// Opening tone (432 / 576 / 699 Hz) then a binaural beat: left = carrier, right = carrier + beat.
export function startSession(m, toneOn) {
  ctx = ctx || new (window.AudioContext || window.webkitAudioContext)()
  ctx.resume?.()
  const t = ctx.currentTime, oscs = []
  const mk = (f, pan, g) => {
    const o = ctx.createOscillator(), p = ctx.createStereoPanner()
    o.frequency.value = f; p.pan.value = pan
    o.connect(p).connect(g); o.start(); oscs.push(o)
  }
  const open = ctx.createGain()
  open.gain.setValueAtTime(0, t)
  open.gain.linearRampToValueAtTime(0.09, t + 2)
  open.gain.linearRampToValueAtTime(0.09, t + 6)
  open.gain.linearRampToValueAtTime(0, t + 9)
  open.connect(ctx.destination)
  ;[432, 576, 699].forEach((f) => mk(f, 0, open))
  const beat = ctx.createGain()
  beat.gain.setValueAtTime(0, t)
  beat.gain.linearRampToValueAtTime(toneOn ? 0.14 : 0, t + 14)
  beat.connect(ctx.destination)
  mk(m.c, -1, beat); mk(m.c + m.b, 1, beat)
  return {
    timers: [],
    setTone(on) {
      const n = ctx.currentTime
      beat.gain.cancelScheduledValues(n)
      beat.gain.setValueAtTime(beat.gain.value, n)
      beat.gain.linearRampToValueAtTime(on ? 0.14 : 0, n + 0.3)
    },
    stop() { this.timers.forEach(clearTimeout); oscs.forEach((o) => { try { o.stop() } catch {} }) },
  }
}
