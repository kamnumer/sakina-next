import PatternCanvas from './PatternCanvas'
import BrainMap from './BrainMap'

export default function MoodDetail({ mood, band, onStart }) {
  if (!mood) {
    return (
      <div className="panel empty">
        <div className="empty-mark" aria-hidden="true" />
        <h2>Choose a routine</h2>
        <p>Select a card to preview its pattern, frequency, surah and a brain-region illustration.</p>
      </div>
    )
  }

  return (
    <div className="panel">
      <div className="pv-wrap">
        <PatternCanvas pattern={mood.pat} />
        <span className="pv-tag">{mood.pat.d}</span>
      </div>
      <div className="panel-body">
        <p className="eyebrow">{band} · {mood.b} Hz beat</p>
        <h2>{mood.n}</h2>
        <p className="panel-desc">{mood.d}</p>

        <div className="stats">
          <div><small>Carrier</small><b>{mood.c} Hz</b></div>
          <div><small>Beat</small><b>{mood.b} Hz</b></div>
          <div><small>Band</small><b>{band}</b></div>
        </div>

        <div className="surahs">
          {mood.s.map((x) => (
            <div className="surah" key={x[2]}>
              <span className="surah-num">{x[2]}</span>
              <span className="surah-name">{x[0]}</span>
              <span className="ar" lang="ar">{x[1]}</span>
            </div>
          ))}
        </div>

        <dl>
          <dt>Why this</dt><dd>{mood.w}</dd>
          <dt>Opening</dt><dd>Aʿūdhu billāh and Bismillāh over a 432 · 576 · 699 Hz tone, before every surah.</dd>
        </dl>

        <details className="brain-toggle">
          <summary>Brain-region illustration</summary>
          <BrainMap band={band} />
        </details>

        <button type="button" className="btn" onClick={onStart}>
          Start session
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}
