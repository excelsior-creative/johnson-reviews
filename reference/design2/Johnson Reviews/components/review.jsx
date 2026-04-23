// Review Detail Page
function ReviewPage({ slug }) {
  const review = window.JR_BY_SLUG[slug] || window.JR_DATA.reviews[0];
  const related = window.JR_DATA.reviews.filter(r => r.id !== review.id && r.category === review.category).slice(0, 3);
  const isDestination = review.type === 'destination';

  return (
    <article className="page-body">
      {/* Hero */}
      <section style={{ position: 'relative', height: 'min(90vh, 920px)', overflow: 'hidden' }}>
        <img src={review.hero} alt={review.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(15,13,11,0.5) 0%, rgba(15,13,11,0.1) 30%, rgba(15,13,11,0.95) 100%)'
        }} />
        <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0 }}>
          <div className="container">
            <div className="kicker" style={{ marginBottom: 24 }}>
              The {review.category.slice(0, -1)} Review · N° {String(window.JR_DATA.reviews.indexOf(review) + 1).padStart(3, '0')}
            </div>
            <h1 className="display" style={{
              fontSize: 'clamp(64px, 10vw, 156px)',
              maxWidth: '14ch',
              lineHeight: 0.92
            }}>
              {review.title}
            </h1>
            <div style={{
              fontFamily: 'var(--serif)', fontStyle: 'italic',
              fontSize: 'clamp(20px, 2vw, 28px)',
              color: 'var(--ink-dim)', marginTop: 28, maxWidth: 780, lineHeight: 1.4
            }}>
              {review.subtitle}
            </div>
          </div>
        </div>
      </section>

      {/* Meta bar */}
      <section style={{ borderBottom: '1px solid var(--rule)', background: 'var(--bg-raised)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr 1fr 1fr auto',
            gap: 48,
            alignItems: 'center',
            padding: '40px 0'
          }}>
            <ScoreDisc score={review.score} size="lg" />
            <div>
              <div className="meta">Location</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 22, marginTop: 8 }}>
                {review.location.split(',')[0]}
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--ink-dim)', fontStyle: 'italic', marginTop: 2 }}>
                {review.neighborhood}
              </div>
            </div>
            <div>
              <div className="meta">{isDestination ? 'Type' : 'Cuisine'}</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 22, marginTop: 8 }}>
                {review.cuisine}
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--ink-dim)', fontStyle: 'italic', marginTop: 2 }}>
                {review.price !== '—' ? review.price : review.visited}
              </div>
            </div>
            <div>
              <div className="meta">Visited</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 22, marginTop: 8 }}>
                {review.date}
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--ink-dim)', fontStyle: 'italic', marginTop: 2 }}>
                {review.visited}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="meta">Would Return</div>
              <div style={{
                fontFamily: 'var(--serif)', fontStyle: 'italic',
                fontSize: 28, color: 'var(--accent)', marginTop: 6
              }}>
                {review.wouldReturn ? 'Yes.' : 'No.'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section style={{ padding: '100px 0 80px' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'linear-gradient(135deg, #3a2f25, #6b5842)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--accent)',
              fontSize: 18
            }}>BJ</div>
            <div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 16 }}>By Brandon Johnson</div>
              <div className="meta" style={{ marginTop: 2 }}>Editor · {review.date}</div>
            </div>
          </div>
          <div className="prose">
            <p className="drop-cap">
              {isDestination
                ? `We landed in ${review.location.split(',')[0]} on a Tuesday, jet-lagged and optimistic, and by Thursday we'd already rearranged the week. That's the kind of place this is. It asks you to slow down, then it shows you why you should have been slowing down for years.`
                : `The first time we visited ${review.title}, we didn't know what to expect. By the time we left, we were already arguing about when to come back. That's usually a good sign, and in this case it's turned out to be more than that — it's become one of the few places we'll rearrange a week for.`
              }
            </p>
            <p>
              {isDestination
                ? `There is a particular kind of traveler who shows up in a new city with a spreadsheet and a running itinerary, and there's another kind who shows up with a hotel address and a willingness to get lost. For the first week, we were mostly the second. After that, the city started to give us its own shape.`
                : `The room is small — twelve seats along a hinoki counter, one chef, two sous cooks working silently in a back station you mostly can't see. There's no music. There's no menu. You sit down, the chef nods, and for the next two hours he decides what you eat.`
              }
            </p>
            <p>
              {isDestination
                ? `The central neighborhoods are compact enough to walk but interesting enough to take a full day each. We found ourselves returning to the same cafes, the same bookstores, the same corner where the light was good around five o'clock.`
                : `What you notice first is the pacing. Courses arrive with a deliberate slowness — never so slow that you're impatient, never so fast that you stop tasting. The rice is a kind of quiet miracle, vinegared precisely, warm enough that you can feel it settle, cool enough that it doesn't overwhelm the fish.`
              }
            </p>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <div style={{
            borderTop: '1px solid var(--rule-strong)',
            borderBottom: '1px solid var(--rule-strong)',
            padding: '60px 0',
            textAlign: 'center'
          }}>
            <div className="kicker" style={{ marginBottom: 20 }}>A Note</div>
            <blockquote className="display-italic display" style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.2 }}>
              "{review.blurb}"
            </blockquote>
          </div>
        </div>
      </section>

      {/* Gallery — editorial grid */}
      {review.gallery && review.gallery.length > 0 && (
        <section style={{ padding: '40px 0 80px' }}>
          <div className="container">
            <div className="between" style={{ marginBottom: 40, alignItems: 'flex-end' }}>
              <div>
                <div className="kicker" style={{ marginBottom: 12 }}>Photo Notes</div>
                <h3 className="display" style={{ fontSize: 44 }}>From the visit.</h3>
              </div>
              <div className="meta">Photographed by Brandon Johnson · {review.date}</div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gridAutoRows: '180px',
              gap: 16
            }}>
              {review.gallery.slice(0, 6).map((src, i) => {
                const layouts = [
                  { gridColumn: 'span 4', gridRow: 'span 2' },
                  { gridColumn: 'span 2', gridRow: 'span 1' },
                  { gridColumn: 'span 2', gridRow: 'span 1' },
                  { gridColumn: 'span 2', gridRow: 'span 2' },
                  { gridColumn: 'span 2', gridRow: 'span 2' },
                  { gridColumn: 'span 2', gridRow: 'span 2' }
                ];
                return (
                  <div key={i} className="photo hover" style={layouts[i]}>
                    <img src={src} alt={`${review.title} photo ${i + 1}`} loading="lazy" />
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
              <div className="caption">
                <span className="num">№ {String(review.gallery.length).padStart(2, '0')}</span>
                <span>Plates, rooms, and moments from the visit</span>
              </div>
              <button className="btn-ghost btn">View all photos <span className="arrow">→</span></button>
            </div>
          </div>
        </section>
      )}

      {/* More body */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="prose">
            <p>
              {isDestination
                ? `The food, if we're keeping score, is probably the best we've had on a trip in the last five years. Not because any one meal was transcendent, though several were — but because the baseline was so high. Even the wrong choices were good.`
                : `The fish is sourced personally — not a marketing line, an actual thing you can watch happen if you ask. The chef flies to Toyosu every other Tuesday. Whatever he brings back defines the next two weeks of service. You can feel that in the plating, in the confidence of the cuts, in the way he explains each piece without ever quite sounding like he's explaining.`
              }
            </p>
            <p>
              {isDestination
                ? `We've already started planning the return. If the first trip was a survey, the second will be a deep dive into the neighborhoods we merely glimpsed — the ones a day-long wander couldn't quite finish.`
                : `By the time dessert arrives — a restrained scoop of something citrusy, a sliver of warm tea cake — you realize you've been sitting here for three hours. You didn't notice the second one pass.`
              }
            </p>
          </div>
        </div>
      </section>

      {/* Practical details */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          <div style={{
            background: 'var(--bg-raised)',
            border: '1px solid var(--rule)',
            padding: '60px',
          }}>
            <div className="kicker" style={{ marginBottom: 32 }}>The Particulars</div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 40,
              rowGap: 40
            }}>
              {[
                ['Address', isDestination ? review.neighborhood : '2930 Bristol St, Costa Mesa'],
                ['Hours', isDestination ? 'Year-round · Best spring/fall' : 'Wed–Sun · Two seatings'],
                ['Reservations', isDestination ? 'Book flights 2–3 months out' : 'Tock · 90 days in advance'],
                ['Price Point', review.price !== '—' ? review.price + ' · $280+ per person' : 'Highly variable'],
                ['Parking', isDestination ? 'Rideshare recommended' : 'Lot · Free · Adequate'],
                ['Notable', isDestination ? 'Walk-friendly city center' : 'Omakase only · No à la carte']
              ].map(([label, val]) => (
                <div key={label}>
                  <div className="meta">{label}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 19, marginTop: 8, lineHeight: 1.4 }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--rule)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20
            }}>
              <div>
                <div className="meta">Our Verdict</div>
                <div className="display-italic display" style={{ fontSize: 28, marginTop: 8, color: 'var(--accent)' }}>
                  {review.score >= 9 ? 'Essential. Worth the trip.' : review.score >= 8.5 ? 'A strong recommendation.' : 'Worth knowing about.'}
                </div>
              </div>
              <a href={`#/${review.category.toLowerCase()}`} className="btn">
                More {review.category} <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Signature */}
      <section style={{ padding: '40px 0 100px' }}>
        <div className="container" style={{ maxWidth: 760, textAlign: 'center' }}>
          <div className="meta" style={{ marginBottom: 12 }}>— End of review —</div>
          <div className="signature">Brandon J.</div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ padding: '60px 0 100px', borderTop: '1px solid var(--rule)' }}>
          <div className="container">
            <div className="kicker" style={{ marginBottom: 32 }}>More From This Section</div>
            <h3 className="display" style={{ fontSize: 48, marginBottom: 48 }}>
              Related <span className="display-italic" style={{ color: 'var(--ink-dim)' }}>reviews.</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
              {related.map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          </div>
        </section>
      )}

      <NewsletterInline compact />
    </article>
  );
}

Object.assign(window, { ReviewPage });
