import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight, FiZoomIn } from 'react-icons/fi'
import galleryData from '../data/galleryImages.json'
import '../components/styles/Gallery.scss'

// Auto-maps every file in src/assets/gallery/ by filename.
// To use real photos later: drop a file into src/assets/gallery/ with the
// SAME filename referenced in galleryImages.json — no component changes needed.
const galleryAssets = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png}', { eager: true })

function getImageUrl(filename) {
  const match = Object.entries(galleryAssets).find(([path]) => path.endsWith(`/${filename}`))
  return match ? match[1].default : undefined
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } }
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const showNext = useCallback(() => {
    setLightboxIndex(i => (i + 1) % galleryData.length)
  }, [])

  const showPrev = useCallback(() => {
    setLightboxIndex(i => (i - 1 + galleryData.length) % galleryData.length)
  }, [])

  // Keyboard navigation for the lightbox
  useEffect(() => {
    if (lightboxIndex === null) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') showNext()
      if (e.key === 'ArrowLeft') showPrev()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxIndex, showNext, showPrev])

  const activeImage = lightboxIndex !== null ? galleryData[lightboxIndex] : null

  return (
    <div className="gallery">
      <section className="gallery-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="gallery-hero__eyebrow">Qatind Restaurant</span>
            <h1 className="gallery-hero__title">Our Gallery</h1>
            <p className="gallery-hero__subtitle">
              A glimpse into the dishes we love to serve.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="gallery-grid-section">
        <div className="container">
          <motion.div
            className="gallery-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {galleryData.map((img, index) => (
              <motion.button
                key={img.id}
                className="gallery-grid__item"
                variants={itemVariants}
                onClick={() => openLightbox(index)}
              >
                <img src={getImageUrl(img.image)} alt={img.title} />
                <span className="gallery-grid__overlay">
                  <span className="gallery-grid__zoom-icon">
                    <FiZoomIn size={22} />
                  </span>
                  <span className="gallery-grid__caption">{img.title}</span>
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className="lightbox__close" onClick={closeLightbox} aria-label="Close">
              <FiX size={26} />
            </button>

            <button
              className="lightbox__nav lightbox__nav--prev"
              onClick={(e) => { e.stopPropagation(); showPrev() }}
              aria-label="Previous image"
            >
              <FiChevronLeft size={28} />
            </button>

            <motion.div
              className="lightbox__content"
              key={activeImage.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={getImageUrl(activeImage.image)} alt={activeImage.title} />
              <p className="lightbox__caption">{activeImage.title}</p>
              <p className="lightbox__counter">
                {lightboxIndex + 1} / {galleryData.length}
              </p>
            </motion.div>

            <button
              className="lightbox__nav lightbox__nav--next"
              onClick={(e) => { e.stopPropagation(); showNext() }}
              aria-label="Next image"
            >
              <FiChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}