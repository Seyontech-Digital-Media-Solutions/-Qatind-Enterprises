import { useMemo, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform
} from 'framer-motion'
import { Link } from 'react-router-dom'
import '../components/styles/Bakery.scss'
import PlumCakeHeroLayer from './PlumCakeHeroLayer'

// ─────────────────────────────────────────────────────────
import placeholder1 from '../assets/plum-cake.png'
import placeholder2 from '../assets/gift-humber.png'
import header from '../assets/banner-backery.png'
import placeholder4 from '../assets/Festive Gift Boxes.png'
import placeholder5 from '../assets/imge-ab.png'
import placeholder6 from '../assets/bakerycta.png'
import placeholder3 from '../assets/Traditional-Cake.png'

const categories = [
  { id: 'all', name: 'All Bakes' },
  { id: 'breads', name: 'Artisan Breads' },
  { id: 'pastries', name: 'Pastries' },
  { id: 'cakes', name: 'Cakes' },
  { id: 'cookies', name: 'Cookies' }
]

const bakeryItems = [
  {
    id: 1,
    ticket: 'B-01',
    name: 'Classic Sourdough Loaf',
    category: 'breads',
    price: '₹180',
    description: 'Slow-fermented for 24 hours, baked crusty outside and soft within.',
    image: placeholder1,
    badge: 'Bestseller'
  },
  {
    id: 2,
    ticket: 'P-01',
    name: 'Butter Croissant',
    category: 'pastries',
    price: '₹90',
    description: 'Laminated dough, dozens of flaky layers, baked golden every morning.',
    image: placeholder2,
    badge: 'New'
  },
  {
    id: 3,
    ticket: 'C-01',
    name: 'Red Velvet Cake',
    category: 'cakes',
    price: '₹650',
    description: 'Rich cocoa sponge layered with velvety cream cheese frosting.',
    image: placeholder3
  },
  {
    id: 4,
    ticket: 'K-01',
    name: 'Chocolate Chunk Cookies',
    category: 'cookies',
    price: '₹60',
    description: 'Crisp edges, gooey centers, loaded with chocolate chunks.',
    image: placeholder4
  },
  {
    id: 5,
    ticket: 'B-02',
    name: 'Multigrain Bread',
    category: 'breads',
    price: '₹150',
    description: 'A hearty blend of grains and seeds for a wholesome everyday loaf.',
    image: placeholder5
  },
  {
    id: 6,
    ticket: 'P-02',
    name: 'Seasonal Fruit Danish',
    category: 'pastries',
    price: '₹110',
    description: 'Light, buttery pastry topped with a seasonal fruit compote.',
    image: placeholder6,
    badge: 'Bestseller'
  }
]

// ─────────────────────────────────────────────
// Festive / Gift Hampers data
// ─────────────────────────────────────────────
const festiveItems = [
  {
    id: 'f1',
    eyebrow: 'Signature Bake',
    name: 'Premium Plum Cake',
    tag: 'Rich & Fruit-Loaded',
    description:
      'Packed with candied fruits, nuts, and a deep caramel note — our most-loved festive centerpiece, finished with a hand-placed sugar garnish.',
    image: placeholder1,
    reverse: false
  },
  {
    id: 'f2',
    eyebrow: 'Gifting Ready',
    name: 'Gift Wrapped Hampers',
    tag: 'Personalised Tags',
    description:
      'Each cake is individually wrapped with a custom greeting tag — ready to hand over or courier for weddings, corporate gifting, and festive occasions.',
    image: placeholder2,
    reverse: true
  },
  {
    id: 'f3',
    eyebrow: 'Classic Recipe',
    name: 'Traditional Plum Cake',
    tag: 'Slow-Baked',
    description:
      'A time-honoured recipe baked slow for a moist, dense crumb — dark, rich, and studded with cherries for that classic festive flavour.',
    image: placeholder3,
    reverse: false
  },
  {
    id: 'f4',
    eyebrow: 'Bulk & Corporate',
    name: 'Festive Gift Boxes',
    tag: 'Bulk Orders Welcome',
    description:
      'Uniformly wrapped boxes designed for bulk festive gifting — ideal for offices, events, and celebrations where every box needs to look picture-perfect.',
    image: placeholder4,
    reverse: true
  }
]

const features = [
  {
    title: 'Freshly Baked Daily',
    description: 'Every item is prepared in small batches, fresh each morning.'
  },
  {
    title: 'Premium Ingredients',
    description: 'Only the finest flour, butter, and cocoa make it into our ovens.'
  },
  {
    title: 'Custom Orders',
    description: 'Celebration cakes and bespoke bakes, made to order for your occasion.'
  },
  {
    title: 'Hygienic Packaging',
    description: 'Sealed with care and delivered fresh, straight from our kitchen.'
  }
]

