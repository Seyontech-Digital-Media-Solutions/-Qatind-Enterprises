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
} from 'react-icons/ri'
import { FiBriefcase, FiUsers, FiClock, FiPhone } from 'react-icons/fi'
import { BsPatchCheck, BsShieldCheck } from 'react-icons/bs'
import { LuChefHat, LuUtensilsCrossed } from 'react-icons/lu'
import { MdDeliveryDining, MdOutlineRestaurantMenu } from 'react-icons/md'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { AiOutlineSafetyCertificate } from 'react-icons/ai'

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

const serviceMenu = [
  {
    id: 'corporate',
    label: 'Corporate Events',
    title: 'Office Food That Feels Like Lunch at Home',
    description: 'Fresh home-style meals for offices, meetings, team lunches and corporate gatherings — planned around your schedule and served with consistency.',
    highlights: ['Daily meal programs', 'Meeting lunches', 'Bulk orders', 'Veg & non-veg options'],
    icon: FiBriefcase,
    image: '/Services/CorporateEvents.jpg',
    accent: BRAND.red,
  },

  {
    id: 'hospitals',
    label: 'Hospital Catering',
    title: 'Thoughtful Meals for Care & Recovery',
    description: 'Freshly prepared food designed around the needs of hospitals, patients, attendants and staff.',
    highlights: ['Custom meal requirements', 'Fresh preparation', 'Scheduled delivery', 'Separate food handling'],
    icon: RiHospitalLine,
    image: '/Services/Hospitalcatering.png',
    accent: BRAND.green,
  },

  {
    id: 'schools',
    label: 'Schools & Colleges',
    title: 'Good Food for Busy Campuses',
    description: 'Reliable meal solutions for schools, colleges, students, staff and campus events.',
    highlights: ['Daily meal programs', 'Student-friendly menus', 'Bulk serving', 'Flexible schedules'],
    icon: RiSchoolLine,
    image: '/Services/Schools&Colleges.png',
    accent: BRAND.saffron,
  },

  {
    id: 'weddings',
    label: 'Weddings',
    title: 'Make the Feast Part of the Celebration',
    description: 'From traditional favourites to live counters, Qatind creates memorable wedding food experiences for every guest.',
    highlights: ['Wedding menus', 'Live counters', 'Buffet service', 'On-site catering'],
    icon: RiHeartsLine,
    image: '/Services/WeddingCatering.png',
    accent: BRAND.red,
  },

  {
    id: 'parties',
    label: 'Parties',
    title: 'Bring Everyone Together Around Good Food',
    description: 'Birthdays, family gatherings, housewarmings and celebrations deserve food people remember.',
    highlights: ['Custom menus', 'Small & large gatherings', 'Setup support', 'Veg & non-veg options'],
    icon: RiCake3Line,
    image: '/Services/Partycatering.jpg',
    accent: BRAND.saffron,
  },
  {
    id: 'hampers',
    label: 'Gift Hampers',
    title: 'Thoughtful Food Gifts for Every Occasion',
    description: 'Curated hampers with bakery favourites, sweets and savouries — perfect for gifting, festivals and corporate giving.',
    highlights: ['Custom curation', 'Festive hampers', 'Corporate gifting', 'Eggless & veg options'],
    icon: RiGiftLine,
    image: '/Services/GiftHampers.jpg',
    accent: BRAND.green,
  },
]

const plateSteps = [
  { num: '01', title: 'Order Home Food', copy: 'Headcount, occasion, dietary notes — a five-minute conversation to start.', icon: HiOutlineClipboardList, image: '/Services/foodorderonline.jpg' },
  { num: '02', title: 'Build Your Menu', copy: 'We shape a menu around your taste, your budget and your guests.', icon: LuUtensilsCrossed, image: '/Services/BuildMenu.jpg' },
  { num: '03', title: 'Prepare Fresh', copy: 'Cooked in small batches, close to serving time, the way home food should be.', icon: LuChefHat, image: '/Services/prepareFood.webp' },
  { num: '04', title: 'Deliver / Set Up', copy: 'Sealed, insulated delivery — or a full on-site setup for bigger events.', icon: MdDeliveryDining, image: '/Services/FoodDelivery.png' },
  { num: '05', title: 'Serve & Enjoy', copy: 'Hot food, well-timed service, and one less thing for you to manage.', icon: RiSparklingLine, image: '/Services/serve&enjoy.webp' },
]

const qualityPillars = [
  { num: '01', label: 'FRESH', title: 'Fresh Ingredients', desc: 'Sourced the same morning, never held over.', icon: RiLeafLine },
  { num: '02', label: 'CAREFUL', title: 'Home-Style Recipes', desc: 'Recipes from real home kitchens, not a factory line.', icon: BsPatchCheck },
  { num: '03', label: 'CONSISTENT', title: 'Hygiene & Care', desc: 'Audited kitchens, sealed packaging, every batch.', icon: BsShieldCheck },
  { num: '04', label: 'READY', title: 'Timely Delivery', desc: 'Slot-based dispatch, tracked door to door.', icon: FiClock },
  { num: '05', label: 'FLEXIBLE', title: 'Veg & Non-Veg', desc: 'Separate lines, prepared and served apart.', icon: MdOutlineRestaurantMenu },
  { num: '06', label: 'EVENT-READY', title: 'Event-Ready Service', desc: 'Staffed setup for anything bigger than a delivery.', icon: AiOutlineSafetyCertificate },
]

