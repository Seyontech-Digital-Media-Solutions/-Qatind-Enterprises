import { useMemo, useRef, useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useInView,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiSparklingLine,
  RiBuildingLine,
  RiHospitalLine,
  RiSchoolLine,
  RiHeart2Line,
  RiHeartsLine,
  RiCake3Line,
  RiLeafLine,
  RiCupLine,
  RiGiftLine,
  RiStarFill,
} from 'react-icons/ri'
import { FiBriefcase, FiUsers, FiClock, FiPhone } from 'react-icons/fi'
import { BsPatchCheck, BsShieldCheck } from 'react-icons/bs'
import { LuChefHat, LuUtensilsCrossed } from 'react-icons/lu'
import { MdDeliveryDining } from 'react-icons/md'
import { HiOutlineClipboardList } from 'react-icons/hi'

import MouseGlowCursor from '../components/common/MouseGlowCursor'
import MagneticButton from '../components/animations/MagneticButton'


import '../styles/ServicesPage.scss'

/* =====================================================================
   QATIND ENTERPRISES — SERVICES PAGE
===================================================================== */

/* ─── Brand tokens ────────────────────────────────────────────────────────
   Mirrors src/styles/_variables.scss. Kept as raw hex (not CSS var()
   strings) ONLY because a few places below build translucent fills by
   string-concatenating an alpha suffix onto the hex (e.g. `${accent}20`),
   which only works with literal hex values, not var() references.
   Everywhere that trick isn't needed, the matching CSS custom property
   (--color-red / --color-saffron / --color-green / --color-espresso /
   --color-cocoa / --color-cream, declared in _variables.scss) is used
   directly in the SCSS classes instead.
===================================================================== */

const img = (path) => `${import.meta.env.BASE_URL}${path}`

const BRAND = {
  red: '#C0392B',
  saffron: '#F2921A',
  green: '#146C36',
  espresso: '#241608',
  cocoa: '#5B4636',
  cream: '#FBF2E3',
}

const journeyChapters = [
  { icon: LuUtensilsCrossed, label: 'EVERYDAY', title: 'Everyday Meals', copy: 'Office lunches, daily food delivery, home-style meals that show up on time, every time.' },
  { icon: RiBuildingLine, label: 'BUSINESS', title: 'Business & Institutions', copy: 'Corporate offices, hospitals, schools and colleges — fed on a schedule that never slips.' },
  { icon: RiHeartsLine, label: 'CELEBRATION', title: 'Celebrations', copy: 'Weddings, parties and functions, catered like the food is the main event — because it is.' },
  { icon: RiSparklingLine, label: 'EXPERIENCE', title: 'Food Experiences', copy: 'Live chaat, fresh drinks, bakery counters — the part of the event people talk about after.' },
]

const heroStats = [
  { icon: FiUsers, num: '500+', label: 'Events Catered' },
  { icon: RiStarFill, num: '4.9/5', label: 'Client Rating' },
  { icon: FiClock, num: '10+ yrs', label: 'Serving Trust' },
]

