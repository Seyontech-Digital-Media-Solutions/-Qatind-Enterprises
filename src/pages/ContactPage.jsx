import { useRef, useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useReducedMotion,
  useInView,
} from 'framer-motion'
import {
  RiArrowRightLine,
  RiSparklingLine,
  RiPhoneLine,
  RiMailLine,
  RiWhatsappLine,
  RiMapPin2Line,
  RiTimeLine,
  RiSendPlaneFill,
  RiCheckLine,
  RiInstagramLine,
  RiFacebookCircleLine,
  RiStarFill,
  RiHeart2Line,
  RiArrowDownLine,
} from 'react-icons/ri'
import { FiPhone, FiClock, FiUsers } from 'react-icons/fi'
import { BsShieldCheck, BsPatchCheck } from 'react-icons/bs'
import { LuChefHat, LuUtensilsCrossed } from 'react-icons/lu'
import { MdDeliveryDining, MdOutlineRestaurantMenu } from 'react-icons/md'

import MouseGlowCursor from '../components/common/MouseGlowCursor'
import MagneticButton from '../components/animations/MagneticButton'

import '../styles/ContactPage.scss'

const img = (path) => `${import.meta.env.BASE_URL}${path}`

const contactChannels = [
  {
    id: 'call',
    label: 'Call Direct',
    value: '+91 73054 61104',
    sub: 'Mon – Sun · 8 AM – 9 PM',
    badge: 'Instant',
    icon: RiPhoneLine,
    href: 'tel:+917305461104',
    accent: 'red',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: 'Message the Kitchen',
    sub: 'Fastest path to a custom quote',
    badge: '⚡ 15 min reply',
    icon: RiWhatsappLine,
    href: 'https://wa.me/917305461104',
    accent: 'green',
  },
  {
    id: 'email',
    label: 'Email',
    value: 'hello@qatind.com',
    sub: 'Detailed proposals & bids',
    badge: 'Quik Response',
    icon: RiMailLine,
    href: 'mailto:hello@qatind.com',
    accent: 'saffron',
  },
  {
    id: 'visit',
    label: 'Visit & Taste',
    value: 'Madambakkam, Tamil Nadu',
    sub: 'Live tastings by appointment',
    badge: 'Live Tastings',
    icon: RiMapPin2Line,
    href: 'https://maps.google.com/?q=Qatind+Enterprises+Vellore',
    accent: 'red',
  },
]

const occasionOptions = [
  { id: 'everyday', label: 'Everyday / Office Meals', icon: FiUsers },
  { id: 'corporate', label: 'Corporate Events & Summits', icon: LuChefHat },
  { id: 'hospital', label: 'Hospital & Healthcare Meals', icon: BsShieldCheck },
  { id: 'school', label: 'School / College Canteen', icon: LuUtensilsCrossed },
  { id: 'wedding', label: 'Wedding & Reception Feast', icon: RiHeart2Line },
  { id: 'party', label: 'Party & Celebration', icon: RiSparklingLine },
  { id: 'hampers', label: 'Festive & Corporate Hampers', icon: MdOutlineRestaurantMenu },
  { id: 'custom', label: 'Custom Requirement', icon: MdDeliveryDining },
]

const stats = [
  { label: 'Meals Daily', value: '10,000+', icon: MdDeliveryDining, accent: 'saffron' },
  { label: 'On-Time Rate', value: '99.8%', icon: FiClock, accent: 'green' },
  { label: 'Satisfaction', value: '4.9 / 5', icon: RiStarFill, accent: 'red' },
  { label: 'Veg/Non-Veg Lines', value: '100%', icon: BsPatchCheck, accent: 'saffron' },
]

const officeHours = [
  { day: 'Monday – Friday', time: '8:00 AM – 9:00 PM', active: true },
  { day: 'Saturday', time: '8:00 AM – 9:00 PM', active: true },
  { day: 'Sunday', time: '9:00 AM – 6:00 PM', active: false },
]