const showcasePlates = [
  { id: 'thali', name: 'Chicken Curry', tag: 'Everyday', image: '/Services/chickencurry.jpg' },
  { id: 'biryani', name: 'Kaarakulambhu', tag: 'Weekend Special', image: '/Services/Kaarakulambhu.jpg' },
  { id: 'chaat', name: 'RiceSambar', tag: 'Chaat & Drinks', image: '/Services/RiceSambar.jpg' },
  { id: 'wedding', name: 'ChickenBriyani', tag: 'Weddings', image: '/Services/chickenBriyani.jpg' },
  { id: 'bakery', name: 'Lemonrice', tag: 'Bakery', image: '/Services/Lemonrice.png' },
]

const faqs = [
  { question: 'How far ahead should I book?', answer: 'Office meals can be arranged with 24–48 hours notice. Weddings and large events are best booked 10–15 days ahead so we can plan the menu and staffing.' },
  { question: 'Can I get both veg and non-veg on one order?', answer: 'Yes. Most menus, including the bakery counter, run separate veg and non-veg lines, prepared and served separately.' },
  { question: 'Do you cater to dietary restrictions?', answer: 'We build Jain, low-oil and eggless menus on request, across corporate, hospital and event catering.' },
  { question: 'Is the bakery counter available on its own?', answer: 'Yes — cakes, pastries and snacks can be ordered separately from full catering, for offices, parties or gifting.' },
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

/* =====================================================================
   STEP UNIT — single row inside CurvedProcess
===================================================================== */
function StepUnit({ step, index, isLeft, accent, rowH, bubbleSize, svgW, leftBX, rightBX, prefersReducedMotion }) {
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
      style={{ top: index * rowH, height: rowH }}
    >
      {/* ── Bubble image ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.65, rotate: isLeft ? -12 : 12 }}
        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
        className="services-page__process-step-bubble"
        style={{
          width: bubbleSize,
          height: bubbleSize,
          left: `calc(${bubbleCentrePercX} - ${bubbleSize / 2}px)`,
          top: `calc(50% - ${bubbleSize / 2}px)`,
        }}
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
        initial={{ opacity: 0, x: isLeft ? 72 : -72 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
        className={`services-page__process-step-text ${isLeft ? 'services-page__process-step-text--left' : 'services-page__process-step-text--right'}`}
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
          className={`services-page__process-step-chip ${isLeft ? '' : 'services-page__process-step-chip--reverse'}`}
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
  /* Layout constants */
  const ROW_H = 290
  const BUBBLE = 210
  const SVG_W = 600
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
        <div className="services-page__process-canvas" style={{ height: svgH }}>

          {/* ── Winding SVG path ──────────────────────────────────────── */}
          <svg
            viewBox={`0 0 ${SVG_W} ${svgH}`}
            className="services-page__process-svg"
            preserveAspectRatio="xMidYMin meet"
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
          src="Services/ScaleQatind.jpg"
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
          const x = offset * 230
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

  const { scrollYProgress: pageProgress } = useScroll()
  const progressBar = useSpring(pageProgress, { stiffness: 120, damping: 24 })

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

      {/* Reading-progress bar */}
      <motion.div
        style={{ scaleX: progressBar }}
        className="services-page__progress"
      />

      {/* ================================================================
          1 — HERO
      ================================================================ */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        className="services-page__hero"
      >
        <div className="services-page__grain" />
        <div className="services-page__hero-bg" />
        <div className="services-page__hero-aura services-page__hero-aura--red" />
        <div className="services-page__hero-aura services-page__hero-aura--green" />

        <div className="services-page__hero-inner">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="services-page__hero-badge"
          >
            <RiSparklingLine />
            Home-Style • Fresh • Made With Care
          </motion.span>

          <div className="services-page__hero-grid">
            <motion.h1
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
              className="services-page__hero-title"
            >
              {['Home-style food.', 'Made for every occasion.'].map((line) => (
                <motion.span
                  key={line}
                  variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.span>
              ))}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="services-page__hero-copy-wrap"
            >
              <p className="services-page__hero-copy">
                From everyday office meals to weddings, celebrations and live food
                counters — Qatind brings the comfort of home cooking to every table.
              </p>
              <div className="services-page__hero-actions">
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
              </div>
            </motion.div>
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
          8 — QUALITY PILLARS
      ================================================================ */}
      <section className="services-page__quality">
        <div className="services-page__grain services-page__quality-grain" />
        <div className="services-page__quality-glow" />

        <div className="services-page__quality-inner">
          <p className="services-page__eyebrow services-page__eyebrow--saffron">Quality, promised</p>
          <h2 className="services-page__heading services-page__heading--lg services-page__heading--white services-page__quality-heading">
            Home-style at heart. Professional in every detail.
          </h2>

          <div className="services-page__quality-grid">
            {qualityPillars.map((pillar, i) => (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                className="services-page__tilt services-page__shine services-page__quality-pillar"
              >
                <div className="services-page__quality-pillar-top">
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.06 + 0.15 }}
                    className="services-page__quality-pillar-num"
                  >
                    {pillar.num}
                  </motion.span>
                  <motion.span whileHover={{ rotate: 12, scale: 1.15 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
                    <pillar.icon className="services-page__quality-pillar-icon" />
                  </motion.span>
                </div>
                <p className="services-page__quality-pillar-label">{pillar.label}</p>
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}