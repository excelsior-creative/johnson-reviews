// Category / Hub page + Archive + About + Newsletter + Location hub

function CategoryPage({ category }) {
  const titles = {
    restaurants: { title: 'Restaurants', italic: 'worth the drive.', eyebrow: 'The Section', sub: 'Every restaurant we\'ve written about — from neighborhood counters to tasting menus with three-month waits. Sortable by score, region, and cuisine.' },
    hotels: { title: 'Hotels', italic: 'and stays.', eyebrow: 'The Section', sub: 'Rooms and resorts we\'ve actually slept in, paid for, and would return to. Luxury, boutique, and the rare roadside room that earned the write-up.' },
    travel: { title: 'Travel', italic: 'notes and guides.', eyebrow: 'The Section', sub: 'Cities, coasts, and countries — long-form travel reports organized by region. How long we stayed, where we slept, and what we\'d do again.' }
  };
  const t = titles[category] || titles.restaurants;
  const catKey = category.charAt(0).toUpperCase() + category.slice(1);

  const [sort, setSort] = React.useState('recent');
  const [region, setRegion] = React.useState('All');
  const [priceFilter, setPriceFilter] = React.useState('All');

  const all = window.JR_DATA.reviews.filter(r => r.category === catKey);
  const regions = ['All', ...new Set(all.map(r => r.location.split(',').pop().trim()))];
  const prices = ['All', '$$', '$$$', '$$$$'];

  let list = [...all];
  if (region !== 'All') list = list.filter(r => r.location.includes(region));
  if (priceFilter !== 'All' && category === 'restaurants') list = list.filter(r => r.price === priceFilter);
  if (sort === 'score') list.sort((a, b) => b.score - a.score);
  else if (sort === 'alpha') list.sort((a, b) => a.title.localeCompare(b.title));

  const featured = list[0];
  const rest = list.slice(1);

  return (
    <div className="page-body">
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        italicPart={t.italic}
        subtitle={t.sub}
        meta={
          <>
            <div><div className="meta">Total Reviews</div><div style={{ fontFamily: 'var(--serif)', fontSize: 32, color: 'var(--accent)', marginTop: 6 }}>{all.length}</div></div>
            <div><div className="meta">Average Score</div><div style={{ fontFamily: 'var(--serif)', fontSize: 32, color: 'var(--accent)', marginTop: 6 }}>{(all.reduce((s, r) => s + r.score, 0) / Math.max(all.length, 1)).toFixed(1)}</div></div>
            <div><div className="meta">Regions Covered</div><div style={{ fontFamily: 'var(--serif)', fontSize: 32, color: 'var(--accent)', marginTop: 6 }}>{new Set(all.map(r => r.location.split(',').pop().trim())).size}</div></div>
          </>
        }
      />

      {/* Filter bar */}
      <section style={{ position: 'sticky', top: 72, zIndex: 20, background: 'rgba(15,13,11,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--rule)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', flexWrap: 'wrap', gap: 24 }}>
            <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
              <FilterGroup label="Region" value={region} options={regions} onChange={setRegion} />
              {category === 'restaurants' && <FilterGroup label="Price" value={priceFilter} options={prices} onChange={setPriceFilter} />}
            </div>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              <span className="meta">Sort</span>
              {[['recent', 'Recent'], ['score', 'Score'], ['alpha', 'A–Z']].map(([k, l]) => (
                <button key={k} onClick={() => setSort(k)} className="nav-link" style={{ color: sort === k ? 'var(--accent)' : 'var(--ink-dim)' }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {featured && (
        <section style={{ padding: '80px 0' }}>
          <div className="container">
            <div className="kicker" style={{ marginBottom: 32 }}>Editor's Pick</div>
            <ReviewCard review={featured} variant="horizontal" />
          </div>
        </section>
      )}

      <section style={{ padding: '40px 0 120px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48, rowGap: 80 }}>
            {rest.map(r => <ReviewCard key={r.id} review={r} />)}
          </div>
          {rest.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink-dim)', fontSize: 20 }}>
              No reviews match your filters. <button onClick={() => { setRegion('All'); setPriceFilter('All'); }} style={{ color: 'var(--accent)', textDecoration: 'underline', cursor: 'pointer' }}>Clear filters</button>
            </div>
          )}
        </div>
      </section>

      <NewsletterInline compact />
    </div>
  );
}

function FilterGroup({ label, value, options, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span className="meta">{label}</span>
      <div style={{ display: 'flex', gap: 12 }}>
        {options.map(o => (
          <button key={o} onClick={() => onChange(o)} className="nav-link" style={{
            color: value === o ? 'var(--accent)' : 'var(--ink-dim)',
            borderBottom: value === o ? '1px solid var(--accent)' : '1px solid transparent',
            paddingBottom: 4
          }}>{o}</button>
        ))}
      </div>
    </div>
  );
}

// --- Archive ---
function ArchivePage() {
  const [search, setSearch] = React.useState('');
  const [year, setYear] = React.useState('All');
  const [cat, setCat] = React.useState('All');

  const all = window.JR_DATA.reviews;
  const years = ['All', '2026', '2025'];
  const cats = ['All', 'Restaurants', 'Hotels', 'Travel'];

  let filtered = all.filter(r => {
    if (search && !(r.title + r.location + r.cuisine).toLowerCase().includes(search.toLowerCase())) return false;
    if (year !== 'All' && !r.date.includes(year)) return false;
    if (cat !== 'All' && r.category !== cat) return false;
    return true;
  });

  return (
    <div className="page-body">
      <PageHeader
        eyebrow="Est. MMXIX · Seven Volumes"
        title="The"
        italicPart="Archive."
        subtitle="Every review, every city, every stay — sortable and searchable back to the beginning."
      />

      <section style={{ padding: '40px 0 0' }}>
        <div className="container">
          <div style={{
            borderBottom: '1px solid var(--rule-strong)',
            paddingBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 16
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--ink-mute)' }}>
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="text"
              placeholder="Search restaurants, cities, cuisines..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--ink)',
                fontStyle: 'italic', padding: '8px 0'
              }}
            />
            <span className="meta">{filtered.length} results</span>
          </div>
          <div style={{ display: 'flex', gap: 40, padding: '24px 0', flexWrap: 'wrap' }}>
            <FilterGroup label="Year" value={year} options={years} onChange={setYear} />
            <FilterGroup label="Section" value={cat} options={cats} onChange={setCat} />
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 0 120px' }}>
        <div className="container">
          <div style={{ borderTop: '1px solid var(--rule)' }}>
            {filtered.map((r, i) => (
              <a key={r.id} href={`#/review/${r.slug}`} style={{
                display: 'grid',
                gridTemplateColumns: '60px 1.5fr 1fr 1fr 1fr 80px',
                gap: 24,
                alignItems: 'center',
                padding: '28px 0',
                borderBottom: '1px solid var(--rule)',
                cursor: 'pointer',
                transition: 'padding 0.25s, background 0.2s'
              }}
                onMouseEnter={e => { e.currentTarget.style.paddingLeft = '16px'; e.currentTarget.style.paddingRight = '16px'; }}
                onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0'; e.currentTarget.style.paddingRight = '0'; }}
              >
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--ink-mute)' }}>
                  N° {String(i + 1).padStart(3, '0')}
                </div>
                <div>
                  <div className="meta" style={{ color: 'var(--accent)' }}>{r.category}</div>
                  <div className="display" style={{ fontSize: 26, marginTop: 4 }}>{r.title}</div>
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--ink-dim)' }}>
                  {r.location.split(',')[0]}<br/>
                  <span style={{ fontStyle: 'italic', fontSize: 13 }}>{r.neighborhood}</span>
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--ink-dim)' }}>
                  {r.cuisine}
                </div>
                <div className="meta">{r.date}</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 24, color: 'var(--accent)', textAlign: 'right' }}>
                  {r.score.toFixed(1)}
                </div>
              </a>
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '100px 0', fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink-dim)', fontSize: 22 }}>
              Nothing matches "{search}". Try something else?
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// --- About ---
function AboutPage() {
  return (
    <div className="page-body">
      <section style={{ padding: '120px 0 80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div className="kicker" style={{ marginBottom: 28 }}>About the Publication</div>
              <h1 className="display" style={{ fontSize: 'clamp(56px, 7vw, 104px)' }}>
                An independent review publication, <span className="display-italic" style={{ color: 'var(--accent)' }}>run by one person.</span>
              </h1>
              <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, color: 'var(--ink-dim)', marginTop: 32, lineHeight: 1.5 }}>
                Johnson & Co. is the review project of Brandon Johnson — a Google Maps Level 10 Local Guide with 383 reviews, 19,600 original photos, and 169 million photo views. Started in 2019 as a personal notebook, it's now a working publication.
              </p>
            </div>
            <div className="photo" style={{ aspectRatio: '4/5' }}>
              <img src=(window.__resources && window.__resources.img30) alt="Brandon Johnson" />
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40 }}>
            {[
              ['383', 'Reviews published'],
              ['19,600', 'Original photographs'],
              ['169M', 'Photo views'],
              ['Level 10', 'Google Local Guide']
            ].map(([n, l]) => (
              <div key={l}>
                <div className="display" style={{ fontSize: 64, color: 'var(--accent)' }}>{n}</div>
                <div className="meta" style={{ marginTop: 12 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 0' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="kicker" style={{ marginBottom: 32 }}>The Method</div>
          <h2 className="display" style={{ fontSize: 56 }}>How we <span className="display-italic" style={{ color: 'var(--accent)' }}>do this.</span></h2>
          <div className="prose" style={{ marginTop: 48 }}>
            <p className="drop-cap">
              Every place written about on this site has been visited at our own expense. We don't take press trips. We don't accept comped meals. We don't run sponsored content or affiliate links. This is the editorial line, and it isn't going to change.
            </p>
            <p>
              We usually visit a place more than once before writing about it. For restaurants, we aim for at least two visits — enough to see the kitchen on a regular night and on a busy one. For hotels, we stay a minimum of two nights. For destinations, we try to spend at least a week.
            </p>
            <p>
              Scores are a 10-point scale, calibrated against the full archive. A 9+ means we'd rearrange a trip to go back. An 8-range score is a confident recommendation. Anything below 7, we generally don't publish.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0 120px', background: 'var(--bg-raised)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 60 }}>
            {[
              ['No Sponsors.', 'Every visit is paid for by us. No free meals, no press trips, no "experiences" gifted in exchange for coverage.'],
              ['No Affiliates.', 'No booking links, no referral commissions, no Amazon tags. When we point you somewhere, we have no financial stake in it.'],
              ['No Shortcuts.', 'We revisit before we re-publish. Scores update when places change. Reviews get edited when we\'re wrong.']
            ].map(([t, d]) => (
              <div key={t}>
                <div className="display" style={{ fontSize: 36, marginBottom: 16 }}>
                  {t.slice(0, -1)}<span style={{ color: 'var(--accent)' }}>.</span>
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 17, color: 'var(--ink-dim)', lineHeight: 1.55 }}>
                  {d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 0' }}>
        <div className="container" style={{ maxWidth: 760, textAlign: 'center' }}>
          <div className="kicker" style={{ marginBottom: 32 }}>A Note from the Editor</div>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 24, fontStyle: 'italic', lineHeight: 1.5, color: 'var(--ink)' }}>
            I started writing these reviews for myself and for friends who kept asking. I kept writing them because it turned out to be the kind of work that pays attention back. If you've read this far, thank you. If you ever want to argue with a score, the address is in the footer.
          </p>
          <div style={{ marginTop: 48 }}>
            <div className="signature" style={{ fontSize: 44 }}>Brandon J.</div>
            <div className="meta" style={{ marginTop: 12 }}>Editor · Laguna Beach, California</div>
          </div>
        </div>
      </section>

      <NewsletterInline compact />
    </div>
  );
}

// --- Newsletter ---
function NewsletterPage() {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <div className="page-body">
      <section style={{ padding: '140px 0 80px' }}>
        <div className="container" style={{ maxWidth: 900, textAlign: 'center' }}>
          <div className="kicker" style={{ marginBottom: 28 }}>The Dispatch · Since 2020</div>
          <h1 className="display" style={{ fontSize: 'clamp(64px, 9vw, 144px)' }}>
            One Sunday, <span className="display-italic" style={{ color: 'var(--accent)' }}>one place.</span>
          </h1>
          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 24, color: 'var(--ink-dim)', marginTop: 32, lineHeight: 1.45 }}>
            A weekly letter from the road — one restaurant, hotel, or city worth the trip. Sent Sunday mornings. Reader-supported. Unsubscribe whenever you'd like.
          </p>

          {submitted ? (
            <div style={{ marginTop: 48, padding: 40, border: '1px solid var(--accent)', maxWidth: 520, margin: '48px auto 0' }}>
              <div className="kicker" style={{ marginBottom: 16 }}>✓ Subscribed</div>
              <div className="display-italic display" style={{ fontSize: 32, color: 'var(--accent)' }}>See you Sunday.</div>
              <p style={{ fontFamily: 'var(--serif)', marginTop: 16, color: 'var(--ink-dim)', fontSize: 16 }}>
                Check your inbox for a confirmation note.
              </p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); if (email.includes('@')) setSubmitted(true); }}
              style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 520, margin: '48px auto 0' }}>
              <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
                style={{ background: 'var(--bg-raised)', border: '1px solid var(--rule-strong)', padding: '18px 20px', color: 'var(--ink)', fontFamily: 'var(--serif)', fontSize: 20, fontStyle: 'italic', outline: 'none' }} />
              <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                Subscribe to the Dispatch <span className="arrow">→</span>
              </button>
            </form>
          )}

          <div className="meta" style={{ marginTop: 32 }}>4,281 readers · Free · No spam, ever</div>
        </div>
      </section>

      {/* Sample issues */}
      <section style={{ padding: '80px 0 120px', borderTop: '1px solid var(--rule)' }}>
        <div className="container">
          <div className="kicker" style={{ marginBottom: 24 }}>Recent Issues</div>
          <h2 className="display" style={{ fontSize: 48, marginBottom: 48 }}>
            What you <span className="display-italic" style={{ color: 'var(--ink-dim)' }}>missed.</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { no: 'XLVII', date: 'April 13, 2026', title: 'A Sunday in Costa Mesa', blurb: 'Three hours at a sushi counter, and why that kind of restaurant is getting rarer.' },
              { no: 'XLVI', date: 'April 6, 2026', title: 'The Hotel That Remembers', blurb: 'A return to Montage Laguna, and the small sign of good service that\'s almost a cliché.' },
              { no: 'XLV', date: 'March 30, 2026', title: 'Seven Days, Mexico City', blurb: 'A field report — the neighborhoods, the meals, the one that rearranged the week.' },
            ].map(i => (
              <div key={i.no} style={{
                border: '1px solid var(--rule)', padding: 32, cursor: 'pointer',
                transition: 'border-color 0.2s, background 0.2s'
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--bg-raised)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.background = 'transparent'; }}
              >
                <div className="meta">Issue N° {i.no} · {i.date}</div>
                <h3 className="display" style={{ fontSize: 28, marginTop: 20 }}>{i.title}</h3>
                <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink-dim)', marginTop: 16, fontSize: 16, lineHeight: 1.5 }}>
                  "{i.blurb}"
                </p>
                <div style={{ marginTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="meta" style={{ color: 'var(--accent)' }}>Read issue →</span>
                  <span className="meta">6 min</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// --- Location hub (shares code with category) ---
function LocationPage({ slug }) {
  const all = window.JR_DATA.reviews;
  const locName = (slug || '').replace(/-/g, ' ');
  const matches = all.filter(r => r.location.toLowerCase().includes(locName.toLowerCase()));
  const displayName = locName.split(' ').map(w => w[0]?.toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="page-body">
      <PageHeader
        eyebrow="The Place"
        title={displayName}
        italicPart="field notes."
        subtitle={`Everywhere we've written about in and around ${displayName}. Restaurants, hotels, and long-form travel reports.`}
        meta={<div><div className="meta">Total Reviews</div><div style={{ fontFamily: 'var(--serif)', fontSize: 32, color: 'var(--accent)', marginTop: 6 }}>{matches.length || window.JR_DATA.locations.find(l => l.name.toLowerCase() === locName.toLowerCase())?.count || 0}</div></div>}
      />
      <section style={{ padding: '60px 0 120px' }}>
        <div className="container">
          {matches.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48, rowGap: 80 }}>
              {matches.map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0', fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink-dim)', fontSize: 22 }}>
              Reviews from {displayName} coming soon. In the meantime, the <a href="#/archive" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>full archive</a> lives here.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { CategoryPage, ArchivePage, AboutPage, NewsletterPage, LocationPage });
