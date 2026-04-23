// Homepage
const { useState: useStateH } = React;

function HomeHero({ variant, lead }) {
  if (variant === 'cover') {
    return (
      <section style={{ position: 'relative', marginBottom: 80 }}>
        <div style={{ position: 'relative', height: 'min(82vh, 880px)', overflow: 'hidden' }}>
          <img src={lead.hero} alt={lead.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(15,13,11,0.25) 0%, rgba(15,13,11,0.1) 40%, rgba(15,13,11,0.95) 100%)'
          }} />
          <div style={{
            position: 'absolute', bottom: 60, left: 0, right: 0,
          }}>
            <div className="container">
              <div style={{ maxWidth: 900 }}>
                <div className="kicker" style={{ marginBottom: 20 }}>The Feature · {lead.category}</div>
                <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 128px)', color: 'var(--ink)' }}>
                  {lead.title.split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="display-italic" style={{ color: 'var(--accent)' }}>
                    {lead.title.split(' ').slice(-1)[0]}
                  </span>
                </h1>
                <div style={{
                  fontFamily: 'var(--serif)', fontSize: 24, fontStyle: 'italic',
                  color: 'var(--ink-dim)', marginTop: 24, maxWidth: 720, lineHeight: 1.4
                }}>
                  {lead.subtitle}
                </div>
                <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 32 }}>
                  <ScoreDisc score={lead.score} size="lg" />
                  <div>
                    <div className="meta">{lead.location}</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--ink)', marginTop: 6 }}>
                      {lead.neighborhood}
                    </div>
                    <a href={`#/review/${lead.slug}`} className="btn" style={{ marginTop: 20 }}>
                      Read the Review <span className="arrow">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'masthead') {
    return (
      <section style={{ padding: '60px 0 100px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="kicker">The Index · This Month</div>
            <h1 className="display" style={{ fontSize: 'clamp(80px, 12vw, 180px)', marginTop: 24, lineHeight: 0.9 }}>
              Places we <span className="display-italic" style={{ color: 'var(--accent)' }}>loved.</span>
            </h1>
            <div style={{
              fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22,
              color: 'var(--ink-dim)', marginTop: 24, maxWidth: 640, margin: '24px auto 0'
            }}>
              A running index of the year's most essential meals, rooms, and cities — in the order we'd return to them.
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
            {window.JR_DATA.reviews.slice(0, 6).map((r, i) => (
              <a key={r.id} href={`#/review/${r.slug}`} style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 1fr 120px 80px',
                gap: 32,
                padding: '28px 0',
                borderBottom: i < 5 ? '1px solid var(--rule)' : 'none',
                alignItems: 'center',
                transition: 'padding 0.25s',
                cursor: 'pointer'
              }}
              onMouseEnter={e => { e.currentTarget.style.paddingLeft = '16px'; }}
              onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0'; }}
              >
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-mute)', letterSpacing: '0.14em' }}>
                  N° {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <div className="meta">{r.category}</div>
                  <div className="display" style={{ fontSize: 32, marginTop: 6 }}>{r.title}</div>
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink-dim)', fontSize: 18 }}>
                  "{r.blurb}"
                </div>
                <div className="meta">{r.location.split(',')[0]}</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 26, color: 'var(--accent)', textAlign: 'right' }}>
                  {r.score.toFixed(1)}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // editorial split (default)
  return (
    <section style={{ padding: '60px 0 100px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="kicker" style={{ marginBottom: 28 }}>The Feature · {lead.category}</div>
            <h1 className="display" style={{ fontSize: 'clamp(56px, 7vw, 112px)' }}>
              {lead.title}
            </h1>
            <div style={{ marginTop: 12, fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.22em', color: 'var(--ink-mute)', textTransform: 'uppercase' }}>
              {lead.location} · {lead.date}
            </div>
            <p style={{
              fontFamily: 'var(--serif)', fontSize: 24, fontStyle: 'italic',
              color: 'var(--ink-dim)', marginTop: 32, lineHeight: 1.45
            }}>
              {lead.subtitle}
            </p>
            <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 28 }}>
              <ScoreDisc score={lead.score} size="lg" />
              <div style={{ borderLeft: '1px solid var(--rule-strong)', paddingLeft: 24 }}>
                <div className="meta">The Verdict</div>
                <div style={{
                  fontFamily: 'var(--serif)', fontSize: 20, marginTop: 8,
                  color: 'var(--accent)', fontStyle: 'italic'
                }}>
                  Essential. Worth the drive.
                </div>
                <a href={`#/review/${lead.slug}`} className="btn" style={{ marginTop: 16 }}>
                  Read the Review <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </div>
          <div className="photo" style={{ aspectRatio: '4/5' }}>
            <img src={lead.hero} alt={lead.title} />
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const data = window.JR_DATA;
  const [tab, setTab] = useStateH('all');
  const lead = data.reviews[0];

  const recent = data.reviews.slice(1, 7);
  const categoryTabs = [
    { k: 'all', label: 'All' },
    { k: 'Restaurants', label: 'Restaurants' },
    { k: 'Hotels', label: 'Hotels' },
    { k: 'Travel', label: 'Travel' },
  ];
  const filtered = tab === 'all' ? recent : data.reviews.filter(r => r.category === tab).slice(0, 6);

  const heroVariant = document.documentElement.dataset.heroVariant || 'editorial';

  return (
    <div className="page-body">
      <HomeHero variant={heroVariant} lead={lead} />

      {/* Section: The Latest */}
      <section style={{ padding: '40px 0 100px' }}>
        <div className="container">
          <div className="between" style={{ marginBottom: 40, alignItems: 'flex-end' }}>
            <div>
              <div className="kicker" style={{ marginBottom: 12 }}>The Latest</div>
              <h2 className="display" style={{ fontSize: 56 }}>
                Reviews <span className="display-italic" style={{ color: 'var(--ink-dim)' }}>this month.</span>
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              {categoryTabs.map(t => (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k)}
                  className="nav-link"
                  style={{
                    color: tab === t.k ? 'var(--accent)' : 'var(--ink-dim)',
                    borderBottom: tab === t.k ? '1px solid var(--accent)' : '1px solid transparent',
                    paddingBottom: 6,
                    transition: 'all 0.2s'
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 48
          }}>
            {filtered.map(r => <ReviewCard key={r.id} review={r} />)}
          </div>
        </div>
      </section>

      {/* Full-bleed editorial quote */}
      <section style={{ padding: '100px 0', background: 'var(--bg-raised)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 960 }}>
          <div className="kicker" style={{ marginBottom: 32 }}>On Method</div>
          <blockquote className="display" style={{ fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            "We visit every place <span className="display-italic" style={{ color: 'var(--accent)' }}>at our own expense</span>,
            often more than once. No press trips, no comped meals,
            <br/>no affiliate links. Just a long record of what we actually thought."
          </blockquote>
          <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <div style={{ width: 40, height: 1, background: 'var(--accent)' }} />
            <div className="meta">Brandon Johnson, Editor</div>
            <div style={{ width: 40, height: 1, background: 'var(--accent)' }} />
          </div>
        </div>
      </section>

      {/* By Location */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div className="between" style={{ marginBottom: 48, alignItems: 'flex-end' }}>
            <div>
              <div className="kicker" style={{ marginBottom: 12 }}>Browse By Place</div>
              <h2 className="display" style={{ fontSize: 56 }}>
                The <span className="display-italic" style={{ color: 'var(--ink-dim)' }}>atlas.</span>
              </h2>
            </div>
            <a href="#/archive" className="btn-ghost btn">The Full Archive <span className="arrow">→</span></a>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: 'var(--rule)',
            border: '1px solid var(--rule)'
          }}>
            {data.locations.map((loc, i) => (
              <a key={loc.name} href={`#/location/${loc.name.toLowerCase().replace(/[^a-z]/g, '-')}`}
                 style={{
                   background: 'var(--bg)', padding: '40px 32px', cursor: 'pointer',
                   transition: 'background 0.25s',
                   display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                   minHeight: 220
                 }}
                 onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-raised)'}
                 onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}
              >
                <div>
                  <div className="meta">{loc.region}</div>
                  <div className="display" style={{ fontSize: 32, marginTop: 10 }}>
                    {loc.name}
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 24 }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--accent)' }}>
                    {loc.count}
                  </div>
                  <div className="meta">Reviews</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Two-up featured */}
      <section style={{ padding: '40px 0 120px' }}>
        <div className="container">
          <div className="kicker" style={{ marginBottom: 40 }}>Also This Month</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
            {[data.reviews[2], data.reviews[1]].map(r => (
              <ReviewCard key={r.id} review={r} variant="horizontal" />
            ))}
          </div>
        </div>
      </section>

      <NewsletterInline />

      {/* Archive CTA */}
      <section style={{ padding: '120px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="kicker" style={{ marginBottom: 24 }}>Est. 2019</div>
          <h2 className="display" style={{ fontSize: 'clamp(48px, 6vw, 88px)', maxWidth: '14ch', margin: '0 auto' }}>
            Seven years. Four hundred
            <span className="display-italic" style={{ color: 'var(--accent)' }}> reviews.</span>
          </h2>
          <p style={{
            fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--ink-dim)',
            fontStyle: 'italic', maxWidth: 640, margin: '28px auto 0', lineHeight: 1.4
          }}>
            Every restaurant, hotel, and place we've written about since the beginning. Filterable, searchable, sortable.
          </p>
          <a href="#/archive" className="btn" style={{ marginTop: 40 }}>
            Enter the Archive <span className="arrow">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { HomePage });
