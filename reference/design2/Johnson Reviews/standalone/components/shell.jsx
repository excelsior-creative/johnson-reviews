// Shared components — shell, nav, footer, tweaks, small UI
const { useState, useEffect, useMemo, useRef } = React;

// --- Router (hash-based) ---
function useRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  useEffect(() => {
    const onHash = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}
function parseHash(h) {
  const clean = (h || '').replace(/^#\/?/, '');
  if (!clean) return { page: 'home' };
  const [page, ...rest] = clean.split('/');
  return { page, param: rest.join('/') };
}
function navigate(path) {
  window.location.hash = '#/' + path;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// --- Wordmark ---
function Wordmark({ size = 22 }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="wordmark" style={{ fontSize: size }}>
        Johnson <span className="amp">&</span> Co.
      </div>
      <div className="wordmark-sub">Reviews · Est. 2019</div>
    </div>
  );
}

// --- Nav ---
function Nav({ currentPage }) {
  const links = [
    { page: 'restaurants', label: 'Restaurants' },
    { page: 'hotels', label: 'Hotels' },
    { page: 'travel', label: 'Travel' },
  ];
  const rightLinks = [
    { page: 'archive', label: 'Archive' },
    { page: 'about', label: 'About' },
    { page: 'newsletter', label: 'Dispatch' },
  ];
  return (
    <>
      <div className="issue-bar">
        <div className="container between" style={{ padding: 0, width: '100%' }}>
          <span>Issue № XLVII · April MMXXVI</span>
          <span>Laguna Beach · California</span>
          <span>72°F · Clear</span>
        </div>
      </div>
      <nav className="nav">
        <div className="container">
          <div className="nav-inner">
            <div className="nav-left">
              {links.map(l => (
                <a key={l.page} href={`#/${l.page}`} className={`nav-link ${currentPage === l.page ? 'active' : ''}`}>
                  {l.label}
                </a>
              ))}
            </div>
            <a href="#/home" style={{ cursor: 'pointer' }}><Wordmark /></a>
            <div className="nav-right">
              {rightLinks.map(l => (
                <a key={l.page} href={`#/${l.page}`} className={`nav-link ${currentPage === l.page ? 'active' : ''}`}>
                  {l.label}
                </a>
              ))}
              <a href="#/search" className="nav-link search" aria-label="Search">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Wordmark />
            <p style={{
              fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 17,
              color: 'var(--ink-dim)', marginTop: 20, maxWidth: 360, lineHeight: 1.5
            }}>
              An independent review publication covering restaurants, hotels, and places worth the trip.
              Written by Brandon Johnson since 2019. No sponsored content. No affiliate links.
            </p>
          </div>
          <div className="footer-col">
            <h4>Sections</h4>
            <ul>
              <li><a href="#/restaurants">Restaurants</a></li>
              <li><a href="#/hotels">Hotels</a></li>
              <li><a href="#/travel">Travel</a></li>
              <li><a href="#/archive">The Archive</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>The Publication</h4>
            <ul>
              <li><a href="#/about">About</a></li>
              <li><a href="#/newsletter">The Dispatch</a></li>
              <li><a href="#/about">Method</a></li>
              <li><a href="#/about">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow</h4>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Google Maps</a></li>
              <li><a href="#">RSS</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© MMXXVI Johnson & Co.</span>
          <span>Set in Playfair · Inter · JetBrains Mono</span>
          <span>All reviews independently reported</span>
        </div>
      </div>
    </footer>
  );
}

// --- Score Disc ---
function ScoreDisc({ score, size = 'md' }) {
  return (
    <div className={`score-disc ${size}`}>
      <div className="score">{score.toFixed(1)}</div>
      <div className="of">Out of 10</div>
    </div>
  );
}

// --- Review Card ---
function ReviewCard({ review, variant = 'default' }) {
  if (variant === 'horizontal') {
    return (
      <a href={`#/review/${review.slug}`} className="review-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 32, alignItems: 'center' }}>
        <div className="photo hover" style={{ aspectRatio: '4/3' }}>
          <img src={review.hero} alt={review.title} loading="lazy" />
        </div>
        <div>
          <div className="cat">{review.category} · {review.location.split(',')[0]}</div>
          <h3 style={{ fontSize: 32 }}>{review.title}</h3>
          <div className="blurb" style={{ fontSize: 18 }}>{review.subtitle}</div>
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
            <ScoreDisc score={review.score} size="sm" />
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
              {review.date} · By Brandon Johnson
            </div>
          </div>
        </div>
      </a>
    );
  }
  return (
    <a href={`#/review/${review.slug}`} className="review-card">
      <div className="photo hover">
        <img src={review.hero} alt={review.title} loading="lazy" />
      </div>
      <div className="cat">{review.category} · {review.location.split(',')[0]}</div>
      <h3>{review.title}</h3>
      <div className="location">{review.neighborhood}</div>
      <div className="blurb">"{review.blurb}"</div>
      <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
          {review.date}
        </div>
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--accent)',
          display: 'flex', alignItems: 'baseline', gap: 2
        }}>
          {review.score.toFixed(1)}
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', color: 'var(--ink-mute)', marginLeft: 4 }}>/10</span>
        </div>
      </div>
    </a>
  );
}

// --- Tweaks Panel ---
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "gold",
  "heroVariant": "editorial"
}/*EDITMODE-END*/;

