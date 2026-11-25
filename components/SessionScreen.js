'use client'
import { useState } from 'react'
import PatternCanvas from './PatternCanvas'
import BrainMap from './BrainMap'

export default function SessionScreen({ mood, band, ayah, tone, onToggleTone, brain, onToggleBrain, onEnd }) {
  const [label, setLabel] = useState('Breathe in… 4')
  return (
    <div className="ses" role="dialog" aria-modal="true" aria-label={`${mood.n} session`}>
      <PatternCanvas pattern={mood.pat} session onLabel={setLabel} />
      <div className="top">
        <span className="chip">{band} · {mood.b} Hz</span>
        <span>{mood.n}</span>
      </div>
      <div className="mid">
        {brain
          ? <div className="brainwrap"><BrainMap band={band} /></div>
          : <div className="br" aria-live="polite">{label}</div>}
      </div>
      <div className="bot">
        <div className="ay" lang="ar">{ayah}</div>
        <div className="ro">
          <div><small>Left ear</small>{mood.c.toFixed(2)} Hz</div>
          <div><small>Right ear</small>{(mood.c + mood.b).toFixed(2)} Hz</div>
          <div><small>Beat</small>{mood.b} Hz · {band}</div>
          <div><small>Opening</small>432 · 576 · 699 Hz</div>
        </div>
        <div className="tg">
          <a href={`https://quran.com/${mood.s[0][2]}`} target="_blank" rel="noopener noreferrer">Open Quran</a>
          <button type="button" aria-pressed={tone} onClick={onToggleTone}>Frequency</button>
          <button type="button" aria-pressed={brain} onClick={onToggleBrain}>Brain</button>
          <button type="button" className="end" onClick={onEnd}>End session</button>
        </div>
      </div>
    </div>
  )
}
