import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'

// Soft blurred color blobs behind the grid — purely decorative, echoes
// the reference's pink/peach/purple/blue bento glow.
const GLOWS = [
  { className: 'testimonial-glow--pink', style: { top: '30%', left: '2%' } },
  { className: 'testimonial-glow--peach', style: { top: '0%', left: '28%' } },
  { className: 'testimonial-glow--purple', style: { top: '6%', right: '16%' } },
  { className: 'testimonial-glow--blue', style: { bottom: '4%', right: '4%' } },
]

// Which column (1-4) each testimonial lands in, in order. Matches the
// reference's staggered arrangement: col 3 sits highest, then col 2,
// then col 4, then col 1 — each column holding 1-2 cards stacked with
// a gap. Edit this alongside testimonials.json if the count changes.
const COLUMNS = [3, 4, 2, 3, 1, 2, 4]

function TestimonialCard({ testimonial, image, index }) {
  return (
    <motion.article
      className="bento-card"
      initial={{ opacity: 0, y: 30, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: (index % 4) * 0.1 }}
      whileHover={{ y: -6, scale: 1.03 }}
    >
      <div className="bento-card__avatar-wrap">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="bento-card__avatar"
          loading="lazy"
        />
        <span className="bento-card__badge">
          <FaStar aria-hidden="true" />
        </span>
      </div>

      <h3 className="bento-card__name">{testimonial.name}</h3>
      <span className="bento-card__role">{testimonial.role}</span>

      <div className="bento-card__quote">
        <span className="bento-card__tab" aria-hidden="true" />
        <p>&ldquo;{testimonial.text}&rdquo;</p>
      </div>
    </motion.article>
  )
}

/**
 * Staggered bento-style testimonial grid. Cards are grouped into four
 * columns per COLUMNS, each column offset vertically via CSS so the
 * whole thing reads as one loose, organic grid rather than a strict
 * table — with food-dish photos standing in for customer avatars.
 *
 * @param {{ id: string, name: string, role: string, text: string, rating: number }[]} testimonials
 * @param {string[]} [images] - food photos, matched 1:1 to testimonials in order
 */
export default function TestimonialMarquee({ testimonials, images = [] }) {
  if (!testimonials?.length) return null

  const columns = { 1: [], 2: [], 3: [], 4: [] }

  testimonials.forEach((testimonial, index) => {
    const column = COLUMNS[index % COLUMNS.length]
    const image = images.length ? images[index % images.length] : undefined
    columns[column].push({ testimonial, image, index })
  })

  return (
    <div className="testimonial-bento">
      {GLOWS.map((glow, i) => (
        <motion.span
          key={i}
          className={`testimonial-glow ${glow.className}`}
          style={glow.style}
          aria-hidden="true"
          animate={{ opacity: [0.45, 0.7, 0.45], scale: [1, 1.08, 1] }}
          transition={{ duration: 7 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
        />
      ))}

      <div className="testimonial-bento__grid">
        {[1, 2, 3, 4].map((col) => (
          <div
            className={`testimonial-bento__column testimonial-bento__column--${col}`}
            key={col}
          >
            {columns[col].map(({ testimonial, image, index }) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                image={image}
                index={index}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}