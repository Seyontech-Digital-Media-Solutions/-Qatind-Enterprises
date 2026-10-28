import { FaStar } from 'react-icons/fa'

// ---------------------------------------------------------------------
// Staggered bento testimonials (the original design).
//  - Desktop: 4 offset columns with soft glow blobs behind.
//  - Tablet: 2 columns.
//  - Phones: one swipeable row (a card at a time) instead of a tall stack.
//
// Props:
//   testimonials  [{ id, name, occasion, month, text, rating }]
//   images        food photos used as avatars, matched to testimonials by order
// ---------------------------------------------------------------------

const COLUMNS = 4

export default function TestimonialMarquee({ testimonials = [], images = [] }) {
  if (!testimonials.length) return null

  // Deal the cards out round-robin: card 0 -> col 1, card 1 -> col 2, ...
  const columns = Array.from({ length: COLUMNS }, () => [])
  testimonials.forEach((t, i) => columns[i % COLUMNS].push({ ...t, image: images[i % images.length] }))

  return (
    <div className="testimonial-bento">
      <span className="testimonial-glow testimonial-glow--pink" style={{ top: '6%', left: '4%' }} aria-hidden="true" />
      <span className="testimonial-glow testimonial-glow--peach" style={{ top: '10%', right: '6%' }} aria-hidden="true" />
      <span className="testimonial-glow testimonial-glow--purple" style={{ bottom: '8%', left: '28%' }} aria-hidden="true" />
      <span className="testimonial-glow testimonial-glow--blue" style={{ bottom: '4%', right: '22%' }} aria-hidden="true" />

      <div className="testimonial-bento__grid">
        {columns.map((cards, colIndex) => (
          <div className={`testimonial-bento__column testimonial-bento__column--${colIndex + 1}`} key={colIndex}>
            {cards.map(t => {
              const role = [t.occasion, t.month].filter(Boolean).join(', ')
              return (
                <article className="bento-card" key={t.id}>
                  <div className="bento-card__avatar-wrap">
                    {t.image ? (
                      <img className="bento-card__avatar" src={t.image} alt="" />
                    ) : (
                      <span className="bento-card__avatar bento-card__avatar--initial">{t.name.charAt(0)}</span>
                    )}
                    <span className="bento-card__badge" aria-hidden="true">
                      <FaStar />
                    </span>
                  </div>
                  <h3 className="bento-card__name">{t.name}</h3>
                  {role && <span className="bento-card__role">{role}</span>}
                  <div className="bento-card__quote">
                    <span className="bento-card__tab" aria-hidden="true" />
                    <p>&ldquo;{t.text}&rdquo;</p>
                  </div>
                </article>
              )
            })}
          </div>
        ))}
      </div>

      <p className="testimonial-bento__hint" aria-hidden="true">Swipe to read more &rarr;</p>
    </div>
  )
}