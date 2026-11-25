'use client'
import { useEffect, useRef, useState } from 'react'
import { MOODS, band } from '../lib/moods'
import { startSession } from '../lib/audio'
import PatternCanvas from './PatternCanvas'
import BrainMap from './BrainMap'

const TA = 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ'
const BI = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'

export default function Console() {
  const [cur, setCur] = useState(null)
  const [live, setLive] = useState(false)
  const [tone, setTone] = useState(true)
  const [brain, setBrain] = useState(false)
  const [ay, setAy] = useState('')
  const [lab, setLab] = useState('Breathe in… 4')
  const ses = useRef(null)

  const begin = () => {
    setLive(true); setAy(TA)
    try { ses.current = startSession(cur, tone) } catch { return }
    ses.current.timers = [setTimeout(() => setAy(BI), 4000), setTimeout(() => setAy(''), 9000)]
  }
  const end = () => { ses.current?.stop(); setLive(false); setBrain(false) }
  const toggleTone = () => { const t = !tone; setTone(t); ses.current?.setTone(t) }

  useEffect(() => {
    const k = (e) => { if (e.key === 'Escape' && live) end() }
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [live])
  useEffect(() => () => ses.current?.stop(), [])

  const bd = cur && band(cur.b)
  return (
    <main>
      <h1>Neuro Reset Console</h1>
      <p className="sub">Set a reset frequency, play the Quran on top, then explore the Quran and Sunnah.</p>
      <h2 className="q">What do you need?</h2>
      <div className="grid" role="group" aria-label="Moods">
        {MOODS.map((m) => (
          <button key={m.n} className={`mood${m.feat ? ' feat' : ''}`} aria-pressed={cur === m} onClick={() => setCur(m)}>
            <b>{m.n}</b>
            <span>{band(m.b)} · {m.b} Hz · {m.s.map((x) => x[0]).join(' + ')}</span>
          </button>
        ))}
      </div>

      <section className="panel" aria-live="polite">
        <h2>{cur ? cur.n : 'Choose what you need'}</h2>
        {cur ? (
          <>
            <PatternCanvas pattern={cur.pat} />
            <dl>
              <dt>Does</dt><dd>{cur.d}</dd>
              <dt>Frequency</dt><dd>{cur.c} Hz carrier · {bd} · {cur.b} Hz beat (headphones)</dd>
              <dt>Opening</dt><dd>Aʿūdhu billāh and Bismillāh over a 432 · 576 · 699 Hz tone, before every surah</dd>
              <dt>Surah</dt><dd>{cur.s.map((x) => <span key={x[2]}>{x[0]} <span className="ar" lang="ar">{x[1]}</span> (#{x[2]}) </span>)}</dd>
              <dt>Why this</dt><dd>{cur.w}</dd>
              <dt>Pattern</dt><dd>{cur.pat.d}</dd>
            </dl>
            <BrainMap band={bd} />
            <button className="btn" onClick={begin}>Start session</button>
          </>
        ) : <p className="facts">Tap a card to see its frequency, pattern, brain-region illustration and surah.</p>}
      </section>
      <p className="note">Use stereo headphones. Binaural beats have modest, mixed evidence, and claims for 432, 528 or 7.83 Hz are not established science, so treat this as a calming routine, not treatment. The brain view is a hypothetical illustration, not a measurement. Surah pairings and notes are starting points: have them reviewed by a qualified teacher. Recitation audio is not added yet.</p>

      {live && (
        <div className="ses" role="dialog" aria-label="Session">
          <PatternCanvas pattern={cur.pat} session onLabel={setLab} />
          <div className="top">{cur.n} · {bd} {cur.b} Hz</div>
          <div className="mid">{brain ? <div className="brainwrap"><BrainMap band={bd} /></div> : <div className="br">{lab}</div>}</div>
          <div className="bot">
            <div className="ay" lang="ar">{ay}</div>
            <div className="ro">
              <div><small>Left ear</small>{cur.c.toFixed(2)} Hz</div>
              <div><small>Right ear</small>{(cur.c + cur.b).toFixed(2)} Hz</div>
              <div><small>Beat</small>{cur.b} Hz · {bd}</div>
              <div><small>Opening</small>432 · 576 · 699 Hz</div>
            </div>
            <div className="tg">
              <a href={`https://quran.com/${cur.s[0][2]}`} target="_blank" rel="noopener noreferrer">Quran</a>
              <button aria-pressed={tone} onClick={toggleTone}>Frequency</button>
              <button aria-pressed={brain} onClick={() => setBrain(!brain)}>Brain</button>
              <button className="end" onClick={end}>End session</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