const showcaseCards = [
  {
    title: 'Corporate & Office Feasts',
    tag: 'Daily Delivery',
    img: img('Services/CorporateEvents.jpg'),
    accent: 'red',
    desc: 'Hot, hygienic, on-time — every day for 500 to 5,000 employees.',
  },
  {
    title: 'Weddings & Grand Celebrations',
    tag: 'Grand Feasts',
    img: img('Services/WeddingCatering.png'),
    accent: 'saffron',
    desc: 'Live counters, elaborate spreads, curated menus for life\'s biggest moments.',
  },
  {
    title: 'Freshly Prepared & Sealed',
    tag: 'Hygiene First',
    img: img('Services/prepareFood.webp'),
    accent: 'green',
    desc: 'FSSAI certified prep lines — separate veg / non-veg from source to serving.',
  },
]

const faqs = [
  {
    question: 'How quickly will someone respond to my enquiry?',
    answer: 'WhatsApp messages and direct calls receive immediate replies within 15 minutes during kitchen hours. Form submissions and email requests are answered within 2–4 hours with full menu breakdowns.',
  },
  {
    question: 'What details should I have ready for a quick quote?',
    answer: 'Occasion type, approximate headcount, event date, venue location, and dietary preference split (Veg/Non-Veg, Jain, Eggless). The more specific you are, the faster we shape your menu plan.',
  },
  {
    question: 'Can we book a menu tasting before finalizing?',
    answer: 'Absolutely. For weddings, grand celebrations, and major corporate contracts, we arrange live tasting sessions at our kitchen facility or deliver fresh tasting samples directly to your office.',
  },
  {
    question: 'Do you cater for small functions or last-minute orders?',
    answer: 'Yes — from intimate housewarming meals (20+ guests) to large 5,000+ guest summits. For daily office orders, 24-hour advance notice is recommended, though urgent orders can be accommodated by direct call.',
  },
]

const signatureEase = [0.22, 1, 0.36, 1]

// ─── Hero text motion variants ─────────────────────────────────────────
// Headline lines wipe up from behind a mask (like the shard reveal),
// the subhead builds word-by-word, and the actions pop in with a
// spring — a livelier, more layered entrance than a plain fade-up.
const heroTitleGroup = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.15 } },
}
const heroTitleLine = {
  hidden: { y: '112%' },
  visible: { y: '0%', transition: { duration: 0.95, ease: signatureEase } },
}

const heroWordGroup = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.85 } },
}
const heroWord = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: signatureEase } },
}

const heroActionsGroup = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 1.15 } },
}
const heroActionItem = {
  hidden: { opacity: 0, y: 16, scale: 0.86 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
}

const heroSubtitleText =
  "Daily office lunches for 500 or grand wedding feasts for 3,000 — our kitchen is ready to plan, cook, and serve with care."
const heroSubtitleWords = heroSubtitleText.split(' ')

// ─── Hero background images (cycled by the paper-tear transition) ────
const heroImages = [
  img('Contact/contact-hero-bg.jpg'),
  img('Contact/Contact-hero-bg1.jpg'),
  img('Services/prepareFood.webp'),
]

// ─── Animated Counter ─────────────────────────────────────────────────
function AnimatedNumber({ value, duration = 1.4 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const motionVal = useMotionValue(0)
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isInView) return
    const num = parseFloat(value.replace(/[^0-9.]/g, ''))
    const controls = motionVal
    let start = null
    const animate = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / (duration * 1000), 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      const current = num * ease
      const formatted = value.includes('%')
        ? current.toFixed(1) + (value.includes('/') ? ' / 5' : '%')
        : value.includes('+')
        ? Math.round(current).toLocaleString() + '+'
        : current.toFixed(1) + (value.includes('/') ? ' / 5' : '')
      setDisplay(value.includes('%') && value.includes('.')
        ? current.toFixed(1) + '%'
        : value.includes('/')
        ? current.toFixed(1) + ' / 5'
        : value.includes('+')
        ? Math.round(current).toLocaleString() + '+'
        : Math.round(current) + '%')
      if (progress < 1) requestAnimationFrame(animate)
      else setDisplay(value)
    }
    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return <span ref={ref}>{display}</span>
}

// ─── Hero image cycle ──────────────────────────────────────────────────
// Lifted out of the transition component so the hero copy can animate
// in sync with the same "tearing" beat that drives the background.
function useHeroImageCycle(count, { cycleMs = 5800, tearMs = 1150 } = {}) {
  const prefersReducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [tearing, setTearing] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) return undefined

    const cycle = window.setInterval(() => {
      setTearing(true)
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % count)
        setTearing(false)
      }, tearMs)
    }, cycleMs)

    return () => window.clearInterval(cycle)
  }, [prefersReducedMotion, count, cycleMs, tearMs])

  return { index, nextIndex: (index + 1) % count, tearing, prefersReducedMotion }
}