const serviceMenu = [
  {
    id: 'corporate',
    num: '01',
    label: 'Corporate Events',
    title: 'Office Food That Feels Like Lunch at Home',
    description: 'Fresh home-style meals for offices, meetings, team lunches and corporate gatherings — planned around your schedule and served with consistency.',
    highlights: ['Daily meal programs', 'Meeting lunches', 'Bulk orders', 'Veg & non-veg options'],
    icon: FiBriefcase,
    image: img('Services/CorporateEvents.jpg'),
    accent: BRAND.red,
  },

  {
    id: 'hospitals',
    num: '02',
    label: 'Hospital Catering',
    title: 'Thoughtful Meals for Care & Recovery',
    description: 'Freshly prepared food designed around the needs of hospitals, patients, attendants and staff.',
    highlights: ['Custom meal requirements', 'Fresh preparation', 'Scheduled delivery', 'Separate food handling'],
    icon: RiHospitalLine,
    image: img('Services/Hospitalcatering.png'),
    accent: BRAND.green,
  },

  {
    id: 'schools',
    num: '03',
    label: 'Schools & Colleges',
    title: 'Good Food for Busy Campuses',
    description: 'Reliable meal solutions for schools, colleges, students, staff and campus events.',
    highlights: ['Daily meal programs', 'Student-friendly menus', 'Bulk serving', 'Flexible schedules'],
    icon: RiSchoolLine,
    image: img('Services/Schools&Colleges.png'),
    accent: BRAND.saffron,
  },

  {
    id: 'weddings',
    num: '04',
    label: 'Weddings',
    title: 'Make the Feast Part of the Celebration',
    description: 'From traditional favourites to live counters, Qatind creates memorable wedding food experiences for every guest.',
    highlights: ['Wedding menus', 'Live counters', 'Buffet service', 'On-site catering'],
    icon: RiHeartsLine,
    image: img('Services/WeddingCatering.png'),
    accent: BRAND.red,
  },

  {
    id: 'parties',
    num: '05',
    label: 'Parties',
    title: 'Bring Everyone Together Around Good Food',
    description: 'Birthdays, family gatherings, housewarmings and celebrations deserve food people remember.',
    highlights: ['Custom menus', 'Small & large gatherings', 'Setup support', 'Veg & non-veg options'],
    icon: RiCake3Line,
    image: img('Services/Partycatering.jpg'),
    accent: BRAND.saffron,
  },

  {
    id: 'hampers',
    num: '06',
    label: 'Gift Hampers',
    title: 'Thoughtful Food Gifts for Every Occasion',
    description: 'Curated hampers with bakery favourites, sweets and savouries — perfect for gifting, festivals and corporate giving.',
    highlights: ['Custom curation', 'Festive hampers', 'Corporate gifting', 'Eggless & veg options'],
    icon: RiGiftLine,
    image: img('Services/GiftHampers.png'),
    accent: BRAND.green,
  },
]

const plateSteps = [
  { num: '01', title: 'Order Home Food', copy: 'Headcount, occasion, dietary notes — a five-minute conversation to start.', icon: HiOutlineClipboardList, image: img('Services/foodorderonline.jpg'), },
  { num: '02', title: 'Build Your Menu', copy: 'We shape a menu around your taste, your budget and your guests.', icon: LuUtensilsCrossed, image: img('Services/BuildMenu.jpg'), },
  { num: '03', title: 'Prepare Fresh', copy: 'Cooked in small batches, close to serving time, the way home food should be.', icon: LuChefHat, image: img('Services/prepareFood.webp') },
  { num: '04', title: 'Deliver / Set Up', copy: 'Sealed, insulated delivery — or a full on-site setup for bigger events.', icon: MdDeliveryDining, image: img('Services/FoodDelivery.png') },
  { num: '05', title: 'Serve & Enjoy', copy: 'Hot food, well-timed service, and one less thing for you to manage.', icon: RiSparklingLine, image: img('Services/serve&enjoy.webp') },
]

const ctaFeatures = [
  { icon: RiLeafLine, label: 'Fresh & Hygienic' },
  { icon: BsPatchCheck, label: 'Home-Style Taste' },
  { icon: BsShieldCheck, label: 'Hygiene & Care' },
  { icon: FiClock, label: 'Timely Delivery' },
]

const showcasePlates = [
  { id: 'thali', name: 'Chicken Curry', tag: 'Everyday', image: img('Services/chickencurry.jpg'), },
  { id: 'biryani', name: 'Kaarakulambhu', tag: 'Weekend Special', image: img('Services/Kaarakulambhu.jpg'), },
  { id: 'chaat', name: 'RiceSambar', tag: 'Chaat & Drinks', image: img('Services/RiceSambar.jpg'), },
  { id: 'wedding', name: 'ChickenBriyani', tag: 'Weddings', image: img('Services/chickenBriyani.jpg'), },
  { id: 'bakery', name: 'Lemonrice', tag: 'Bakery', image: img('Services/Lemonrice.png'), },
]

const tickerRows = [
  { items: ['Home-Style Food', 'Corporate Meals', 'Wedding Feasts', 'Live Chaat', 'Fresh Drinks', 'Bakery', 'Veg', 'Non-Veg'], cls: 'services-page__ticker-row--a' },
  { items: ['Hospital Meals', 'School Canteens', 'Party Catering', 'Mocktails', 'Eggless Bakes', 'On-Site Service', 'Buffet', 'Live Counters'], cls: 'services-page__ticker-row--b' },
]

/* ─── Step accent colours ────────────────────────────────────────────────── 
   Kept as BRAND hex (not var()) because StepUnit builds translucent fills
   with `${accent}20` / `${accent}55` string concatenation, which only
   works against literal hex strings.
*/
const STEP_ACCENTS = [BRAND.red, BRAND.saffron, BRAND.saffron, BRAND.green, BRAND.green]

