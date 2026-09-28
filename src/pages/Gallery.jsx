import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi'
import '../components/styles/Gallery.scss'

// ── Load all gallery images eagerly ─────────────────────────────────────────
const galleryAssets = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png}', { eager: true })

function getImageUrl(filename) {
  const match = Object.entries(galleryAssets).find(([path]) =>
    path.endsWith(`/${filename}`)
  )
  return match ? match[1].default : null
}

// ── Use only images that actually exist in the assets folder ────────────────
const ALL_IMAGES = Object.entries(galleryAssets).map(([path, mod], i) => {
  const filename = path.split('/').pop()
  const name = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
  return {
    id: `img-${i}`,
    title: name.charAt(0).toUpperCase() + name.slice(1),
    filename,
    url: mod.default,
  }
})

// ── Bento: first 5 images ───────────────────────────────────────────────────
// 'lshape' replaces the old separate 'sweets' + 'drinks' slots — the space
// below "Fresh Ingredients" / beside "Freshly Baked" is now one L-shaped image
// instead of two cells that could render empty.
const SLOTS  = ['biryani', 'curry', 'salad', 'naan', 'lshape']
const LABELS = [
  ['Authentic', 'Homemade Biryani'],
  ['Rich', '& Flavorful'],
  ['Fresh', 'Ingredients'],
  ['Freshly', 'Baked'],
  ['Sweets', '& Drinks'],
]

function CurlArrow() {
  return (
    <svg className="curl-arrow" width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden="true">
      <path d="M2 2c5 0 7 9 12 9s5-5 7-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M18 5.5l3.2 2.3-2.6 3.2"    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}

function BentoPanel({ img, label, slot, onOpen }) {
  if (!img?.url) return null
  return (
    <button
      type="button"
      className={`bento-panel bento-panel--${slot}`}
      onClick={() => onOpen(img)}
      aria-label={`Open ${img.title}`}
    >
      <img src={img.url} alt={img.title} loading="lazy" />
      <span className="bento-panel__tag">
        {label.map(line => <span key={line}>{line}</span>)}
        <CurlArrow />
      </span>
    </button>
  )
}

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const [expanded, setExpanded]       = useState(false)
  const galleryTopRef = useRef(null)

  // Always fill all 5 bento slots, even if the assets folder has fewer
  // than 5 photos — cycle through what exists rather than leaving a
  // slot (most commonly the L panel, index 4) blank.
  const bentoImgs = ALL_IMAGES.length > 0
    ? Array.from({ length: 5 }, (_, i) => ALL_IMAGES[i % ALL_IMAGES.length])
    : []
  const marqueeAll = ALL_IMAGES.length > 0 ? ALL_IMAGES : []

  const openLightbox = useCallback((img) => {
    const idx = ALL_IMAGES.findIndex(i => i.id === img.id)
    setLightboxIdx(idx)
  }, [])
  const closeLightbox = () => setLightboxIdx(null)
  const showNext = useCallback(() => setLightboxIdx(i => (i + 1) % ALL_IMAGES.length), [])
  const showPrev = useCallback(() => setLightboxIdx(i => (i - 1 + ALL_IMAGES.length) % ALL_IMAGES.length), [])

  // Collapsing the marquee shrinks page height; without this the browser
  // just clamps the existing scroll position, which can land on the
  // footer instead of the gallery. Scroll back up to the gallery first.
  const handleCollapse = useCallback(() => {
    galleryTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setExpanded(false)
  }, [])

  useEffect(() => {
    if (lightboxIdx === null) return
    const onKey = (e) => {
      if (e.key === 'Escape')      closeLightbox()
      if (e.key === 'ArrowRight')  showNext()
      if (e.key === 'ArrowLeft')   showPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIdx, showNext, showPrev])

  const activeImg = lightboxIdx !== null ? ALL_IMAGES[lightboxIdx] : null

  // Duplicate for seamless loop — need at least 2 copies
  const rowLeft  = [...marqueeAll, ...marqueeAll, ...marqueeAll]
  const rowRight = [...[...marqueeAll].reverse(), ...[...marqueeAll].reverse(), ...[...marqueeAll].reverse()]

  return (
    <div className="gallery-page">

      {/* ── BENTO MOSAIC ─────────────────────────────────── */}
      <section className="gallery-bento" ref={galleryTopRef}>
        <div className="bento-intro">
          <span className="bento-intro__eyebrow">
            <i />Our Gallery
          </span>
          <h1 className="bento-intro__title">
            Good Food<br />Tells a <em>Story</em>
          </h1>
          <span className="bento-intro__rule" />
          <p className="bento-intro__subtitle">
            From our kitchen to your table — explore the freshness, flavors and care in every dish we prepare.
          </p>
        </div>

        {bentoImgs.map((img, i) => (
          <BentoPanel
            key={`${img.id}-${SLOTS[i]}`}
            img={img}
            label={LABELS[i] || ['Fresh', 'Food']}
            slot={SLOTS[i]}
            onOpen={openLightbox}
          />
        ))}

        {!expanded && (
          <button type="button" className="bento-viewmore" onClick={() => setExpanded(true)}>
            <span>View</span>
            <span>More <FiArrowRight /></span>
          </button>
        )}
      </section>

      {/* ── MARQUEE ──────────────────────────────────────── */}
      <AnimatePresence>
        {expanded && (
          <motion.section
            className="gallery-marquee"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <h2 className="marquee-heading">All Photos</h2>

            {/* Row 1 — scroll left */}
            <div className="marquee-row">
              <div className="marquee-track marquee-track--left">
                {rowLeft.map((img, i) => (
                  <button
                    type="button"
                    key={`l${i}`}
                    className="marquee-card"
                    onClick={() => openLightbox(img)}
                  >
                    <img src={img.url} alt={img.title} loading="lazy" />
                    <span className="marquee-card__label">{img.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Row 2 — scroll right */}
            <div className="marquee-row">
              <div className="marquee-track marquee-track--right">
                {rowRight.map((img, i) => (
                  <button
                    type="button"
                    key={`r${i}`}
                    className="marquee-card"
                    onClick={() => openLightbox(img)}
                  >
                    <img src={img.url} alt={img.title} loading="lazy" />
                    <span className="marquee-card__label">{img.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <button type="button" className="marquee-collapse" onClick={handleCollapse}>
              ← Back to gallery
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── LIGHTBOX ─────────────────────────────────────── */}
      <AnimatePresence>
        {activeImg && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className="lightbox__close" onClick={closeLightbox} aria-label="Close">
              <FiX size={22} />
            </button>

            <button
              className="lightbox__nav lightbox__nav--prev"
              onClick={e => { e.stopPropagation(); showPrev() }}
              aria-label="Previous"
            >
              <FiChevronLeft size={26} />
            </button>

            <motion.div
              className="lightbox__content"
              key={activeImg.id}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.22 }}
              onClick={e => e.stopPropagation()}
            >
              <img src={activeImg.url} alt={activeImg.title} />
              <p className="lightbox__caption">{activeImg.title}</p>
              <p className="lightbox__counter">{lightboxIdx + 1} / {ALL_IMAGES.length}</p>
            </motion.div>

            <button
              className="lightbox__nav lightbox__nav--next"
              onClick={e => { e.stopPropagation(); showNext() }}
              aria-label="Next"
            >
              <FiChevronRight size={26} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}