// ─── Hero "Paper Tear" Background Transition ──────────────────────────
// The current photo splits along a slanted seam into two shards. The
// left shard translates away toward the top-left corner, the right
// shard toward the bottom-right corner, fading as they go — revealing
// the next photo already sitting underneath. Then the cycle repeats.
function HeroTearTransition({ index, nextIndex, tearing, prefersReducedMotion }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

  const shardTransition = { duration: 1.05, ease: signatureEase }

  return (
    <div ref={ref} className="contact-hero-bg-wrap">
      <motion.div className="contact-hero-bg-reel" style={{ y }}>
        {/* Next photo, always sitting full-bleed underneath the shards */}
        <div
          className="contact-hero-bg-img--base"
          style={{ backgroundImage: `url(${heroImages[nextIndex]})` }}
        />

        {/* Current photo, torn into two slanted halves */}
        <motion.div
          className="contact-hero-bg-shard contact-hero-bg-shard--left"
          style={{ backgroundImage: `url(${heroImages[index]})` }}
          animate={
            !prefersReducedMotion && tearing
              ? { x: '-55%', y: '-38%', rotate: -10, opacity: 0 }
              : { x: '0%', y: '0%', rotate: 0, opacity: 1 }
          }
          transition={shardTransition}
        />
        <motion.div
          className="contact-hero-bg-shard contact-hero-bg-shard--right"
          style={{ backgroundImage: `url(${heroImages[index]})` }}
          animate={
            !prefersReducedMotion && tearing
              ? { x: '55%', y: '38%', rotate: 10, opacity: 0 }
              : { x: '0%', y: '0%', rotate: 0, opacity: 1 }
          }
          transition={{ ...shardTransition, delay: 0.05 }}
        />
      </motion.div>
      <div className="contact-hero-bg-vignette" />
    </div>
  )
}

// ─── Channel Card ─────────────────────────────────────────────────────
function ChannelCard({ ch, i }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <motion.a
      ref={ref}
      key={ch.id}
      href={ch.href}
      target={ch.id === 'visit' || ch.id === 'whatsapp' ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease: signatureEase }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className={`contact-channel-card contact-channel-card--${ch.accent}`}
    >
      <div className="contact-channel-eyebrow">
        <span className={`contact-channel-icon contact-channel-icon--${ch.accent}`}>
          <ch.icon />
        </span>
        <span className={`contact-channel-badge contact-channel-badge--${ch.accent}`}>{ch.badge}</span>
      </div>
      <h3 className="contact-channel-title">{ch.label}</h3>
      <p className="contact-channel-value">{ch.value}</p>
      <p className="contact-channel-sub">{ch.sub}</p>
      <div className="contact-channel-stat-row">
        <span className={`contact-channel-stat contact-channel-stat--${ch.accent}`}>{ch.stat}</span>
        <span className="contact-channel-stat-label">{ch.statLabel}</span>
      </div>
      <div className="contact-channel-cta">
        <span>Connect</span>
        <motion.span
          className="contact-channel-arrow"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
        >
          <RiArrowRightLine />
        </motion.span>
      </div>
    </motion.a>
  )
}

// ─── Showcase with Overshading ────────────────────────────────────────
function ShowcaseCard({ sc, i }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.12, ease: signatureEase }}
      className="contact-showcase-card"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className="contact-showcase-image-wrap">
        <motion.img
          src={sc.img}
          alt={sc.title}
          className="contact-showcase-image"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.7, ease: signatureEase }}
        />
        {/* Cinematic overshading layers */}
        <motion.div
          className="contact-showcase-shade-base"
          animate={{ opacity: hovered ? 0.55 : 0.72 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="contact-showcase-shade-color"
          animate={{ opacity: hovered ? 0.3 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background:
              sc.accent === 'red'
                ? 'linear-gradient(135deg, rgba(193,39,45,0.6) 0%, transparent 70%)'
                : sc.accent === 'saffron'
                ? 'linear-gradient(135deg, rgba(255,153,51,0.5) 0%, transparent 70%)'
                : 'linear-gradient(135deg, rgba(20,108,54,0.5) 0%, transparent 70%)',
          }}
        />
        <span className={`contact-showcase-tag contact-showcase-tag--${sc.accent}`}>{sc.tag}</span>
        <motion.div
          className="contact-showcase-reveal"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
          transition={{ duration: 0.4, ease: signatureEase }}
        >
          
        </motion.div>
      </div>
      <div className="contact-showcase-body">
        <h3 className="contact-showcase-title">{sc.title}</h3>
        <p className="contact-showcase-desc">{sc.desc}</p>
      </div>
    </motion.div>
  )
}

