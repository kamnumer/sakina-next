export default function Header() {
  return (
    <header className="hero">
      <div className="brand">
        <svg className="mark" viewBox="0 0 40 40" aria-hidden="true">
          <rect x="8" y="8" width="24" height="24" rx="2" />
          <rect x="8" y="8" width="24" height="24" rx="2" transform="rotate(45 20 20)" />
          <circle cx="20" cy="20" r="4" />
        </svg>
        <span>Sakina</span>
        <span className="brand-ar" lang="ar">سكينة</span>
      </div>
      <h1>A quiet reset for a <em>noisy</em> mind.</h1>
      <p className="lede">Pick what you need. Breathe with a slow geometric pattern, settle into a gentle frequency, then open the Quran.</p>
      <ol className="steps" aria-label="How a session works">
        <li><b>01</b> Choose a routine</li>
        <li><b>02</b> Put on headphones</li>
        <li><b>03</b> Breathe 4 · 4 · 6</li>
      </ol>
    </header>
  )
}