/* Small hook: true once viewport width drops to/under a breakpoint.
   Used only to switch a few numeric layout constants (never colours or
   the leaf shape itself) so the curved-process section stays legible
   on phones instead of overflowing. */
function useIsBreakpoint(maxWidth) {
  const [isBelow, setIsBelow] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= maxWidth : false,
  )
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`)
    const onChange = () => setIsBelow(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [maxWidth])
  return isBelow
}

/* =====================================================================
   HERO VISUAL — organic morphing blob (replaces the old leaf clip-path
   photo frame). Uses an animated CSS border-radius instead of an SVG
   clip-path, so the shape never renders jagged or gets cut off at any
   screen size — it just gently morphs between rounded blob outlines.
===================================================================== */
function HeroVisual({ prefersReducedMotion }) {
  return (
    <motion.div
      className="services-page__hero-visual"
      initial={{ opacity: 0, scale: 0.9, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="services-page__hero-ring" />
      <div className="services-page__hero-glow services-page__hero-glow--a" />
      <div className="services-page__hero-glow services-page__hero-glow--b" />

      <div className="services-page__hero-blob">
        <img
          src={img('Services/ScaleQatind.jpg')}
          alt="Freshly prepared Qatind spread, served hot"
          loading="eager"
        />
        <div className="services-page__hero-blob-tint" />
      </div>

      <motion.div
        className="services-page__hero-float-card services-page__hero-float-card--rating"
        initial={{ opacity: 0, y: -12, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      >
        <span className="services-page__hero-float-card-icon"><RiStarFill /></span>
        <span>
          <span className="services-page__hero-float-card-title">4.9 / 5 Rating</span>
          <span className="services-page__hero-float-card-sub">200+ Reviews</span>
        </span>
      </motion.div>

      <motion.div
        className="services-page__hero-float-card services-page__hero-float-card--stat"
        initial={{ opacity: 0, y: 12, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
        whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      >
        <span className="services-page__hero-float-card-icon"><FiUsers /></span>
        <span>
          <span className="services-page__hero-float-card-title">500+ Events</span>
          <span className="services-page__hero-float-card-sub">Served with love</span>
        </span>
      </motion.div>
    </motion.div>
  )
}

/* =====================================================================
   STEP UNIT — single row inside CurvedProcess
===================================================================== */
/* Compact (below `lg`) layout is applied with INLINE styles so it never
   depends on CSS overrides winning against the desktop absolute layout. */
const COMPACT_ROW = {
  position: 'relative', display: 'flex', flexDirection: 'column',
  alignItems: 'center', textAlign: 'center', gap: '1.25rem',
  padding: '2rem 0', width: '100%',
}
const COMPACT_TEXT = {
  position: 'static', maxWidth: '22rem', width: '100%', textAlign: 'center',
}

function StepUnit({ step, index, isLeft, accent, rowH, bubbleSize, svgW, leftBX, rightBX, prefersReducedMotion, isCompact }) {
  const rowRef = useRef(null)
  const isInView = useInView(rowRef, { once: true, margin: '0px' })

  const { scrollYProgress } = useScroll({ target: rowRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', prefersReducedMotion ? '-8%' : '8%'])

  const bubbleCentrePercX = isLeft
    ? `${(leftBX / svgW) * 100}%`
    : `${(rightBX / svgW) * 100}%`

  return (
    <div
      ref={rowRef}
      className="services-page__process-step-row"
      style={isCompact ? { ...COMPACT_ROW, borderTop: index ? '1px dashed rgba(36,22,8,.12)' : 'none' } : { top: index * rowH, height: rowH }}
    >
      {/* ── Bubble image ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.65, rotate: isCompact ? 0 : isLeft ? -12 : 12 }}
        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
        className="services-page__process-step-bubble"
        style={
          isCompact
            ? { position: 'relative', width: bubbleSize, height: bubbleSize, flexShrink: 0 }
            : {
                width: bubbleSize,
                height: bubbleSize,
                left: `calc(${bubbleCentrePercX} - ${bubbleSize / 2}px)`,
                top: `calc(50% - ${bubbleSize / 2}px)`,
              }
        }
      >
        {/* Pulse rings */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="services-page__process-step-ring"
              style={{ border: `3px solid ${accent}` }}
              animate={{ scale: [1, 1.22, 1], opacity: [0.65, 0, 0.65] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.28 }}
            />
            <motion.div
              className="services-page__process-step-ring"
              style={{ border: `2px solid ${accent}` }}
              animate={{ scale: [1, 1.42, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.28 + 0.6 }}
            />
          </>
        )}

        {/* Solid border ring */}
        <div
          className="services-page__process-step-border"
          style={{
            border: `4px solid ${accent}`,
            boxShadow: `0 0 0 8px ${accent}20, 0 28px 56px -14px ${accent}55`,
          }}
        />

        {/* Image with inner parallax */}
        <div className="services-page__process-step-image-wrap">
          <motion.img
            src={step.image}
            alt={step.title}
            style={{ y: prefersReducedMotion ? 0 : imgY }}
            className="services-page__process-step-image"
            loading="lazy"
          />
          {/* Inner vignette */}
          <div className="services-page__process-step-vignette" />
        </div>
      </motion.div>

      {/* ── Text block ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: isCompact ? 0 : isLeft ? 72 : -72 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
        className={`services-page__process-step-text ${isLeft ? 'services-page__process-step-text--left' : 'services-page__process-step-text--right'}`}
        style={isCompact ? COMPACT_TEXT : undefined}
      >
        {/* Big step number */}
        <motion.p
          className="services-page__process-step-num"
          style={{ color: accent }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.22 }}
        >
          {step.num}
        </motion.p>

        {/* Title */}
        <motion.h3
          className="services-page__process-step-title"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.3 }}
        >
          {step.title}
        </motion.h3>

        {/* Body copy */}
        <motion.p
          className="services-page__process-step-copy"
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.36 }}
        >
          {step.copy}
        </motion.p>

        {/* Icon chip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.46 }}
          className={`services-page__process-step-chip ${isLeft || isCompact ? '' : 'services-page__process-step-chip--reverse'}`}
          style={{
            background: `${accent}18`,
            color: accent,
            border: `1.5px solid ${accent}30`,
          }}
        >
          <step.icon />
          <span>{step.title.split(' ').slice(0, 3).join(' ')}</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

/* =====================================================================
   CURVED PROCESS — full section with winding path + step units
===================================================================== */
function CurvedProcess({ steps, prefersReducedMotion }) {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  // Real rendered width of the canvas, so the SVG viewBox is 1:1 with CSS
  // pixels. A hard-coded viewBox width (was 600) never matched the real
  // container, so with `preserveAspectRatio="meet"` the path was letterboxed
  // and drifted away from the percentage-positioned bubbles.
  const [canvasW, setCanvasW] = useState(896)
  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const update = () => setCanvasW(Math.round(el.getBoundingClientRect().width) || 896)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  // 991px matches $breakpoint-lg - 1 in _variables.scss — the same cutoff
  // the SCSS media query now uses to switch to the simple stacked layout,
  // so phones and tablets are treated identically here.
  const isCompact = useIsBreakpoint(991)

  /* Layout constants — scaled down below `lg` so the bubbles, the
     winding path and the text columns never overflow. Below `lg` the
     SCSS switches the rows to a stacked flex layout (and forces the
     bubble to a fixed 150px), so these numbers only really matter at
     `lg` and above. */
  const ROW_H = isCompact ? 210 : 290
  const BUBBLE = isCompact ? 150 : 210
  const SVG_W = canvasW
  const LEFT_BX = SVG_W * 0.27
  const RIGHT_BX = SVG_W * 0.73

  const accent = (i) => STEP_ACCENTS[i] ?? BRAND.red

  /* Anchor centres */
  const points = steps.map((_, i) => ({
    x: i % 2 === 0 ? LEFT_BX : RIGHT_BX,
    y: ROW_H * i + ROW_H / 2,
  }))

  /* Smooth cubic bezier winding path */
  const pathD = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`
    const prev = points[i - 1]
    const midY = (prev.y + pt.y) / 2
    return `${acc} C ${prev.x} ${midY}, ${pt.x} ${midY}, ${pt.x} ${pt.y}`
  }, '')

  /* Scroll-driven path draw */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.78', 'end 0.35'],
  })
  const pathLength = useSpring(scrollYProgress, { stiffness: 80, damping: 24 })

  const svgH = ROW_H * steps.length

  return (
    <section ref={sectionRef} className="services-page__process">
      {/* Ambient glows */}
      <div className="services-page__process-glow services-page__process-glow--saffron" />
      <div className="services-page__process-glow services-page__process-glow--green" />

      <div className="services-page__process-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="services-page__eyebrow">How it works</p>
          <h2 className="services-page__heading">
            From your idea to the last plate.
          </h2>
        </motion.div>

        {/* Steps canvas */}
        <div ref={canvasRef} className="services-page__process-canvas" style={isCompact ? undefined : { height: svgH }}>

          {/* ── Winding SVG path ──────────────────────────────────────── */}
          {!isCompact && (
          <svg
            viewBox={`0 0 ${SVG_W} ${svgH}`}
            className="services-page__process-svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="qatind-cpath-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-red)" />
                <stop offset="45%" stopColor="var(--color-saffron)" />
                <stop offset="100%" stopColor="var(--color-green)" />
              </linearGradient>
            </defs>

            {/* Ghost dashed track */}
            <path
              d={pathD}
              fill="none"
              stroke="var(--color-espresso)"
              strokeOpacity="0.07"
              strokeWidth="2.5"
              strokeDasharray="6 14"
              strokeLinecap="round"
            />

            {/* Animated coloured path */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#qatind-cpath-grad)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: prefersReducedMotion ? 1 : pathLength }}
            />

            {/* Node dots */}
            {points.map((pt, i) => {
              const ac = accent(i)
              return (
                <g key={i}>
                  <circle
                    cx={pt.x} cy={pt.y} r={14}
                    fill="white"
                    stroke={ac}
                    strokeWidth="3"
                    style={{ filter: `drop-shadow(0 2px 10px ${ac}55)` }}
                  />
                  <circle cx={pt.x} cy={pt.y} r={6} fill={ac} />
                </g>
              )
            })}
          </svg>
          )}

          {/* ── Step rows ─────────────────────────────────────────────── */}
          {steps.map((step, i) => (
            <StepUnit
              key={step.num}
              step={step}
              index={i}
              isLeft={i % 2 === 0}
              accent={accent(i)}
              rowH={ROW_H}
              bubbleSize={BUBBLE}
              svgW={SVG_W}
              leftBX={LEFT_BX}
              rightBX={RIGHT_BX}
              prefersReducedMotion={prefersReducedMotion}
              isCompact={isCompact}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* =====================================================================
   IMMERSIVE STORY
===================================================================== */
function ImmersiveStory({ prefersReducedMotion }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', prefersReducedMotion ? '-8%' : '8%'])

  const labels = ['Freshly Prepared', 'Home-Style Recipes', 'Veg & Non-Veg', 'Made For Your Occasion']

  return (
    <section ref={ref} className="services-page__story">
      <motion.div style={{ y }} className="services-page__story-media">
        <img
          src={img('Services/ScaleQatind.jpg')}
          alt="Qatind spread of home-style and celebration food"
          loading="lazy"
        />
      </motion.div>
      <div className="services-page__story-overlay" />

      <div className="services-page__story-inner">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="services-page__story-title">
          The taste of home.{' '}
          <span className="services-page__story-title-highlight">
            The scale of Qatind.
          </span>
        </motion.h2>

        <div className="services-page__story-labels">
          {labels.map((label, i) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="services-page__story-label"
            >
              {label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =====================================================================
   FOOD SHOWCASE — tilted overlapping slider
===================================================================== */
function FoodShowcase({ plates, prefersReducedMotion }) {
  const [index, setIndex] = useState(0)
  const count = plates.length
  const AUTOPLAY_MS = 4500
  // 575px matches $breakpoint-sm (576px) in _variables.scss / the
  // `@include sm` mixin, so this switches at the same point the SCSS
  // plate sizing does (services-page__showcase-plate).
  const isMobile = useIsBreakpoint(575)

  useEffect(() => {
    if (prefersReducedMotion) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [count, prefersReducedMotion])

  const go = (dir) => setIndex((i) => (i + dir + count) % count)

  const getOffset = (i) => {
    let diff = i - index
    if (diff > count / 2) diff -= count
    if (diff < -count / 2) diff += count
    return diff
  }

  /* Smaller horizontal spread on phones so side cards don't get clipped
     out of view entirely. */
  const STEP_X = isMobile ? 130 : 230

  return (
    <section className="services-page__showcase">
      <div className="services-page__showcase-header">
        <p className="services-page__eyebrow">On the menu</p>
        <h2 className="services-page__heading">
          A taste of what leaves our kitchen.
        </h2>
      </div>

      <div className="services-page__showcase-slider">
        {plates.map((plate, i) => {
          const offset = getOffset(i)
          if (Math.abs(offset) > 2) return null
          const isActive = offset === 0
          const x = offset * STEP_X
          const rotate = offset * 10
          const scale = isActive ? 1 : 0.78
          const zIndex = 10 - Math.abs(offset)
          const opacity = Math.abs(offset) > 1 ? 0.35 : 1

          return (
            <motion.div
              key={plate.id}
              drag={isActive ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1)
                else if (info.offset.x > 60) go(-1)
              }}
              animate={{ x, rotate: prefersReducedMotion ? 0 : rotate, scale, zIndex, opacity }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              className="services-page__showcase-plate"
              onClick={() => !isActive && setIndex(i)}
            >
              <img src={plate.image} alt={plate.name} loading="lazy" />
              {!isActive && <div className="services-page__showcase-plate-overlay" />}
            </motion.div>
          )
        })}
      </div>

      <div className="services-page__showcase-controls">
        <button
          type="button"
          onClick={() => go(-1)}
          className="services-page__showcase-nav-btn"
          aria-label="Previous dish"
        >
          <RiArrowLeftSLine />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={plates[index].id}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="services-page__showcase-label"
          >
            <span className="services-page__showcase-dot-wrap">
              {!prefersReducedMotion && (
                <motion.span
                  key={`ring-${plates[index].id}`}
                  className="services-page__showcase-dot-ring"
                  initial={{ scale: 1, opacity: 0.7 }}
                  animate={{ scale: 2.4, opacity: 0 }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                />
              )}
              <span className="services-page__showcase-dot" />
            </span>
            <span className="services-page__showcase-name">{plates[index].name}</span>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => go(1)}
          className="services-page__showcase-nav-btn"
          aria-label="Next dish"
        >
          <RiArrowRightSLine />
        </button>
      </div>

      <div className="services-page__showcase-pagination">
        {plates.map((plate, i) => (
          <button
            key={plate.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show ${plate.name}`}
            className="services-page__showcase-pagination-dot"
            style={{
              width: i === index ? '1.75rem' : '0.4rem',
              background: i === index ? BRAND.red : 'rgba(36,22,8,0.15)',
            }}
          />
        ))}
      </div>
    </section>
  )
}

/* =====================================================================
   MAIN PAGE
===================================================================== */
export default function ServicesPage() {
  const prefersReducedMotion = useReducedMotion()
  const [activeService, setActiveService] = useState(serviceMenu[0].id)
  const [openFaq, setOpenFaq] = useState(0)

  useEffect(() => {
    const previousBg = document.body.style.backgroundColor
    const previousColor = document.body.style.color
    document.body.style.backgroundColor = BRAND.cream
    document.body.style.color = BRAND.espresso
    return () => {
      document.body.style.backgroundColor = previousBg
      document.body.style.color = previousColor
    }
  }, [])

  const heroRef = useRef(null)
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroImgY = useTransform(heroProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '22%'])
  const heroFloatY = useTransform(heroProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '38%'])

  const activeItem = useMemo(
    () => serviceMenu.find((s) => s.id === activeService) ?? serviceMenu[0],
    [activeService],
  )

  const handleHeroMouseMove = (e) => {
    if (prefersReducedMotion) return
    const { currentTarget, clientX, clientY } = e
    const rect = currentTarget.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((clientY - rect.top) / rect.height - 0.5) * 2
    currentTarget.style.setProperty('--px', x.toFixed(3))
    currentTarget.style.setProperty('--py', y.toFixed(3))
  }

  const handleTilt = (e) => {
    if (prefersReducedMotion) return
    const { currentTarget, clientX, clientY } = e
    const rect = currentTarget.getBoundingClientRect()
    currentTarget.style.setProperty('--tx', (((clientX - rect.left) / rect.width - 0.5) * 2).toFixed(3))
    currentTarget.style.setProperty('--ty', (((clientY - rect.top) / rect.height - 0.5) * 2).toFixed(3))
  }
  const resetTilt = (e) => {
    e.currentTarget.style.setProperty('--tx', 0)
    e.currentTarget.style.setProperty('--ty', 0)
  }

  return (
    <div className="services-page">
      <MouseGlowCursor />

      {/* ================================================================
          1 — HERO
      ================================================================ */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        className="services-page__hero"
      >
        <div className="services-page__hero-bg" />
        <div className="services-page__hero-dots" />
        <div className="services-page__hero-aura services-page__hero-aura--red" />
        <div className="services-page__hero-aura services-page__hero-aura--green" />

        <div className="services-page__hero-inner">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="services-page__hero-badge"
          >
            <span className="services-page__hero-badge-dot" />
            Home-Style • Fresh • Made With Care
          </motion.span>

          <div className="services-page__hero-grid">
            <div className="services-page__hero-content">
              <motion.h1
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
                className="services-page__hero-title"
              >
                <motion.span
                  variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  Home-style food.
                </motion.span>
                <motion.span
                  variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  Made for every{' '}
                  <span className="services-page__hero-title-highlight">occasion.</span>
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="services-page__hero-copy"
              >
                From everyday office meals to weddings, celebrations and live food
                counters — Qatind brings the comfort of home cooking to every table.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="services-page__hero-stats"
              >
                {heroStats.map((stat, i) => (
                  <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    {i > 0 && <span className="services-page__hero-stat-divider" />}
                    <div className="services-page__hero-stat">
                      <span className="services-page__hero-stat-icon"><stat.icon /></span>
                      <span>
                        <span className="services-page__hero-stat-num">{stat.num}</span>
                        <span className="services-page__hero-stat-label">{stat.label}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.62 }}
                className="services-page__hero-actions"
              >
                <MagneticButton>
                  <motion.a
                    whileTap={{ scale: 0.96 }}
                    href="tel:+917305461104"
                    className="services-page__btn services-page__btn--primary"
                  >
                    Plan Your Menu
                    <RiArrowRightLine />
                  </motion.a>
                </MagneticButton>
                <MagneticButton>
                  <motion.a
                    whileTap={{ scale: 0.96 }}
                    href="#menu"
                    className="services-page__btn services-page__btn--ghost"
                  >
                    Explore Our Services
                    <RiArrowRightLine />
                  </motion.a>
                </MagneticButton>
              </motion.div>
            </div>

            {/* Right-side visual — morphing blob with floating stat cards */}
            <HeroVisual prefersReducedMotion={prefersReducedMotion} />
          </div>
        </div>

        <div className="services-page__scroll-cue">
          <span>Scroll</span>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
            <rect x="1" y="1" width="12" height="18" rx="6" stroke="var(--color-cocoa)" strokeWidth="1.2" />
            <circle cx="7" cy="6" r="1.6" fill="var(--color-red)" />
          </svg>
        </div>
      </section>

      {/* ================================================================
          2 — MARQUEE (dual direction)
      ================================================================ */}
      <div className="services-page__ticker">
        {tickerRows.map((row, i) => (
          <div key={i} className={`services-page__ticker-row ${row.cls}`}>
            {[...row.items, ...row.items].map((item, idx) => (
              <span key={idx} className="services-page__ticker-item">
                {item}
                <span className="services-page__ticker-item-dot" />
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* ================================================================
          3 — FOOD JOURNEY
      ================================================================ */}
      <section className="services-page__journey">
        <div className="services-page__container">
          <p className="services-page__eyebrow">One kitchen. Many occasions.</p>
          <h2 className="services-page__heading services-page__heading--lg services-page__journey-heading">
            Everyday. Business. Celebration.
          </h2>
          <div className="services-page__journey-grid">
            {journeyChapters.map((chapter, i) => {
              const Icon = chapter.icon
              return (
                <motion.div
                  key={chapter.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  onMouseMove={handleTilt}
                  onMouseLeave={resetTilt}
                  className="services-page__tilt services-page__shine services-page__journey-card"
                >
                  <div>
                    <motion.div
                      className="services-page__journey-card-icon"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    >
                      <Icon />
                    </motion.div>
                    <p className="services-page__journey-card-label">{chapter.label}</p>
                  </div>
                  <div>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.copy}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          4 — INTERACTIVE SERVICE EXPERIENCE
      ================================================================ */}
      <section id="menu" className="services-page__menu">
        <div className="services-page__container">
          <p className="services-page__eyebrow">Industries We Serve</p>
          <h2 className="services-page__heading services-page__menu-heading">
            Pick an occasion. See how we'd feed it.
          </h2>

          <div className="services-page__menu-layout">
            {/* Service list */}
            <div className="services-page__menu-nav">
              {serviceMenu.map((service) => {
                const active = service.id === activeService
                return (
                  <motion.button
                    key={service.id}
                    type="button"
                    onClick={() => setActiveService(service.id)}
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                    className={`services-page__menu-nav-item ${active ? 'is-active' : ''}`}
                  >
                    <span className="services-page__menu-nav-item-left">
                      <span className="services-page__menu-nav-item-num" style={{ color: active ? service.accent : BRAND.cocoa }}>
                        {service.num}
                      </span>
                      <span className="services-page__menu-nav-item-label">
                        {service.label}
                      </span>
                    </span>
                    <RiArrowRightUpLine
                      className="services-page__menu-nav-item-arrow"
                      style={{ color: service.accent }}
                    />
                    {active && (
                      <motion.span
                        layoutId="menu-active-line"
                        className="services-page__menu-nav-item-indicator"
                        style={{ background: service.accent }}
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Service panel */}
            <div className="services-page__menu-panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="services-page__menu-panel-media"
                >
                  <motion.img
                    initial={{ scale: 1.12 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    src={activeItem.image}
                    alt={activeItem.title}
                    loading="lazy"
                  />
                  <div className="services-page__menu-panel-overlay" />
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id + '-copy'}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="services-page__menu-panel-content"
                >
                  <span
                    className="services-page__menu-panel-tag"
                    style={{ background: activeItem.accent }}
                  >
                    <activeItem.icon />
                    {activeItem.label}
                  </span>
                  <h3>{activeItem.title}</h3>
                  <p>{activeItem.description}</p>
                  <div className="services-page__menu-panel-tags">
                    {activeItem.highlights.map((h) => (
                      <span key={h}>
                        {h}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          5 — IMMERSIVE IMAGE STORY
      ================================================================ */}
      <ImmersiveStory prefersReducedMotion={prefersReducedMotion} />

      {/* ================================================================
          6 — HOW IT WORKS (CurvedProcess with circular bubbles)
      ================================================================ */}
      <CurvedProcess steps={plateSteps} prefersReducedMotion={prefersReducedMotion} />

      {/* ================================================================
          7 — FOOD SHOWCASE slider
      ================================================================ */}
      <FoodShowcase plates={showcasePlates} prefersReducedMotion={prefersReducedMotion} />

      {/* ================================================================
          8 — CTA (replaces the old Quality Pillars grid)
      ================================================================ */}
      <section className="services-page__cta">
        <div className="services-page__cta-blob services-page__cta-blob--a" />
        <motion.div
          className="services-page__cta-blob services-page__cta-blob--b"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            prefersReducedMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: [0, 0.85, 0.6, 0.85], scale: [0.8, 1.08, 1, 1.08], rotate: [0, 6, 0, 6] }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0.6 }
              : { duration: 7, repeat: Infinity, ease: 'easeInOut' }
          }
        />
        <span className="services-page__cta-sparkle services-page__cta-sparkle--left"><RiSparklingLine /></span>
        <span className="services-page__cta-sparkle services-page__cta-sparkle--right"><RiSparklingLine /></span>

        <div className="services-page__container services-page__cta-grid">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="services-page__cta-content"
          >
            <h2 className="services-page__cta-heading">
              <span>Let's Feed</span>
              <span>
                Your Next{' '}
                <span className="services-page__cta-heading-highlight">Occasion</span>
              </span>
            </h2>

            <p className="services-page__cta-copy">
              From daily meals to milestone celebrations — tell us the occasion,
              and we'll handle the menu, the kitchen and the delivery.
            </p>

            <div className="services-page__cta-features">
              {ctaFeatures.map((feature, i) => (
                <div key={feature.label} style={{ display: 'flex', alignItems: 'stretch', gap: '1.5rem' }}>
                  {i > 0 && <span className="services-page__cta-feature-divider" />}
                  <div className="services-page__cta-feature">
                    <span className="services-page__cta-feature-icon"><feature.icon /></span>
                    <span className="services-page__cta-feature-label">{feature.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <MagneticButton>
              <motion.a
                whileTap={{ scale: 0.96 }}
                href="tel:+917305461104"
                className="services-page__btn services-page__btn--primary services-page__cta-btn"
              >
                Order Now
                <RiArrowRightLine />
              </motion.a>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="services-page__cta-visual"
          >
            <div className="services-page__cta-blob-shape">
              <img
                src={img('Services/WeddingCatering.png')}
                alt="Guests enjoying a Qatind-catered spread"
                loading="lazy"
              />
            </div>
            <RiLeafLine className="services-page__cta-leaf-deco" />
          </motion.div>
        </div>
      </section>

    </div>
  )
}