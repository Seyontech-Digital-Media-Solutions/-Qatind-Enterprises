import React, { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from 'framer-motion'

import {
  ArrowRight,
  Award,
  Bike,
  Compass,
  Flame,
  HandHeart,
  Heart,
  Home,
  Leaf,
  MapPin,
  Quote,
  ShieldCheck,
  Sprout,
  TrendingUp,
  Utensils,
} from 'lucide-react'

import aboutHeroImage from '../assets/image.jpeg'
import '../styles/About.scss'

// ─── helpers ────────────────────────────────────────────────────────────────

const img = (path) => `${import.meta.env.BASE_URL}${path}`

// shared easing used throughout
const EASE = [0.22, 1, 0.36, 1]

// ─── Reveal wrapper ──────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, y = 32, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-72px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

// ─── Stagger container ───────────────────────────────────────────────────────

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const staggerChild = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

// ─── Data ────────────────────────────────────────────────────────────────────

const pillars = [
  {
    icon: Sprout,
    title: 'Farm-to-table freshness',
    text: 'Sourced direct from farmers, fishermen, and mills — freshness intact.',
    accent: 'var(--color-primary)',
    iconBg: 'rgba(20, 108, 54, 0.12)',
    cardBg: '#ffffff',
    border: 'var(--color-primary)',
  },
  {
    icon: Leaf,
    title: 'Nothing artificial',
    text: 'No shortcuts or artificial flavours — just ingredients you can trust.',
    accent: '#996111',
    iconBg: 'rgba(255, 153, 51, 0.14)',
    cardBg: '#fffdf8',
    border: 'var(--color-secondary)',
  },
  {
    icon: HandHeart,
    title: 'Fair to every hand',
    text: 'A shorter supply chain means better pay and greater respect.',
    accent: 'var(--color-primary)',
    iconBg: 'rgba(20, 108, 54, 0.12)',
    cardBg: '#ffffff',
    border: 'var(--color-primary)',
  },
  {
    icon: Utensils,
    title: 'Made your way',
    text: 'Every menu shaped around your family, taste, and occasion.',
    accent: '#996111',
    iconBg: 'rgba(255, 153, 51, 0.14)',
    cardBg: '#fffdf8',
    border: 'var(--color-secondary)',
  },
]

const visionFeatures = [
  { icon: Leaf,       label: 'Fresh Ingredients'     },
  { icon: HandHeart,  label: 'Trusted By Families'   },
  { icon: ShieldCheck,label: '100% Transparent'      },
]

const missionFeatures = [
  { icon: HandHeart,  label: 'Support Local Livelihoods' },
  { icon: Sprout,     label: 'Chemical-Free Food'        },
  { icon: Heart,      label: 'Community First'           },
]

const milestones = [
  {
    year: '2014',
    title: 'A Small Kitchen, A Big Dream',
    text: 'Qatind began with honest, home-style cooking and ingredients at the centre of every meal.',
    icon: Home,
    dot: 'top',
  },
  {
    year: '2017',
    title: 'Stepping Into Corporate',
    text: 'We started catering to corporate offices and events, bringing the same standards to bigger orders.',
    icon: TrendingUp,
    dot: 'bottom',
  },
  {
    year: '2020',
    title: 'Sealed For Safety',
    text: 'We introduced tamper-proof sealing and rigorous checks without losing the touch of homemade prep.',
    icon: ShieldCheck,
    dot: 'top',
  },
  {
    year: '2023',
    title: '10,000 Meals Delivered',
    text: 'A milestone built on trust, consistency, and families choosing us again and again.',
    icon: Bike,
    dot: 'bottom',
  },
]

const partners = [
  { name: 'Aptiv',              logo: 'aptiv.png'   },
  { name: 'DLF',                logo: 'DLF.jpg'     },
  { name: 'Keppel Corporation', logo: 'keppel.png'  },
  { name: 'L&T',                logo: 'L&T.jpg'     },
  { name: 'RMZ',                logo: 'RMZ.png'     },
  { name: 'Propel',             logo: 'propel.png'  },
]

// ─── Stat counter card ───────────────────────────────────────────────────────

function StatCard({ value, label, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="about-hero__stat-card"
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
      whileHover={{ y: -4, scale: 1.04 }}
    >
      <strong>{value}</strong>
      <span>{label}</span>
    </motion.div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function AboutPage() {
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroTextY  = useTransform(scrollYProgress, [0, 1], [0, 90])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const blobScale   = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const blobY       = useTransform(scrollYProgress, [0, 1], [0, 40])

  return (
    <div className="about-page">

      {/* ================================================================
          HERO
      ================================================================ */}
      <section ref={heroRef} className="about-hero">

        {/* text column */}
        <motion.div
          className="about-hero__content"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          <Reveal>
            <span className="section-kicker">The people behind Qatind</span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1>About us.</h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="about-hero__text">
              Real food, real farmers, and honest flavours — crafted the way
              home-cooked meals are meant to be shared.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="about-hero__actions">
              <motion.button
                type="button"
                className="primary-button"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Learn more <ArrowRight size={18} />
              </motion.button>

              <motion.button
                type="button"
                className="secondary-button"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Contact us
              </motion.button>
            </div>
          </Reveal>

          {/* stat cards */}
          <div className="about-hero__meta">
            <StatCard value="500+"  label="families served"  delay={0.30} />
            <StatCard value="50+"   label="trusted vendors"  delay={0.38} />
            <StatCard value="92%"   label="repeat orders"    delay={0.46} />
          </div>
        </motion.div>

        {/* image column */}
        <Reveal delay={0.18}>
          <div className="about-hero__visual">
            <motion.div
              className="about-blob"
              style={{ scale: blobScale, y: blobY }}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src={img('About/about-hero.jpg')}
                alt="Curated Indian dining platter"
              />

              {/* floating badge */}
              <motion.div
                className="about-blob__badge"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.55, ease: EASE }}
                whileHover={{ scale: 1.08 }}
              >
                <Heart size={14} />
                <span>Home-crafted since 2014</span>
              </motion.div>
            </motion.div>
          </div>
        </Reveal>

      </section>


      {/* ================================================================
          STORY
      ================================================================ */}
      <section className="about-story section-shell">
        <Reveal>
          <div className="story-copy">
            <span className="section-kicker accent">Our story</span>

            <h2>From honest ingredients to memorable meals.</h2>

            <p>
              Qatind began with a simple question: why should great food lose
              its soul while moving from the field to the family table? By
              buying directly from farmers, fishermen and mills, we keep the
              journey short and the flavour vibrant.
            </p>

            <p>
              Every recipe is shaped by the same values we'd bring to our own
              family kitchen — fresh ingredients, mindful preparation, and
              food that brings people together.
            </p>
          </div>
        </Reveal>
      </section>


      {/* ================================================================
          MANAGING DIRECTOR
      ================================================================ */}
      <section className="about-director section-shell">
        <Reveal>
          <div className="director-panel">

            <div className="director-panel__portrait">
              <motion.div
                className="director-panel__portrait-frame"
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <img
                  src={img('About/MDphoto.jpeg')}
                  alt="Rosalind Sathya Kumar, Managing Director"
                  className="director-panel__portrait-img"
                />
              </motion.div>
            </div>

            <div className="director-panel__content">
              <span className="section-kicker accent">Leadership</span>

              <h2>A word from our Managing Director</h2>

              <Quote className="director-panel__quote-mark" aria-hidden="true" />

              <p className="director-panel__quote">
                The passionate home chef and creative force behind Qatind
                Restaurant. With years of culinary expertise and an endless
                love for delicious food, she has turned every dish into a
                beautiful celebration of taste, tradition, and creativity.
                From the first bite to the last, Qatind promises a flavour
                experience that delights your senses and keeps you craving
                for more.
              </p>

              <div className="director-panel__signature">
                <strong>Rosalind Sathya Kumar</strong>
                <span>Managing Director, Qatind</span>
              </div>
            </div>

          </div>
        </Reveal>
      </section>


      {/* ================================================================
          VISION & MISSION
      ================================================================ */}
      <section className="about-values section-shell light-shell">

        <div className="values-heading">
          <Reveal>
            <span className="values-eyebrow">
              <Leaf size={14} />
              What drives us
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2>Vision <span>&amp;</span> Mission</h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="values-intro">
              Rooted in purpose. Driven by people. Building a better food
              future, one homemade meal at a time.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="values-cards">

            {/* ── VISION ── */}
            <motion.article
              className="values-card values-card--vision"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
              whileHover={{ y: -8, scale: 1.01 }}
            >
              <div className="values-card__pattern" aria-hidden="true">
                <Leaf size={170} />
              </div>

              <div className="values-card__top">
                <div className="values-card__icon"><MapPin size={23} /></div>
                <span className="values-card__label">Where we're headed</span>
              </div>

              <div className="values-card__content">
                <h3 className="vision">Vision</h3>
                <div className="values-card__line" aria-hidden="true"><span /></div>
                <p>
                  To become the kitchen Indian families trust most — where
                  fresh, local, and transparent food creates a better table
                  for everyone.
                </p>
              </div>

              <motion.div
                className="values-card__features"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {visionFeatures.map((f) => {
                  const Icon = f.icon
                  return (
                    <motion.div
                      key={f.label}
                      className="values-feature"
                      variants={staggerChild}
                      whileHover={{ scale: 1.08 }}
                    >
                      <div className="values-feature__icon"><Icon size={17} /></div>
                      <span>{f.label}</span>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.article>

            {/* ── CENTER BADGE ── */}
            <motion.div
              className="values-center-badge"
              aria-hidden="true"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="values-center-badge__inner">
                <Home size={30} />
              </div>
            </motion.div>

            {/* ── MISSION ── */}
            <motion.article
              className="values-card values-card--mission"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
              whileHover={{ y: -8, scale: 1.01 }}
            >
              <div className="values-card__food-image" aria-hidden="true">
                <img src={aboutHeroImage} alt="" />
              </div>
              <div className="values-card__overlay" />

              <div className="values-card__top">
                <div className="values-card__icon"><Flame size={23} /></div>
                <span className="values-card__label">How we get there</span>
              </div>

              <div className="values-card__content">
                <h3 className="Mission">Mission</h3>
                <div className="values-card__line" aria-hidden="true"><span /></div>
                <p>
                  To serve homemade, chemical-free meals that support fair
                  livelihoods for the farmers, makers, and communities
                  behind every dish.
                </p>
              </div>

              <motion.div
                className="values-card__features"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {missionFeatures.map((f) => {
                  const Icon = f.icon
                  return (
                    <motion.div
                      key={f.label}
                      className="values-feature"
                      variants={staggerChild}
                      whileHover={{ scale: 1.08 }}
                    >
                      <div className="values-feature__icon"><Icon size={17} /></div>
                      <span>{f.label}</span>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.article>

          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <motion.div
            className="values-bottom-message"
            whileHover={{ scale: 1.03 }}
          >
            <Leaf size={16} />
            <span>Good food. Honest sourcing. Happier families.</span>
            <Heart size={15} />
          </motion.div>
        </Reveal>

      </section>


      {/* ================================================================
          FOUR PILLARS
      ================================================================ */}
      <section className="about-pillars section-shell">

        <div className="section-header">
          <Reveal>
            <span className="section-kicker">Our core philosophy</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2>The four pillars we never bend on</h2>
          </Reveal>
        </div>

        <motion.div
          className="diamonds-row"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {pillars.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                className="diamond-wrapper"
                variants={staggerChild}
              >
                <motion.div
                  className="diamond-card"
                  style={{ background: item.cardBg, borderColor: item.border }}
                  whileHover={{
                    rotate: [45, 48, 45],
                    scale: 1.07,
                    boxShadow: '0 28px 60px -20px rgba(20,20,20,0.32)',
                  }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="diamond-card__inner">
                    <motion.div
                      className="diamond-card__icon"
                      style={{ background: item.iconBg, color: item.accent }}
                      whileHover={{ rotate: -45, scale: 1.15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon size={22} />
                    </motion.div>
                    <h3 style={{ color: item.accent }}>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

      </section>


      {/* ================================================================
          JOURNEY / TIMELINE
      ================================================================ */}
      <section className="about-milestones section-shell light-shell">

        <div className="section-header">
          <Reveal>
            <span className="section-kicker accent">How we got here</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2>Our journey</h2>
          </Reveal>
        </div>

        <div className="timeline-row">
          {milestones.map((item, index) => {
            const Icon = item.icon
            const connector = (
              <motion.div
                className={`timeline-connector timeline-connector--${item.dot}`}
                initial={{ scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 + 0.2 }}
                style={{ transformOrigin: item.dot === 'top' ? 'bottom' : 'top' }}
              >
                <span className="timeline-connector__dot" />
                <span className="timeline-connector__line" />
              </motion.div>
            )

            return (
              <Reveal
                key={item.year}
                delay={index * 0.12}
                className="timeline-col"
              >
                <div className="timeline-item">
                  {item.dot === 'top' && connector}

                  <motion.div
                    className="timeline-card"
                    whileHover={{ y: -6, boxShadow: '0 32px 56px -28px rgba(20,20,20,0.38)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="timeline-card__icon"
                      whileHover={{ rotate: 15, scale: 1.12 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon size={22} />
                    </motion.div>
                    <span className="timeline-card__year">{item.year}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </motion.div>

                  {item.dot === 'bottom' && connector}
                </div>
              </Reveal>
            )
          })}
        </div>

      </section>


      {/* ================================================================
          PARTNERS
      ================================================================ */}
      <section className="about-partners section-shell">

        <div className="section-header">
          <Reveal>
            <span className="section-kicker accent">Who we work with</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2>Our partners</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="partners-intro">
              The farms, mills, and makers we've built lasting relationships
              with along the way.
            </p>
          </Reveal>
        </div>

        <div className="partners-strip">
          {partners.map((partner, index) => (
            <React.Fragment key={partner.name}>
              <motion.div
                className="partner-item"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
              >
                <motion.img
                  src={img(`About/${partner.logo}`)}
                  alt={partner.name}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3.4 + (index % 3) * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.25,
                  }}
                  whileHover={{ scale: 1.1, filter: 'grayscale(0) opacity(1)' }}
                />
              </motion.div>

              {index < partners.length - 1 && (
                <span className="partner-divider" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>

      </section>


      {/* ================================================================
          BRAND PROMISE
      ================================================================ */}
      <section className="about-brand section-shell">
        <Reveal>
          <motion.div
            className="brand-panel"
            whileHover={{ boxShadow: '0 40px 80px -52px rgba(28,28,28,0.6)' }}
            transition={{ duration: 0.4 }}
          >

            <div className="brand-panel__content">
              <span className="section-kicker accent">The Qatind promise</span>

              <h2>
                Fresh flavours. Thoughtful sourcing. A table built around
                trust.
              </h2>

              <p>
                We believe food tastes better when it is honest, personal,
                and made with care — from the very first ingredient to the
                last plate served.
              </p>

              <motion.div
                className="brand-panel__stats"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <motion.div variants={staggerChild} whileHover={{ scale: 1.05 }}>
                  <Award size={18} />
                  <span>Home-crafted quality</span>
                </motion.div>

                <motion.div variants={staggerChild} whileHover={{ scale: 1.05 }}>
                  <Compass size={18} />
                  <span>Fresh from trusted sources</span>
                </motion.div>
              </motion.div>
            </div>

            <div
              className="brand-panel__visual"
              aria-label="Premium food styling"
            />

          </motion.div>
        </Reveal>
      </section>

    </div>
  )
}