/* =====================================================================
   MAIN PAGE
===================================================================== */
export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(0)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    occasion: occasionOptions[0].label,
    guests: '',
    message: '',
  })
  const [status, setStatus] = useState('idle')

  const { scrollYProgress: pageProgress } = useScroll()
  const progressBar = useSpring(pageProgress, { stiffness: 120, damping: 24 })

  const { index: heroIndex, nextIndex: heroNextIndex, tearing: heroTearing, prefersReducedMotion } =
    useHeroImageCycle(heroImages.length)

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setStatus('sending')
    const lines = [
      `👋 New Catering Enquiry from ${form.name}`,
      `📞 Phone: ${form.phone}`,
      `🎉 Occasion: ${form.occasion}`,
      form.guests ? `👥 Guest Count: ${form.guests} Guests` : null,
      form.message ? `💬 Details: ${form.message}` : null,
    ]
      .filter(Boolean)
      .join('\n')
    window.setTimeout(() => {
      window.open(
        `https://wa.me/917305401704?text=${encodeURIComponent(lines)}`,
        '_blank',
        'noopener'
      )
      setStatus('sent')
    }, 550)
  }

  return (
    <div className="contact-page">
      <MouseGlowCursor />

      {/* Reading Progress Bar */}
      {/* <motion.div style={{ scaleX: progressBar }} className="cp-progress-bar" /> */}

      {/* ================================================================
          1 — HERO: Light theme with paper-tear image transition
      ================================================================ */}
      <section className="contact-hero">
        <HeroTearTransition
          index={heroIndex}
          nextIndex={heroNextIndex}
          tearing={heroTearing}
          prefersReducedMotion={prefersReducedMotion}
        />

        <motion.div
          className="contact-hero-content"
          animate={
            !prefersReducedMotion && heroTearing
              ? { scale: 0.985, filter: 'blur(1.5px)' }
              : { scale: 1, filter: 'blur(0px)' }
          }
          transition={{ duration: 0.6, ease: signatureEase }}
        >
          <motion.span
            initial={{ opacity: 0, y: -14, scale: 0.85, rotate: -4 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.05 }}
            className="contact-hero-pill"
          >
            <RiSparklingLine />
            Direct Kitchen Concierge
          </motion.span>

          <motion.h1
            className="contact-hero-title"
            initial="hidden"
            animate="visible"
            variants={heroTitleGroup}
          >
            <span className="contact-hero-title-line">
              <motion.span className="contact-hero-title-line-inner" variants={heroTitleLine}>
                Good food,
              </motion.span>
            </span>
            <span className="contact-hero-title-line">
              <motion.span
                className="contact-hero-title-line-inner contact-hero-title-em"
                variants={heroTitleLine}
              >
                brought to your table.
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            className="contact-hero-sub"
            initial="hidden"
            animate="visible"
            variants={heroWordGroup}
          >
            {heroSubtitleWords.map((word, i) => (
              <motion.span key={`${word}-${i}`} className="contact-hero-word" variants={heroWord}>
                {word}
                {'\u00A0'}
              </motion.span>
            ))}
          </motion.p>

          <motion.div
            className="contact-hero-actions"
            initial="hidden"
            animate="visible"
            variants={heroActionsGroup}
          >
            <motion.div variants={heroActionItem} className="contact-hero-action-item">
              <MagneticButton>
                <a
                  href="https://wa.me/917305401704"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-btn contact-btn--whatsapp"
                >
                  <RiWhatsappLine />
                  Chat on WhatsApp
                </a>
              </MagneticButton>
            </motion.div>

            <motion.div variants={heroActionItem} className="contact-hero-action-item">
              <MagneticButton>
                <a href="tel:+917305401704" className="contact-btn contact-btn--call">
                  <FiPhone />
                  +91 73054 01704
                </a>
              </MagneticButton>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="contact-hero-scroll"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <RiArrowDownLine />
            </motion.div>
            <span>Scroll to explore</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ================================================================
          2 — STATS
      ================================================================ */}
      <section className="cp-stats-section">
        <div className="cp-stats-inner">
          {stats.map((st, i) => (
            <motion.div
              key={st.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12%' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: signatureEase }}
              className={`cp-stat-card cp-stat-card--${st.accent}`}
            >
              <div className={`cp-stat-icon cp-stat-icon--${st.accent}`}>
                <st.icon />
              </div>
              <div>
                <p className="cp-stat-value">
                  <AnimatedNumber value={st.value} />
                </p>
                <p className="cp-stat-label">{st.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================================================================
          3 — CHANNELS
      ================================================================ */}
      <section className="cp-channels-section">
        <div className="cp-channels-inner">
          <motion.div
            className="cp-section-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.65, ease: signatureEase }}
          >
            <p className="cp-eyebrow">Fast & Direct Access</p>
            <h2 className="cp-section-title">Reach out however suits you best.</h2>
          </motion.div>

          <div className="cp-channels-grid">
            {contactChannels.map((ch, i) => (
              <ChannelCard key={ch.id} ch={ch} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          4 — FORM + INFO (split layout)
      ================================================================ */}
      <section className="cp-form-section">
        <div className="cp-form-inner">
          {/* Form side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.75, ease: signatureEase }}
            className="cp-form-col"
          >
            <p className="cp-eyebrow">Instant Plan & Quote</p>
            <h2 className="cp-section-title cp-section-title--left">Tell us about your event. We'll craft the menu.</h2>

            <form onSubmit={handleSubmit} className="cp-form">
              <div className="cp-field-row">
                <label className="cp-field-wrap">
                  <span className="cp-field-label">Your name</span>
                  <input
                    required
                    value={form.name}
                    onChange={handleChange('name')}
                    placeholder="Aravind Kumar"
                    className="cp-field"
                  />
                </label>
                <label className="cp-field-wrap">
                  <span className="cp-field-label">Phone number</span>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={handleChange('phone')}
                    placeholder="+91 XXXXX XXXXX"
                    className="cp-field"
                  />
                </label>
              </div>

              <div className="cp-occasion-block">
                <span className="cp-field-label">Occasion type</span>
                <div className="cp-chips">
                  {occasionOptions.slice(0, 6).map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, occasion: o.label }))}
                      className={`cp-chip ${form.occasion === o.label ? 'cp-chip--active' : ''}`}
                    >
                      <o.icon aria-hidden="true" />
                      <span>{o.label.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="cp-field-row cp-field-row--mt">
                <label className="cp-field-wrap">
                  <span className="cp-field-label">Full occasion</span>
                  <select value={form.occasion} onChange={handleChange('occasion')} className="cp-field cp-select">
                    {occasionOptions.map((o) => (
                      <option key={o.id} value={o.label}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="cp-field-wrap">
                  <span className="cp-field-label">Estimated guests</span>
                  <input
                    type="number"
                    min="1"
                    value={form.guests}
                    onChange={handleChange('guests')}
                    placeholder="150"
                    className="cp-field"
                  />
                </label>
              </div>

              <label className="cp-field-wrap cp-field-wrap--mt">
                <span className="cp-field-label">Dietary notes & event date</span>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={handleChange('message')}
                  placeholder="Event date, venue, Veg/Non-Veg ratio, Jain or low-oil requests…"
                  className="cp-field cp-textarea"
                />
              </label>

              <div className="cp-submit-wrap">
                <MagneticButton>
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    disabled={status === 'sending'}
                    className="cp-submit-btn"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {status === 'sent' ? (
                        <motion.span
                          key="sent"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="cp-submit-inner"
                        >
                          <RiCheckLine />
                          WhatsApp Chat Opened
                        </motion.span>
                      ) : (
                        <motion.span
                          key="send"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="cp-submit-inner"
                        >
                          {status === 'sending' ? 'Opening WhatsApp…' : 'Send via WhatsApp'}
                          <RiSendPlaneFill />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </MagneticButton>
                <p className="cp-submit-note">
                  Opens WhatsApp with pre-filled details — instant estimation.
                </p>
              </div>
            </form>
          </motion.div>

          {/* Info side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.75, delay: 0.1, ease: signatureEase }}
            className="cp-info-col"
          >
            <div className="cp-info-card">
              <span className="cp-info-badge">
                <BsShieldCheck />
                FSSAI Certified Master Kitchen
              </span>

              <h3 className="cp-info-title">Kitchen hours</h3>
              <div className="cp-hours-list">
                {officeHours.map((h) => (
                  <div key={h.day} className={`cp-hours-row ${h.active ? 'cp-hours-row--active' : ''}`}>
                    <span className="cp-hours-day">
                      <RiTimeLine aria-hidden="true" />
                      {h.day}
                    </span>
                    <span className="cp-hours-time">{h.time}</span>
                  </div>
                ))}
              </div>

              <h3 className="cp-info-title cp-info-title--mt">Kitchen & office</h3>
              <p className="cp-address">
                <RiMapPin2Line aria-hidden="true" />
                Qatind Enterprises, Main Road, Vellore, Tamil Nadu
                <br />
                <span className="cp-address-note">Tastings available by appointment</span>
              </p>

              <div className="cp-info-image-wrap">
                <img
                  src={img('Contact/officekitchen.jpg')}
                  alt="Qatind Office & Kitchen"
                  className="cp-info-image"
                  loading="lazy"
                />
                <div className="cp-info-image-shine" />
              </div>

              <div className="cp-social-row">
                <span className="cp-social-label">Follow Qatind</span>
                <div className="cp-social-icons">
                  {[
                    { href: 'https://instagram.com', icon: RiInstagramLine, label: 'Instagram' },
                    { href: 'https://facebook.com', icon: RiFacebookCircleLine, label: 'Facebook' },
                  ].map(({ href, icon: Icon, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="cp-social-icon"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                      <Icon />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          5 — SHOWCASE with cinematic overshading
      ================================================================ */}
      <section className="cp-showcase-section">
        <div className="cp-showcase-inner">
          <motion.div
            className="cp-section-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.65, ease: signatureEase }}
          >
            <p className="cp-eyebrow">What We Cater</p>
            <h2 className="cp-section-title">Food created for every scale and style.</h2>
          </motion.div>

          <div className="cp-showcase-grid">
            {showcaseCards.map((sc, i) => (
              <ShowcaseCard key={sc.title} sc={sc} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          6 — FAQ
      ================================================================ */}
      <section className="cp-faq-section">
        <div className="cp-faq-inner">
          <div className="cp-faq-left">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12%' }}
              transition={{ duration: 0.65, ease: signatureEase }}
            >
              <p className="cp-eyebrow">Questions Answered</p>
              <h2 className="cp-faq-title">Everything you need to know before you reach out.</h2>
              <p className="cp-faq-desc">
                Have a custom requirement or dietary need? Call our kitchen team directly.
              </p>
              <MagneticButton>
                <a href="tel:+917305401704" className="cp-faq-phone">
                  <FiPhone aria-hidden="true" />
                  +91 73054 01704
                </a>
              </MagneticButton>
            </motion.div>
          </div>

          <div className="cp-faq-list">
            {faqs.map((item, index) => {
              const isOpen = openFaq === index
              return (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ duration: 0.5, delay: index * 0.07, ease: signatureEase }}
                  className={`cp-faq-item ${isOpen ? 'cp-faq-item--open' : ''}`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="cp-faq-btn"
                  >
                    <span>{item.question}</span>
                    <motion.span
                      className="cp-faq-icon"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: signatureEase }}
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: signatureEase }}
                        className="cp-faq-answer-wrap"
                      >
                        <p className="cp-faq-answer">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          7 — CTA
      ================================================================ */}
      <section className="cp-cta-section">
        <div className="cp-cta-noise" />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.85, ease: signatureEase }}
          className="cp-cta-inner"
        >
          <p className="cp-cta-eyebrow">Ready to get started?</p>
          <h2 className="cp-cta-title">
            A 5-minute conversation<br />sets your menu in motion.
          </h2>
          <p className="cp-cta-sub">
            No commitment. No stress. Let's plan delicious food for your guests.
          </p>
          <div className="cp-cta-actions">
            <MagneticButton>
              <a href="tel:+917305401704" className="contact-btn contact-btn--cta-primary">
                Call Qatind Kitchen
                <RiArrowRightLine />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://wa.me/917305401704"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn contact-btn--cta-outline"
              >
                <RiWhatsappLine />
                WhatsApp Instant Quote
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </section>
    </div>
  )
}