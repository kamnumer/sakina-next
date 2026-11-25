import { band } from '../lib/moods'

export default function MoodGrid({ moods, current, onSelect }) {
  return (
    <div className="grid" role="group" aria-label="Routines">
      {moods.map((m) => (
        <button
          key={m.n}
          type="button"
          className={`mood${m.feat ? ' feat' : ''}`}
          aria-pressed={current === m}
          onClick={() => onSelect(m)}
        >
          <span className="mood-top">
            <span className="chip">{band(m.b)} · {m.b} Hz</span>
            {m.feat && <span className="chip gold">Featured</span>}
          </span>
          <span className="mood-name">{m.n}</span>
          <span className="mood-desc">{m.d}</span>
          <span className="mood-surah">
            <span>{m.s.map((x) => x[0]).join(' + ')}</span>
            <span className="ar" lang="ar">{m.s.map((x) => x[1]).join(' · ')}</span>
          </span>
        </button>
      ))}
    </div>
  )
}
