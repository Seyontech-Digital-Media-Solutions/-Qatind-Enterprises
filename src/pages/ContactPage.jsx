import { useRef, useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
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
} from 'react-icons/ri'
import { FaWhatsapp } from 'react-icons/fa'
import { FiClock, FiUsers, FiPhone } from 'react-icons/fi'
import { BsShieldCheck, BsPatchCheck } from 'react-icons/bs'
import { LuChefHat, LuUtensilsCrossed } from 'react-icons/lu'
import { MdDeliveryDining, MdOutlineRestaurantMenu } from 'react-icons/md'

import MouseGlowCursor from '../components/common/MouseGlowCursor'
import MagneticButton from '../components/animations/MagneticButton'

import '../styles/ContactPage.scss'

const img = (path) => `${import.meta.env.BASE_URL}${path}`

// ─── Contact details: ONE place to change them ────────────────────────
// Numbers are digits only, with the country code (no +, spaces or dashes).
// Confirm with the client which number is for calls and which is for
// WhatsApp, and swap these two values if needed.
const CALL_NUMBER = '917305461104'
const CALL_DISPLAY = '+91 73054 61104'
const WHATSAPP_NUMBER = '917305401704'
const WHATSAPP_DISPLAY = '+91 73054 01704'

const callHref = `tel:+${CALL_NUMBER}`
const whatsappHref = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`

const contactChannels = [
  {
    id: 'call',
    label: 'Call Direct',
    value: CALL_DISPLAY,
    sub: 'Mon – Sun · 8 AM – 9 PM',
    badge: 'Instant',
    icon: RiPhoneLine,
    href: callHref,
    accent: 'red',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: 'Message the Kitchen',
    sub: 'Fastest path to a custom quote',
    badge: '⚡ 15 min reply',
    icon: RiWhatsappLine,
    href: whatsappHref(),
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
    value: 'Ramapuram, Tamil Nadu',
    sub: 'Live tastings by appointment',
    badge: 'Live Tastings',
    icon: RiMapPin2Line,
    // Replace with the Google Business Profile share link once it exists.
    href: 'https://maps.google.com/?q=Qatind+Enterprises+Ramapuram+Chennai',
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
  { label: 'Meals Daily', value: '10,000', icon: MdDeliveryDining, accent: 'saffron' },
  { label: 'On-Time Rate', value: '99.8%', icon: FiClock, accent: 'green' },
  { label: 'Satisfaction', value: '4.9 / 5', icon: RiStarFill, accent: 'red' },
  { label: 'Veg/Non-Veg Lines', value: '100%', icon: BsPatchCheck, accent: 'saffron' },
]

const officeHours = [
  { day: 'Monday – Friday', time: '7:00 AM – 9:00 PM', active: true },
  { day: 'Saturday', time: '8:00 AM – 9:00 PM', active: true },
  { day: 'Sunday', time: '9:00 AM – 6:00 PM', active: false },
]

// ─── Delivery locations ───────────────────────────────────────────────
// Add or remove areas here. `home: true` marks the kitchen's own area.
const deliveryAreas = [
  { name: 'Ramapuram', home: true },
  { name: 'Porur' },
  { name: 'Valasaravakkam' },
  { name: 'Manapakkam' },
  { name: 'Guindy' },
  { name: 'Alandur' },
  { name: 'Adambakkam' },
  { name: 'Nandambakkam' },
  { name: 'Nesapakkam' },
  { name: 'Ashok Nagar' },
  { name: 'KK Nagar' },
  { name: 'Kolapakkam' },
  { name: 'Mugalivakkam' },
  { name: 'Moulivakkam' },
  { name: 'Saligramam' },
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

// ─── Hero motion ───────────────────────────────────────────────────────
// The copy column builds in one piece at a time (pill, headline, text,
// buttons, facts); the photo frame scales in beside it.
const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const heroFade = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: signatureEase } },
}

// ─── Delivery chips motion ─────────────────────────────────────────────
const deliveryListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}
const deliveryChipVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: signatureEase } },
}

const heroSubtitleText =
  'Daily office lunches for 500 or grand wedding feasts for 3,000 — our kitchen is ready to plan, cook, and serve with care.'

// Quick facts under the buttons (all already stated elsewhere on this page).
const heroFacts = [
  { icon: RiWhatsappLine, text: 'WhatsApp reply in about 15 min' },
  { icon: BsShieldCheck, text: 'FSSAI certified kitchen' },
  { icon: RiMapPin2Line, text: 'Tastings by appointment' },
]

// ─── Hero photos (soft crossfade slideshow) ────────────────────────────
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

// ─── Hero slideshow ────────────────────────────────────────────────────
// Advances every few seconds. Picking a dot jumps to that photo and
// restarts the timer. No auto-advance if the visitor prefers reduced motion.
function useHeroSlides(count, intervalMs = 5200) {
  const prefersReducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion || count < 2) return undefined

    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % count)
    }, intervalMs)

    return () => window.clearInterval(timer)
  }, [prefersReducedMotion, count, intervalMs, index])

  return [index, setIndex]
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

  const [heroIndex, setHeroIndex] = useHeroSlides(heroImages.length)

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
      window.open(whatsappHref(lines), '_blank', 'noopener')
      setStatus('sent')
    }, 550)
  }

  return (
    <div className="contact-page">
      <MouseGlowCursor />

      {/* Reading Progress Bar */}
      {/* <motion.div style={{ scaleX: progressBar }} className="cp-progress-bar" /> */}

      {/* ================================================================
          1 — HERO: text on a clean background, photo in an arch frame
      ================================================================ */}
      <section className="contact-hero">
        <span className="contact-hero-shape contact-hero-shape--green" aria-hidden="true" />
        <span className="contact-hero-shape contact-hero-shape--red" aria-hidden="true" />

        <div className="contact-hero-inner">

          {/* ---------- Left: copy ---------- */}
          <motion.div
            className="contact-hero-copy"
            initial="hidden"
            animate="visible"
            variants={heroStagger}
          >
            <motion.span variants={heroFade} className="contact-hero-pill">
              <RiSparklingLine aria-hidden="true" />
              Direct Kitchen Concierge
            </motion.span>

            <motion.h1 variants={heroFade} className="contact-hero-title">
              <span className="contact-hero-title-line">Good food,</span>
              <span className="contact-hero-title-line">
                <span className="contact-hero-title-em">brought to your table.</span>
              </span>
            </motion.h1>

            <motion.p variants={heroFade} className="contact-hero-sub">
              {heroSubtitleText}
            </motion.p>

            <motion.ul variants={heroFade} className="contact-hero-facts">
              {heroFacts.map(({ icon: Icon, text }) => (
                <li key={text}>
                  <Icon aria-hidden="true" />
                  <span>{text}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ---------- Right: photo ---------- */}
          <motion.div
            className="contact-hero-visual"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: signatureEase }}
          >
            <div className="contact-hero-frame">
              {heroImages.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  aria-hidden="true"
                  className={`contact-hero-slide${i === heroIndex ? ' contact-hero-slide--active' : ''}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  draggable="false"
                />
              ))}

              <div className="contact-hero-dots" role="group" aria-label="Choose a photo">
                {heroImages.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    className={`contact-hero-dot${i === heroIndex ? ' contact-hero-dot--active' : ''}`}
                    onClick={() => setHeroIndex(i)}
                    aria-label={`Show photo ${i + 1} of ${heroImages.length}`}
                    aria-pressed={i === heroIndex}
                  />
                ))}
              </div>
            </div>

            <div className="contact-hero-badge">
              <span className="contact-hero-badge-icon">
                <RiMapPin2Line aria-hidden="true" />
              </span>
              <span className="contact-hero-badge-text">
                <strong>Ramapuram, Chennai</strong>
                <small>Cooked fresh in our own kitchen</small>
              </span>
            </div>
          </motion.div>

        </div>
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
                      aria-pressed={form.occasion === o.label}
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
                <span className="cp-address-text">
                  Qatind Enterprises, Ramapuram, Chennai, Tamil Nadu
                  <span className="cp-address-note">Tastings available by appointment</span>
                </span>
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
                    { href: 'https://www.instagram.com/qatindofficial?xtok=MTJuanNncXllM2FlNw==', icon: RiInstagramLine, label: 'Instagram' },
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
          5 — DELIVERY LOCATIONS
      ================================================================ */}
      <section className="cp-delivery-section">
        <div className="cp-delivery-inner">
          <motion.div
            className="cp-section-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.65, ease: signatureEase }}
          >
            <p className="cp-eyebrow">Delivery Locations</p>
            <h2 className="cp-section-title">We deliver across these areas in Chennai.</h2>
          </motion.div>

          <motion.ul
            className="cp-delivery-grid"
            variants={deliveryListVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-8%' }}
          >
            {deliveryAreas.map((area) => (
              <motion.li
                key={area.name}
                variants={deliveryChipVariants}
                className={`cp-delivery-chip${area.home ? ' cp-delivery-chip--home' : ''}`}
              >
                <RiMapPin2Line aria-hidden="true" />
                <span className="cp-delivery-name">{area.name}</span>
                {area.home && <small className="cp-delivery-tag">Our kitchen</small>}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="cp-delivery-note"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.55, ease: signatureEase }}
          >
            <p>Don&apos;t see your area? Message us and we&apos;ll confirm if we can reach you.</p>
            <a
              href={whatsappHref('Hi Qatind, do you deliver to my area?')}
              target="_blank"
              rel="noopener noreferrer"
              className="cp-delivery-link"
            >
              <RiWhatsappLine aria-hidden="true" />
              Check my area on WhatsApp
              <RiArrowRightLine aria-hidden="true" />
            </a>
          </motion.div>
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
                Have a custom requirement or dietary need? Message our kitchen team directly.
              </p>
              <MagneticButton>
                <a
                  href={whatsappHref('Hi Qatind, I have a question about my order.')}
                  className="cp-faq-phone"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with us on WhatsApp"
                >
                  <FaWhatsapp aria-hidden="true" />
                  {WHATSAPP_DISPLAY}
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
              <a href={callHref} className="contact-btn contact-btn--cta-primary">
                Call Qatind Kitchen
                <RiArrowRightLine />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href={whatsappHref()}
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