const ACCENT_PRESETS = {
  gold:    { '--accent': '#c9a961', '--accent-warm': '#d4b97a', '--accent-deep': '#8c7340' },
  terra:   { '--accent': '#c2714a', '--accent-warm': '#d38a63', '--accent-deep': '#8a4d2f' },
  sage:    { '--accent': '#8ba581', '--accent-warm': '#a4bb99', '--accent-deep': '#5e7557' },
  oxblood: { '--accent': '#9a3a3a', '--accent-warm': '#b55050', '--accent-deep': '#6b2727' },
  bone:    { '--accent': '#e4dac5', '--accent-warm': '#ece4d3', '--accent-deep': '#a89d89' },
};

function applyAccent(key) {
  const preset = ACCENT_PRESETS[key] || ACCENT_PRESETS.gold;
  const root = document.documentElement;
  Object.entries(preset).forEach(([k, v]) => root.style.setProperty(k, v));
}

function useTweaks() {
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    applyAccent(tweaks.accent);
    document.documentElement.dataset.heroVariant = tweaks.heroVariant;
  }, [tweaks]);

  useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') setEditMode(true);
      if (e.data.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', onMsg);
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch(e) {}
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const update = (patch) => {
    const next = { ...tweaks, ...patch };
    setTweaks(next);
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*'); } catch(e) {}
  };

  return { tweaks, editMode, update };
}

function TweaksPanel({ tweaks, update }) {
  return (
    <div className="tweaks-panel">
      <h4>Tweaks</h4>
      <div className="tweaks-section">
        <div className="label">Accent Color</div>
        <div className="swatch-row">
          {Object.entries(ACCENT_PRESETS).map(([k, v]) => (
            <button
              key={k}
              className={`swatch ${tweaks.accent === k ? 'active' : ''}`}
              style={{ background: v['--accent'] }}
              onClick={() => update({ accent: k })}
              title={k}
            />
          ))}
        </div>
      </div>
      <div className="tweaks-section">
        <div className="label">Hero Layout</div>
        <div className="variant-row">
          {[
            { k: 'editorial', label: 'Editorial Split' },
            { k: 'cover', label: 'Full-Bleed Cover' },
            { k: 'masthead', label: 'Masthead Index' }
          ].map(o => (
            <button
              key={o.k}
              className={`variant-btn ${tweaks.heroVariant === o.k ? 'active' : ''}`}
              onClick={() => update({ heroVariant: o.k })}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Page Header ---
function PageHeader({ eyebrow, title, italicPart, subtitle, meta }) {
  return (
    <header className="page-header">
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 28 }}>{eyebrow}</div>
        <h1 className="display" style={{ fontSize: 'clamp(48px, 7vw, 96px)', maxWidth: '16ch' }}>
          {title}
          {italicPart && <><br/><span className="display-italic" style={{ color: 'var(--ink-dim)' }}>{italicPart}</span></>}
        </h1>
        {subtitle && <div style={{
          fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--ink-dim)',
          maxWidth: 720, marginTop: 28, lineHeight: 1.45, fontStyle: 'italic'
        }}>{subtitle}</div>}
        {meta && <div style={{ marginTop: 40, display: 'flex', gap: 40, flexWrap: 'wrap' }}>{meta}</div>}
      </div>
    </header>
  );
}

// --- Inline newsletter block ---
function NewsletterInline({ compact = false }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  return (
    <section style={{
      padding: compact ? '60px 0' : '120px 0',
      borderTop: '1px solid var(--rule)',
      borderBottom: '1px solid var(--rule)',
      background: 'var(--bg-raised)'
    }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: 720 }}>
        <div className="kicker" style={{ marginBottom: 24 }}>The Dispatch</div>
        <h2 className="display" style={{ fontSize: compact ? 44 : 64 }}>
          Arrives <span className="display-italic" style={{ color: 'var(--accent)' }}>Sundays.</span>
        </h2>
        <p style={{
          fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--ink-dim)',
          fontStyle: 'italic', marginTop: 20, lineHeight: 1.5
        }}>
          One honest review, one place worth the trip, one note from the field.
          No sponsors, no affiliate links. Unsubscribe any Sunday you'd like.
        </p>
        {submitted ? (
          <div style={{
            marginTop: 32, padding: '20px 0',
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: 20, color: 'var(--accent)'
          }}>
            Welcome to the Dispatch. See you Sunday.
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) setSubmitted(true); }}
            style={{
              marginTop: 40,
              display: 'flex',
              gap: 0,
              maxWidth: 480,
              margin: '40px auto 0',
              borderBottom: '1px solid var(--rule-strong)',
              alignItems: 'center'
            }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--ink)',
                fontFamily: 'var(--serif)',
                fontSize: 20,
                padding: '14px 4px',
                fontStyle: 'italic'
              }}
            />
            <button type="submit" className="btn-ghost btn" style={{ padding: '14px 4px' }}>
              Subscribe <span className="arrow">→</span>
            </button>
          </form>
        )}
        <div className="meta" style={{ marginTop: 24 }}>
          4,281 readers · Free · Reader-supported
        </div>
      </div>
    </section>
  );
}

// Expose to other scripts
Object.assign(window, {
  useRoute, navigate, parseHash,
  Nav, Footer, Wordmark, ScoreDisc, ReviewCard, PageHeader, NewsletterInline,
  useTweaks, TweaksPanel, TWEAK_DEFAULTS, ACCENT_PRESETS, applyAccent
});
