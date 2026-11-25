// HYPOTHETICAL ILLUSTRATION ONLY. Shows regions typically associated with each EEG band in research.
// It does not measure anyone's brain and does not prove what any audio does.
const OUTLINE = 'M52 118C40 72 88 26 150 28C216 28 264 62 260 116C258 152 232 172 206 172C198 190 172 196 160 182L154 206C150 214 130 214 128 202L126 174C90 178 62 160 52 118Z'

const REGIONS = {
  frontal: { label: 'Frontal', el: <ellipse cx="212" cy="95" rx="50" ry="56" /> },
  motor: { label: 'Motor strip', el: <ellipse cx="172" cy="62" rx="12" ry="32" transform="rotate(15 172 62)" /> },
  parietal: { label: 'Parietal', el: <ellipse cx="135" cy="58" rx="42" ry="30" /> },
  occipital: { label: 'Occipital', el: <ellipse cx="78" cy="108" rx="30" ry="46" /> },
  temporal: { label: 'Temporal', el: <ellipse cx="160" cy="142" rx="52" ry="22" /> },
  thalamus: { label: 'Thalamus (deep)', el: <circle cx="148" cy="104" r="13" /> },
  hippocampus: { label: 'Hippocampus (deep)', el: <ellipse cx="138" cy="132" rx="24" ry="6" transform="rotate(-12 138 132)" /> },
}

const BANDS = {
  Delta: { w: { thalamus: 1, frontal: 0.5 }, t: 'Slow rhythms of deep sleep.' },
  Theta: { w: { frontal: 0.6, hippocampus: 1 }, t: 'Drowsy, dreamy or meditative states.' },
  Alpha: { w: { occipital: 1, parietal: 0.7 }, t: 'Relaxed wakefulness, eyes closed.' },
  Beta: { w: { frontal: 1, motor: 0.8 }, t: 'Active thinking and alertness.' },
  Gamma: { w: { frontal: 0.5, parietal: 0.5, occipital: 0.5, temporal: 0.5, motor: 0.5 }, t: 'Widespread, linked to focused attention.' },
}

export default function BrainMap({ band }) {
  const B = BANDS[band]
  const lit = Object.keys(B.w)
  return (
    <figure className="brain">
      <svg viewBox="0 0 300 220" role="img" aria-label={`Illustration of brain regions typically linked to ${band} waves`}>
        <defs><clipPath id="bc"><path d={OUTLINE} /></clipPath></defs>
        <path d={OUTLINE} className="bo" />
        <g clipPath="url(#bc)">
          {Object.entries(REGIONS).map(([k, r]) => (
            <g key={k} className={B.w[k] ? 'lit' : 'dim'} style={{ opacity: B.w[k] ? 0.25 + B.w[k] * 0.5 : 0.12 }}>{r.el}</g>
          ))}
        </g>
        <text x="268" y="70" className="bt">front</text>
        <text x="20" y="70" className="bt">back</text>
      </svg>
      <figcaption>
        <b>{band}</b>: {B.t}<br />
        Typically linked to: {lit.map((k) => REGIONS[k].label).join(', ')}.
        <small>Illustration only. These are general research associations, not a measurement of you and not proof of what this audio does.</small>
      </figcaption>
    </figure>
  )
}