const storyPoints = [
  'Traditional recipes, baked the slow and honest way.',
  'Small batches every day — never mass-produced.',
  'Ingredients sourced for flavor, not shortcuts.'
]

// Generates a stable random-ish field of ambient particles once per mount.
function useParticleField(count, config) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: config.leftMin + Math.random() * (config.leftMax - config.leftMin),
        top: config.topMin != null ? config.topMin + Math.random() * (config.topMax - config.topMin) : null,
        size: config.sizeMin + Math.random() * (config.sizeMax - config.sizeMin),
        delay: Math.random() * config.delayMax,
        duration: config.durationMin + Math.random() * (config.durationMax - config.durationMin)
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}

export default function Bakery() {
  const [activeCategory, setActiveCategory] = useState('all')

  // ───────────────────────────────────────────
  // Hero: mouse parallax
  // ───────────────────────────────────────────
  const heroRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const parallaxX = useSpring(mouseX, { stiffness: 55, damping: 18, mass: 0.4 })
  const parallaxY = useSpring(mouseY, { stiffness: 55, damping: 18, mass: 0.4 })

  const bgParallaxX = useTransform(parallaxX, [-0.5, 0.5], [-8, 8])
  const bgParallaxY = useTransform(parallaxY, [-0.5, 0.5], [-6, 6])
  const textParallaxX = useTransform(parallaxX, [-0.5, 0.5], [-6, 6])

  const handleHeroMouseMove = e => {
    const bounds = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - bounds.left) / bounds.width - 0.5)
    mouseY.set((e.clientY - bounds.top) / bounds.height - 0.5)
  }
  const handleHeroMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // ───────────────────────────────────────────
  // Hero: scroll-tied cinematic push
  // ───────────────────────────────────────────
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  const heroBgScale = useTransform(heroScrollProgress, [0, 1], [1, 1.05])

  // ───────────────────────────────────────────
  // Hero: ambient particle fields (flour dust + sparkles)
  // ───────────────────────────────────────────
  const flourDust = useParticleField(16, {
    leftMin: 0,
    leftMax: 100,
    sizeMin: 3,
    sizeMax: 7,
    delayMax: 7,
    durationMin: 7,
    durationMax: 13
  })
  const sparkles = useParticleField(10, {
    leftMin: 8,
    leftMax: 92,
    topMin: 8,
    topMax: 78,
    sizeMin: 2,
    sizeMax: 4,
    delayMax: 5,
    durationMin: 2.5,
    durationMax: 4.5
  })

  const heroContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.28 }
    }
  }

  const heroChildVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const rowVariants = {
    hidden: { opacity: 0, y: 48 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const filteredItems =
    activeCategory === 'all'
      ? bakeryItems
      : bakeryItems.filter(item => item.category === activeCategory)

  return (
    <div className="bakery">
      
      <section
        className="bakery-hero"
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        <motion.div
          className="bakery-hero__bg"
          style={{
            backgroundImage: `url(${header})`,
            x: bgParallaxX,
            y: bgParallaxY,
            scale: heroBgScale
          }}
          initial={{ opacity: 0, filter: 'brightness(0.35)' }}
          animate={{ opacity: 1, filter: 'brightness(1)' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <div className="bakery-hero__overlay" />
        <motion.div
          className="bakery-hero__rays"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.4 }}
        />

        <div className="bakery-hero__flour" aria-hidden="true">
          {flourDust.map(p => (
            <span
              key={p.id}
              className="bakery-hero__flour-dot"
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.size,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`
              }}
            />
          ))}
        </div>

        <div className="bakery-hero__sparkles" aria-hidden="true">
          {sparkles.map(s => (
            <span
              key={s.id}
              className="bakery-hero__sparkle"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`
              }}
            />
          ))}
        </div>

        {/* Plum cake centerpiece. NOTE: to make this replay in sync with
            the text block on every scroll-into-view, PlumCakeHeroLayer.jsx
            itself needs its internal animation switched from initial/animate
            to whileInView + viewport={{ once: false }}. Send that file and
            I'll wire it up so both animate together. */}
        <PlumCakeHeroLayer startDelay={0.6} heroRef={heroRef} />

        <div className="container">
          <motion.div
            className="bakery-hero__content"
            style={{ x: textParallaxX }}
            variants={heroContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.45 }}
          >
            <motion.span className="bakery-hero__eyebrow" variants={heroChildVariants}>
              Qatind Bakery
            </motion.span>

            <h1 className="bakery-hero__title">
              <motion.span className="bakery-hero__title-line" variants={heroChildVariants}>
                Baked <span className="bakery-hero__highlight">Fresh</span>.
              </motion.span>
              <br />
              <motion.span className="bakery-hero__title-line" variants={heroChildVariants}>
                Made With <span className="bakery-hero__highlight">Love</span>.
              </motion.span>
            </h1>

            <motion.p className="bakery-hero__subtitle" variants={heroChildVariants}>
              From crusty sourdough to delicate pastries — every bake is crafted
              daily with premium ingredients and old-world technique.
            </motion.p>

            <motion.div className="bakery-hero__actions" variants={heroChildVariants}>
              <Link to="/menu" className="bakery-btn bakery-btn--primary">
                Order Now
              </Link>
              <a href="#bakery-products" className="bakery-btn bakery-btn--outline">
                View Bakes
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Festive / Gift Hampers Section */}
      <section className="bakery-festive">
        <div className="container">
          <motion.div
            className="bakery-festive__head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="bakery-festive__head-eyebrow">Limited Season</span>
            <h2 className="bakery-section__title bakery-section__title--left">
              Festive & Gift Hampers
            </h2>
          </motion.div>

          <div className="bakery-festive__list">
            {festiveItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={
                  'bakery-festive__row' +
                  (item.reverse ? ' bakery-festive__row--reverse' : '')
                }
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-120px' }}
                variants={rowVariants}
              >
                <div className="bakery-festive__media">
                  <motion.div
                    className="bakery-festive__media-frame"
                    initial={{ clipPath: 'inset(0 100% 0 0)'}}
                    whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                    viewport={{ once: true, margin: '-120px' }}
                    transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
                  >
                    <img src={item.image} alt={item.name} className="bakery-festive__image" />
                  </motion.div>
                  <span className="bakery-festive__ticket">
                    No. {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="bakery-festive__content">
                  <span className="bakery-festive__eyebrow">{item.eyebrow}</span>
                  <h3 className="bakery-festive__title">{item.name}</h3>
                  <span className="bakery-festive__pill">{item.tag}</span>
                  <p className="bakery-festive__text">{item.description}</p>
                  <a
                    href="#bakery-products"
                    className="bakery-btn bakery-btn--primary bakery-festive__cta"
                  >
                    Order This
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu / Products Section — services-style ticket list */}
      <section className="bakery-products" id="bakery-products">
        <div className="container">
          <h2 className="bakery-section__title">Our Signature Bakes</h2>

          <motion.div
            className="bakery-products__filters"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={
                  'bakery-products__filter' +
                  (activeCategory === cat.id ? ' bakery-products__filter--active' : '')
                }
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </motion.div>

          <motion.div
            className="bakery-products__list"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  className="bakery-ticket"
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="bakery-ticket__code">{item.ticket}</span>

                  <div className="bakery-ticket__thumb">
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      whileHover={{ scale: 1.12 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                    {item.badge && (
                      <span className="bakery-ticket__badge">{item.badge}</span>
                    )}
                  </div>

                  <div className="bakery-ticket__body">
                    <h3 className="bakery-ticket__title">{item.name}</h3>
                    <p className="bakery-ticket__description">{item.description}</p>
                  </div>

                  <span className="bakery-ticket__divider" aria-hidden="true" />

                  <div className="bakery-ticket__side">
                    <span className="bakery-ticket__price">{item.price}</span>
                    <button type="button" className="bakery-ticket__add">
                      Add +
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us — horizontal strip */}
      <section className="bakery-features">
        <div className="container">
          <h2 className="bakery-section__title">Why Our Bakery Stands Out</h2>

          <motion.div
            className="bakery-features__strip"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bakery-feature"
                variants={itemVariants}
                whileHover={{ y: -6 }}
              >
                {index !== 0 && <span className="bakery-feature__rule" aria-hidden="true" />}
                <h3 className="bakery-feature__title">{feature.title}</h3>
                <p className="bakery-feature__description">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="bakery-cta"
        style={{ backgroundImage: `url(${placeholder6})` }}
      >
        <div className="container">
          <motion.div
            className="bakery-cta__content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>Craving Something Freshly Baked?</h2>
            <p>Order our signature bakes and get them delivered warm and fresh.</p>
            <Link to="/menu" className="bakery-btn bakery-btn--primary">
              Order Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}