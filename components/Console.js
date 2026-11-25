'use client'
import { useEffect, useRef, useState } from 'react'
import { MOODS, band } from '../lib/moods'
import { startSession } from '../lib/audio'
import Header from './Header'
import MoodGrid from './MoodGrid'
import MoodDetail from './MoodDetail'
import SessionScreen from './SessionScreen'

const TA = 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ'
const BI = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'

export default function Console() {
  const [cur, setCur] = useState(null)
  const [live, setLive] = useState(false)
  const [tone, setTone] = useState(true)
  const [brain, setBrain] = useState(false)
  const [ay, setAy] = useState('')
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
    <main className="shell">
      <Header />
      <div className="layout">
        <section aria-labelledby="need" className="col-moods">
          <div className="sec-head">
            <h2 id="need">What do you need?</h2>
            <p>{MOODS.length} routines</p>
          </div>
          <MoodGrid moods={MOODS} current={cur} onSelect={setCur} />
        </section>
        <aside className="col-detail" aria-live="polite">
          <MoodDetail mood={cur} band={bd} onStart={begin} />
        </aside>
      </div>
      <footer className="note">
        <p>Use stereo headphones. Binaural beats have modest, mixed evidence, and claims for 432, 528 or 7.83 Hz are not established science, so treat this as a calming routine, not treatment. The brain view is a hypothetical illustration, not a measurement. Surah pairings and notes are starting points: have them reviewed by a qualified teacher. Recitation audio is not added yet.</p>
      </footer>

      {live && (
        <SessionScreen
          mood={cur} band={bd} ayah={ay}
          tone={tone} onToggleTone={toggleTone}
          brain={brain} onToggleBrain={() => setBrain(!brain)}
          onEnd={end}
        />
      )}
    </main>
  )
}
