// import { useMemo, useRef, useState, useEffect } from 'react'
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useTransform,
//   useSpring,
//   useReducedMotion,
//   useInView,
// } from 'framer-motion'
// import { Link } from 'react-router-dom'
// import {
//   RiArrowRightLine,
//   RiArrowRightUpLine,
//   RiArrowLeftSLine,
//   RiArrowRightSLine,
//   RiSparklingLine,
//   RiBuildingLine,
//   RiHospitalLine,
//   RiSchoolLine,
//   RiHeart2Line,
//   RiHeartsLine,
//   RiCake3Line,
//   RiLeafLine,
//   RiCupLine,
//   RiGiftLine,
// } from 'react-icons/ri'
// import { FiBriefcase, FiUsers, FiClock, FiPhone } from 'react-icons/fi'
// import { BsPatchCheck, BsShieldCheck } from 'react-icons/bs'
// import { LuChefHat, LuUtensilsCrossed } from 'react-icons/lu'
// import { MdDeliveryDining, MdOutlineRestaurantMenu } from 'react-icons/md'
// import { HiOutlineClipboardList } from 'react-icons/hi'
// import { AiOutlineSafetyCertificate } from 'react-icons/ai'

// import MouseGlowCursor from '../components/common/MouseGlowCursor'
// import MagneticButton from '../components/animations/MagneticButton'

// /* =====================================================================
//    QATIND ENTERPRISES — SERVICES PAGE
// ===================================================================== */

// const journeyChapters = [
//   { icon: LuUtensilsCrossed, label: 'EVERYDAY', title: 'Everyday Meals', copy: 'Office lunches, daily food delivery, home-style meals that show up on time, every time.' },
//   { icon: RiBuildingLine, label: 'BUSINESS', title: 'Business & Institutions', copy: 'Corporate offices, hospitals, schools and colleges — fed on a schedule that never slips.' },
//   { icon: RiHeartsLine, label: 'CELEBRATION', title: 'Celebrations', copy: 'Weddings, parties and functions, catered like the food is the main event — because it is.' },
//   { icon: RiSparklingLine, label: 'EXPERIENCE', title: 'Food Experiences', copy: 'Live chaat, fresh drinks, bakery counters — the part of the event people talk about after.' },
// ]

// const serviceMenu = [
//   {
//     id: 'corporate',
//     label: 'Corporate Events',
//     title: 'Office Food That Feels Like Lunch at Home',
//     description: 'Fresh home-style meals for offices, meetings, team lunches and corporate gatherings — planned around your schedule and served with consistency.',
//     highlights: ['Daily meal programs', 'Meeting lunches', 'Bulk orders', 'Veg & non-veg options'],
//     icon: FiBriefcase,
//     image: '/Services/CorporateEvents.jpg',
//     accent: '#C0392B',
//   },
//   {
//     id: 'hospitals',
//     label: 'Hospital Catering',
//     title: 'Thoughtful Meals for Care & Recovery',
//     description: 'Freshly prepared food designed around the needs of hospitals, patients, attendants and staff.',
//     highlights: ['Custom meal requirements', 'Fresh preparation', 'Scheduled delivery', 'Separate food handling'],
//     icon: RiHospitalLine,
//     image: '/Services/Hospitalcatering.png',
//     accent: '#146C36',
//   },
//   {
//     id: 'schools',
//     label: 'Schools & Colleges',
//     title: 'Good Food for Busy Campuses',
//     description: 'Reliable meal solutions for schools, colleges, students, staff and campus events.',
//     highlights: ['Daily meal programs', 'Student-friendly menus', 'Bulk serving', 'Flexible schedules'],
//     icon: RiSchoolLine,
//     image: '/Services/Schools&Colleges.png',
//     accent: '#F2921A',
//   },
//   {
//     id: 'weddings',
//     label: 'Weddings',
//     title: 'Make the Feast Part of the Celebration',
//     description: 'From traditional favourites to live counters, Qatind creates memorable wedding food experiences for every guest.',
//     highlights: ['Wedding menus', 'Live counters', 'Buffet service', 'On-site catering'],
//     icon: RiHeartsLine,
//     image: '/Services/WeddingCatering.png',
//     accent: '#C0392B',
//   },
//   {
//     id: 'parties',
//     label: 'Parties',
//     title: 'Bring Everyone Together Around Good Food',
//     description: 'Birthdays, family gatherings, housewarmings and celebrations deserve food people remember.',
//     highlights: ['Custom menus', 'Small & large gatherings', 'Setup support', 'Veg & non-veg options'],
//     icon: RiCake3Line,
//     image: '/Services/Partycatering.jpg',
//     accent: '#F2921A',
//   },
//   {
//     id: 'hampers',
//     label: 'Gift Hampers',
//     title: 'Thoughtful Food Gifts for Every Occasion',
//     description: 'Curated hampers with bakery favourites, sweets and savouries — perfect for gifting, festivals and corporate giving.',
//     highlights: ['Custom curation', 'Festive hampers', 'Corporate gifting', 'Eggless & veg options'],
//     icon: RiGiftLine,
//     image: '/Services/GiftHampers.jpg',
//     accent: '#146C36',
//   },
// ]

// const plateSteps = [
//   { num: '01', title: 'Order Home Food', copy: 'Headcount, occasion, dietary notes — a five-minute conversation to start.', icon: HiOutlineClipboardList, image: '/Services/foodorderonline.jpg' },
//   { num: '02', title: 'Build Your Menu', copy: 'We shape a menu around your taste, your budget and your guests.', icon: LuUtensilsCrossed, image: '/Services/BuildMenu.jpg' },
//   { num: '03', title: 'Prepare Fresh', copy: 'Cooked in small batches, close to serving time, the way home food should be.', icon: LuChefHat, image: '/Services/prepareFood.webp' },
//   { num: '04', title: 'Deliver / Set Up', copy: 'Sealed, insulated delivery — or a full on-site setup for bigger events.', icon: MdDeliveryDining, image: '/Services/FoodDelivery.png' },
//   { num: '05', title: 'Serve & Enjoy', copy: 'Hot food, well-timed service, and one less thing for you to manage.', icon: RiSparklingLine, image: '/Services/serve&enjoy.webp' },
// ]

// const qualityPillars = [
//   { num: '01', label: 'FRESH', title: 'Fresh Ingredients', desc: 'Sourced the same morning, never held over.', icon: RiLeafLine },
//   { num: '02', label: 'CAREFUL', title: 'Home-Style Recipes', desc: 'Recipes from real home kitchens, not a factory line.', icon: BsPatchCheck },
//   { num: '03', label: 'CONSISTENT', title: 'Hygiene & Care', desc: 'Audited kitchens, sealed packaging, every batch.', icon: BsShieldCheck },
//   { num: '04', label: 'READY', title: 'Timely Delivery', desc: 'Slot-based dispatch, tracked door to door.', icon: FiClock },
//   { num: '05', label: 'FLEXIBLE', title: 'Veg & Non-Veg', desc: 'Separate lines, prepared and served apart.', icon: MdOutlineRestaurantMenu },
//   { num: '06', label: 'EVENT-READY', title: 'Event-Ready Service', desc: 'Staffed setup for anything bigger than a delivery.', icon: AiOutlineSafetyCertificate },
// ]

// const showcasePlates = [
//   { id: 'thali', name: 'Chicken Curry', tag: 'Everyday', image: '/Services/chickencurry.jpg' },
//   { id: 'biryani', name: 'Kaarakulambhu', tag: 'Weekend Special', image: '/Services/Kaarakulambhu.jpg' },
//   { id: 'chaat', name: 'RiceSambar', tag: 'Chaat & Drinks', image: '/Services/RiceSambar.jpg' },
//   { id: 'wedding', name: 'ChickenBriyani', tag: 'Weddings', image: '/Services/chickenBriyani.jpg' },
//   { id: 'bakery', name: 'Lemonrice', tag: 'Bakery', image: '/Services/Lemonrice.png' },
// ]

// const faqs = [
//   { question: 'How far ahead should I book?', answer: 'Office meals can be arranged with 24–48 hours notice. Weddings and large events are best booked 10–15 days ahead so we can plan the menu and staffing.' },
//   { question: 'Can I get both veg and non-veg on one order?', answer: 'Yes. Most menus, including the bakery counter, run separate veg and non-veg lines, prepared and served separately.' },
//   { question: 'Do you cater to dietary restrictions?', answer: 'We build Jain, low-oil and eggless menus on request, across corporate, hospital and event catering.' },
//   { question: 'Is the bakery counter available on its own?', answer: 'Yes — cakes, pastries and snacks can be ordered separately from full catering, for offices, parties or gifting.' },
// ]

// const tickerA = ['Home-Style Food', 'Corporate Meals', 'Wedding Feasts', 'Live Chaat', 'Fresh Drinks', 'Bakery', 'Veg', 'Non-Veg']
// const tickerB = ['Hospital Meals', 'School Canteens', 'Party Catering', 'Mocktails', 'Eggless Bakes', 'On-Site Service', 'Buffet', 'Live Counters']

// /* ─── Step accent colours ────────────────────────────────────────────────── */
// const STEP_ACCENTS = ['#C0392B', '#F2921A', '#F2921A', '#146C36', '#146C36']

// /* =====================================================================
//    STEP UNIT — single row inside CurvedProcess
// ===================================================================== */
// function StepUnit({ step, index, isLeft, accent, rowH, bubbleSize, svgW, leftBX, rightBX, prefersReducedMotion }) {
//   const rowRef = useRef(null)
//   const isInView = useInView(rowRef, { once: true, margin: '-80px' })

//   const { scrollYProgress } = useScroll({ target: rowRef, offset: ['start end', 'end start'] })
//   const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', prefersReducedMotion ? '-8%' : '8%'])

//   const bubbleCentrePercX = isLeft
//     ? `${(leftBX / svgW) * 100}%`
//     : `${(rightBX / svgW) * 100}%`

//   return (
//     <div
//       ref={rowRef}
//       className="absolute left-0 right-0 flex items-center"
//       style={{ top: index * rowH, height: rowH }}
//     >
//       {/* ── Bubble image ──────────────────────────────────────────────── */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.65, rotate: isLeft ? -12 : 12 }}
//         animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
//         transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
//         className="absolute"
//         style={{
//           width: bubbleSize,
//           height: bubbleSize,
//           left: `calc(${bubbleCentrePercX} - ${bubbleSize / 2}px)`,
//           top: `calc(50% - ${bubbleSize / 2}px)`,
//           zIndex: 10,
//         }}
//       >
//         {/* Pulse rings */}
//         {!prefersReducedMotion && (
//           <>
//             <motion.div
//               className="absolute inset-0 rounded-full"
//               style={{ border: `3px solid ${accent}` }}
//               animate={{ scale: [1, 1.22, 1], opacity: [0.65, 0, 0.65] }}
//               transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.28 }}
//             />
//             <motion.div
//               className="absolute inset-0 rounded-full"
//               style={{ border: `2px solid ${accent}` }}
//               animate={{ scale: [1, 1.42, 1], opacity: [0.3, 0, 0.3] }}
//               transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.28 + 0.6 }}
//             />
//           </>
//         )}

//         {/* Solid border ring */}
//         <div
//           className="absolute inset-0 rounded-full"
//           style={{
//             border: `4px solid ${accent}`,
//             boxShadow: `0 0 0 8px ${accent}20, 0 28px 56px -14px ${accent}55`,
//           }}
//         />

//         {/* Image with inner parallax */}
//         <div className="absolute inset-[4px] overflow-hidden rounded-full">
//           <motion.img
//             src={step.image}
//             alt={step.title}
//             style={{ y: prefersReducedMotion ? 0 : imgY }}
//             className="h-[118%] w-full -translate-y-[9%] object-cover"
//             loading="lazy"
//           />
//           {/* Inner vignette */}
//           <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_36px_rgba(36,22,8,0.30)]" />
//         </div>
//       </motion.div>

//       {/* ── Text block ────────────────────────────────────────────────── */}
//       <motion.div
//         initial={{ opacity: 0, x: isLeft ? 72 : -72 }}
//         animate={isInView ? { opacity: 1, x: 0 } : {}}
//         transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
//         className={`absolute max-w-[36%] ${isLeft ? 'right-0 text-left' : 'left-0 text-right'}`}
//         style={{ zIndex: 5 }}
//       >
//         {/* Big step number */}
//         <motion.p
//           className="text-[2.6rem] font-black leading-none"
//           style={{ color: accent }}
//           initial={{ opacity: 0, y: 16 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.55, delay: 0.22 }}
//         >
//           {step.num}
//         </motion.p>

//         {/* Title */}
//         <motion.h3
//           className="mt-1.5 text-xl font-black leading-snug text-[#241608] sm:text-2xl"
//           initial={{ opacity: 0, y: 10 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.55, delay: 0.3 }}
//         >
//           {step.title}
//         </motion.h3>

//         {/* Body copy */}
//         <motion.p
//           className="mt-2 text-sm leading-7 text-[#5B4636]"
//           initial={{ opacity: 0, y: 8 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5, delay: 0.36 }}
//         >
//           {step.copy}
//         </motion.p>

//         {/* Icon chip */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.7 }}
//           animate={isInView ? { opacity: 1, scale: 1 } : {}}
//           transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.46 }}
//           className={`mt-3 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold ${isLeft ? '' : 'flex-row-reverse'}`}
//           style={{
//             background: `${accent}18`,
//             color: accent,
//             border: `1.5px solid ${accent}30`,
//           }}
//         >
//           <step.icon className="text-sm shrink-0" />
//           <span>{step.title.split(' ').slice(0, 3).join(' ')}</span>
//         </motion.div>
//       </motion.div>
//     </div>
//   )
// }

// /* =====================================================================
//    CURVED PROCESS — full section with winding path + step units
// ===================================================================== */
// function CurvedProcess({ steps, prefersReducedMotion }) {
//   const sectionRef = useRef(null)
//   /* Layout constants */
//   const ROW_H = 290
//   const BUBBLE = 210
//   const SVG_W = 600
//   const LEFT_BX = SVG_W * 0.27
//   const RIGHT_BX = SVG_W * 0.73

//   const accent = (i) => STEP_ACCENTS[i] ?? '#C0392B'

//   /* Anchor centres */
//   const points = steps.map((_, i) => ({
//     x: i % 2 === 0 ? LEFT_BX : RIGHT_BX,
//     y: ROW_H * i + ROW_H / 2,
//   }))

//   /* Smooth cubic bezier winding path */
//   const pathD = points.reduce((acc, pt, i) => {
//     if (i === 0) return `M ${pt.x} ${pt.y}`
//     const prev = points[i - 1]
//     const midY = (prev.y + pt.y) / 2
//     return `${acc} C ${prev.x} ${midY}, ${pt.x} ${midY}, ${pt.x} ${pt.y}`
//   }, '')

//   /* Scroll-driven path draw */
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ['start 0.78', 'end 0.35'],
//   })
//   const pathLength = useSpring(scrollYProgress, { stiffness: 80, damping: 24 })

//   const svgH = ROW_H * steps.length

//   return (
//     <section
//       ref={sectionRef}
//       className="relative overflow-hidden bg-white px-6 py-24 lg:px-10"
//     >
//       {/* Ambient glows */}
//       <div className="pointer-events-none absolute left-0 top-1/3 h-[500px] w-[500px] rounded-full bg-[#F2921A]/6 blur-[180px]" />
//       <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-[#146C36]/6 blur-[160px]" />

//       <div className="mx-auto max-w-4xl">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: '-80px' }}
//           transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
//         >
//           <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C0392B]">How it works</p>
//           <h2 className="mt-4 text-[clamp(2rem,4.2vw,3.2rem)] font-black leading-[1.02] tracking-[-0.02em] text-[#241608]">
//             From your idea to the last plate.
//           </h2>
//         </motion.div>

//         {/* Steps canvas */}
//         <div className="relative mt-16" style={{ height: svgH }}>

//           {/* ── Winding SVG path ──────────────────────────────────────── */}
//           <svg
//             viewBox={`0 0 ${SVG_W} ${svgH}`}
//             className="pointer-events-none absolute inset-0 h-full w-full"
//             preserveAspectRatio="xMidYMin meet"
//           >
//             <defs>
//               <linearGradient id="qatind-cpath-grad" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="0%" stopColor="#C0392B" />
//                 <stop offset="45%" stopColor="#F2921A" />
//                 <stop offset="100%" stopColor="#146C36" />
//               </linearGradient>
//             </defs>

//             {/* Ghost dashed track */}
//             <path
//               d={pathD}
//               fill="none"
//               stroke="#241608"
//               strokeOpacity="0.07"
//               strokeWidth="2.5"
//               strokeDasharray="6 14"
//               strokeLinecap="round"
//             />

//             {/* Animated coloured path */}
//             <motion.path
//               d={pathD}
//               fill="none"
//               stroke="url(#qatind-cpath-grad)"
//               strokeWidth="3"
//               strokeLinecap="round"
//               style={{ pathLength: prefersReducedMotion ? 1 : pathLength }}
//             />

//             {/* Node dots */}
//             {points.map((pt, i) => {
//               const ac = accent(i)
//               return (
//                 <g key={i}>
//                   <circle
//                     cx={pt.x} cy={pt.y} r={14}
//                     fill="white"
//                     stroke={ac}
//                     strokeWidth="3"
//                     style={{ filter: `drop-shadow(0 2px 10px ${ac}55)` }}
//                   />
//                   <circle cx={pt.x} cy={pt.y} r={6} fill={ac} />
//                 </g>
//               )
//             })}
//           </svg>

//           {/* ── Step rows ─────────────────────────────────────────────── */}
//           {steps.map((step, i) => (
//             <StepUnit
//               key={step.num}
//               step={step}
//               index={i}
//               isLeft={i % 2 === 0}
//               accent={accent(i)}
//               rowH={ROW_H}
//               bubbleSize={BUBBLE}
//               svgW={SVG_W}
//               leftBX={LEFT_BX}
//               rightBX={RIGHT_BX}
//               prefersReducedMotion={prefersReducedMotion}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// /* =====================================================================
//    IMMERSIVE STORY
// ===================================================================== */
// function ImmersiveStory({ prefersReducedMotion }) {
//   const ref = useRef(null)
//   const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
//   const y = useTransform(scrollYProgress, [0, 1], ['-8%', prefersReducedMotion ? '-8%' : '8%'])

//   const labels = ['Freshly Prepared', 'Home-Style Recipes', 'Veg & Non-Veg', 'Made For Your Occasion']

//   return (
//     <section ref={ref} className="relative h-[70vh] min-h-[480px] overflow-hidden">
//       <motion.div style={{ y }} className="absolute inset-0 -top-[8%] h-[116%] w-full">
//         <img
//           src="Services/ScaleQatind.jpg"
//           alt="Qatind spread of home-style and celebration food"
//           className="h-full w-full object-cover"
//           loading="lazy"
//         />
//       </motion.div>
//       <div className="absolute inset-0 bg-gradient-to-t from-[#241608]/95 via-[#241608]/60 to-[#241608]/80" />

//       <div className="relative z-10 flex h-full flex-col justify-between px-6 py-14 lg:px-10">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: '-100px' }}
//           transition={{ duration: 0.7 }}
//           className="max-w-3xl text-[clamp(2.2rem,5.5vw,4.2rem)] font-black leading-[1.02] tracking-[-0.02em] text-white">
//           The taste of home.{' '}
//           <span className="bg-gradient-to-r from-[#F2921A] via-[#FFB74D] to-[#C0392B] bg-clip-text text-transparent">
//             The scale of Qatind.
//           </span>
//         </motion.h2>

//         <div className="flex flex-wrap gap-3">
//           {labels.map((label, i) => (
//             <motion.span
//               key={label}
//               initial={{ opacity: 0, y: 12 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: '-60px' }}
//               transition={{ duration: 0.5, delay: i * 0.08 }}
//               className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white backdrop-blur shadow-md"
//             >
//               {label}
//             </motion.span>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// /* =====================================================================
//    FOOD SHOWCASE — tilted overlapping slider
// ===================================================================== */
// function FoodShowcase({ plates, prefersReducedMotion }) {
//   const [index, setIndex] = useState(0)
//   const count = plates.length
//   const AUTOPLAY_MS = 4500

//   useEffect(() => {
//     if (prefersReducedMotion) return
//     const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
//     return () => clearInterval(id)
//   }, [count, prefersReducedMotion])

//   const go = (dir) => setIndex((i) => (i + dir + count) % count)

//   const getOffset = (i) => {
//     let diff = i - index
//     if (diff > count / 2) diff -= count
//     if (diff < -count / 2) diff += count
//     return diff
//   }

//   return (
//     <section className="relative overflow-hidden bg-[#FBF2E3] px-6 py-24 lg:px-10">
//       <div className="mx-auto max-w-7xl text-center">
//         <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C0392B]">On the menu</p>
//         <h2 className="mt-4 text-[clamp(2rem,4.2vw,3.2rem)] font-black tracking-[-0.02em] text-[#241608]">
//           A taste of what leaves our kitchen.
//         </h2>
//       </div>

//       <div className="relative mt-16 flex h-[380px] items-center justify-center sm:h-[440px]">
//         {plates.map((plate, i) => {
//           const offset = getOffset(i)
//           if (Math.abs(offset) > 2) return null
//           const isActive = offset === 0
//           const x = offset * 230
//           const rotate = offset * 10
//           const scale = isActive ? 1 : 0.78
//           const zIndex = 10 - Math.abs(offset)
//           const opacity = Math.abs(offset) > 1 ? 0.35 : 1

//           return (
//             <motion.div
//               key={plate.id}
//               drag={isActive ? 'x' : false}
//               dragConstraints={{ left: 0, right: 0 }}
//               dragElastic={0.6}
//               onDragEnd={(_, info) => {
//                 if (info.offset.x < -60) go(1)
//                 else if (info.offset.x > 60) go(-1)
//               }}
//               animate={{ x, rotate: prefersReducedMotion ? 0 : rotate, scale, zIndex, opacity }}
//               transition={{ type: 'spring', stiffness: 220, damping: 26 }}
//               className="absolute h-[300px] w-[220px] cursor-grab overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-20px_rgba(43,27,14,0.35)] active:cursor-grabbing sm:h-[360px] sm:w-[270px]"
//               onClick={() => !isActive && setIndex(i)}
//             >
//               <img src={plate.image} alt={plate.name} className="h-full w-full object-cover" loading="lazy" />
//               {!isActive && <div className="absolute inset-0 bg-[#241608]/25" />}
//             </motion.div>
//           )
//         })}
//       </div>

//       <div className="relative z-20 mx-auto mt-8 flex max-w-md items-center justify-center gap-4">
//         <button
//           type="button"
//           onClick={() => go(-1)}
//           className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#241608]/15 bg-white text-[#241608] shadow-sm transition hover:border-[#146C36]/40"
//           aria-label="Previous dish"
//         >
//           <RiArrowLeftSLine className="text-xl" />
//         </button>

//         <AnimatePresence mode="wait">
//           <motion.div
//             key={plates[index].id}
//             initial={{ opacity: 0, y: 8, scale: 0.96 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -8, scale: 0.96 }}
//             transition={{ type: 'spring', stiffness: 320, damping: 28 }}
//             className="flex flex-1 items-center justify-center gap-2.5 rounded-full bg-[#146C36]/10 px-5 py-2.5 text-center"
//           >
//             <span className="relative flex h-2.5 w-2.5 shrink-0">
//               {!prefersReducedMotion && (
//                 <motion.span
//                   key={`ring-${plates[index].id}`}
//                   className="absolute inset-0 rounded-full border-2 border-[#146C36]"
//                   initial={{ scale: 1, opacity: 0.7 }}
//                   animate={{ scale: 2.4, opacity: 0 }}
//                   transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
//                 />
//               )}
//               <span className="h-2.5 w-2.5 rounded-full bg-[#146C36]" />
//             </span>
//             <span className="text-sm font-bold text-[#146C36]">{plates[index].name}</span>
//           </motion.div>
//         </AnimatePresence>

//         <button
//           type="button"
//           onClick={() => go(1)}
//           className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#241608]/15 bg-white text-[#241608] shadow-sm transition hover:border-[#146C36]/40"
//           aria-label="Next dish"
//         >
//           <RiArrowRightSLine className="text-xl" />
//         </button>
//       </div>

//       <div className="mt-6 flex items-center justify-center gap-2">
//         {plates.map((plate, i) => (
//           <button
//             key={plate.id}
//             type="button"
//             onClick={() => setIndex(i)}
//             aria-label={`Show ${plate.name}`}
//             className="h-1.5 rounded-full transition-all"
//             style={{
//               width: i === index ? '1.75rem' : '0.4rem',
//               background: i === index ? '#C0392B' : 'rgba(36,22,8,0.15)',
//             }}
//           />
//         ))}
//       </div>
//     </section>
//   )
// }

// /* =====================================================================
//    MAIN PAGE
// ===================================================================== */
// export default function ServicesPage() {
//   const prefersReducedMotion = useReducedMotion()
//   const [activeService, setActiveService] = useState(serviceMenu[0].id)
//   const [openFaq, setOpenFaq] = useState(0)

//   useEffect(() => {
//     const previousBg = document.body.style.backgroundColor
//     const previousColor = document.body.style.color
//     document.body.style.backgroundColor = '#FBF2E3'
//     document.body.style.color = '#241608'
//     return () => {
//       document.body.style.backgroundColor = previousBg
//       document.body.style.color = previousColor
//     }
//   }, [])

//   const heroRef = useRef(null)
//   const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
//   const heroImgY = useTransform(heroProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '22%'])
//   const heroFloatY = useTransform(heroProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '38%'])

//   const { scrollYProgress: pageProgress } = useScroll()
//   const progressBar = useSpring(pageProgress, { stiffness: 120, damping: 24 })

//   const activeItem = useMemo(
//     () => serviceMenu.find((s) => s.id === activeService) ?? serviceMenu[0],
//     [activeService],
//   )

//   const handleHeroMouseMove = (e) => {
//     if (prefersReducedMotion) return
//     const { currentTarget, clientX, clientY } = e
//     const rect = currentTarget.getBoundingClientRect()
//     const x = ((clientX - rect.left) / rect.width - 0.5) * 2
//     const y = ((clientY - rect.top) / rect.height - 0.5) * 2
//     currentTarget.style.setProperty('--px', x.toFixed(3))
//     currentTarget.style.setProperty('--py', y.toFixed(3))
//   }

//   const handleTilt = (e) => {
//     if (prefersReducedMotion) return
//     const { currentTarget, clientX, clientY } = e
//     const rect = currentTarget.getBoundingClientRect()
//     currentTarget.style.setProperty('--tx', (((clientX - rect.left) / rect.width - 0.5) * 2).toFixed(3))
//     currentTarget.style.setProperty('--ty', (((clientY - rect.top) / rect.height - 0.5) * 2).toFixed(3))
//   }
//   const resetTilt = (e) => {
//     e.currentTarget.style.setProperty('--tx', 0)
//     e.currentTarget.style.setProperty('--ty', 0)
//   }

//   return (
//     <div
//       className="relative min-h-screen overflow-x-hidden bg-[#FBF2E3] font-sans text-[#241608] selection:bg-[#F2921A] selection:text-[#241608]"
//       style={{ fontFamily: "'Inter', Arial, sans-serif" }}
//     >
//       <style>{`
//         @keyframes qatind-marquee     { from { transform: translateX(0);    } to { transform: translateX(-50%); } }
//         @keyframes qatind-marquee-rev { from { transform: translateX(-50%); } to { transform: translateX(0);    } }
//         .qatind-marquee-a { animation: qatind-marquee     30s linear infinite; }
//         .qatind-marquee-b { animation: qatind-marquee-rev 34s linear infinite; }
//         @keyframes qatind-steam {
//           0%   { transform: translateY(0)    scale(1);   opacity: .5; }
//           100% { transform: translateY(-46px) scale(1.5); opacity: 0; }
//         }
//         .qatind-steam span { animation: qatind-steam 3.2s ease-in infinite; }
//         .qatind-steam span:nth-child(2) { animation-delay: .8s;  }
//         .qatind-steam span:nth-child(3) { animation-delay: 1.6s; }
//         .qatind-hero-float-1 { transform: translate(calc(var(--px,0)*-14px), calc(var(--py,0)*-14px)); transition: transform .3s ease-out; }
//         .qatind-hero-float-2 { transform: translate(calc(var(--px,0)*18px),  calc(var(--py,0)*12px));  transition: transform .35s ease-out; }
//         .qatind-grain {
//           background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
//         }
//         @keyframes qatind-bounce { 0%,100%{transform:translateY(0);opacity:.5;} 50%{transform:translateY(10px);opacity:1;} }
//         .qatind-scroll-cue { animation: qatind-bounce 2s ease-in-out infinite; }
//         .qatind-shine { position: relative; overflow: hidden; }
//         .qatind-shine::after {
//           content: '';
//           position: absolute; top: 0; left: -60%;
//           width: 40%; height: 100%;
//           background: linear-gradient(115deg,transparent,rgba(255,255,255,0.22),transparent);
//           transform: skewX(-20deg);
//           transition: left 0.7s ease;
//           pointer-events: none;
//         }
//         .qatind-shine:hover::after { left: 130%; }
//         .qatind-tilt {
//           transform: perspective(900px) rotateX(calc(var(--ty,0)*-6deg)) rotateY(calc(var(--tx,0)*6deg)) translateZ(0);
//           transition: transform .25s ease-out;
//         }
//         @media (prefers-reduced-motion: reduce) {
//           .qatind-marquee-a,.qatind-marquee-b,.qatind-steam span,.qatind-scroll-cue { animation: none !important; }
//           .qatind-hero-float-1,.qatind-hero-float-2,.qatind-tilt { transform: none !important; }
//           .qatind-shine::after { display: none; }
//         }
//       `}</style>

//       <MouseGlowCursor />

//       {/* Reading-progress bar */}
//       <motion.div
//         style={{ scaleX: progressBar }}
//         className="fixed left-0 right-0 top-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-[#C0392B] via-[#F2921A] to-[#146C36]"
//       />

//       {/* ================================================================
//           1 — HERO
//       ================================================================ */}
//       <section
//         ref={heroRef}
//         onMouseMove={handleHeroMouseMove}
//         className="relative overflow-hidden px-6 pb-20 pt-28 lg:px-10 lg:pb-28 lg:pt-36"
//       >
//         <div className="qatind-grain pointer-events-none absolute inset-0" />
//         <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(242,146,26,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(20,108,54,0.15),transparent_42%)]" />
//         <div className="pointer-events-none absolute -left-24 top-6  h-[380px] w-[380px] rounded-full bg-[#C0392B]/10 blur-[120px]" />
//         <div className="pointer-events-none absolute -right-16 top-32 h-[360px] w-[360px] rounded-full bg-[#146C36]/12 blur-[130px]" />

//         <div className="relative z-10 mx-auto max-w-7xl">
//           <motion.span
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="inline-flex items-center gap-2 rounded-full border border-[#241608]/10 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#C0392B] shadow-sm"
//           >
//             <RiSparklingLine className="text-base text-[#F2921A]" />
//             Home-Style • Fresh • Made With Care
//           </motion.span>

//           <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
//             <motion.h1
//               initial="hidden"
//               animate="show"
//               variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
//               className="text-[clamp(2.6rem,6.4vw,5.4rem)] font-black leading-[0.98] tracking-[-0.03em] text-[#241608]"
//             >
//               {['Home-style food.', 'Made for every occasion.'].map((line) => (
//                 <motion.span
//                   key={line}
//                   variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } }}
//                   transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
//                   className="block"
//                 >
//                   {line}
//                 </motion.span>
//               ))}
//             </motion.h1>

//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.4 }}
//               className="space-y-6"
//             >
//               <p className="max-w-md text-lg leading-8 text-[#5B4636]">
//                 From everyday office meals to weddings, celebrations and live food
//                 counters — Qatind brings the comfort of home cooking to every table.
//               </p>
//               <div className="flex flex-wrap gap-4">
//                 <MagneticButton>
//                   <motion.a
//                     whileTap={{ scale: 0.96 }}
//                     href="tel:+917305461104"
//                     className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#F2921A] via-[#E8871E] to-[#C0392B] px-7 py-4 text-sm font-bold text-[#241608] shadow-[0_20px_50px_-20px_rgba(242,146,26,0.65)] transition duration-300 hover:-translate-y-1"
//                   >
//                     Plan Your Menu
//                     <RiArrowRightLine className="text-lg" />
//                   </motion.a>
//                 </MagneticButton>
//                 <MagneticButton>
//                   <motion.a
//                     whileTap={{ scale: 0.96 }}
//                     href="#menu"
//                     className="inline-flex items-center gap-3 rounded-full border border-[#241608]/15 bg-white px-7 py-4 text-sm font-bold text-[#241608] transition duration-300 hover:border-[#146C36]/40 hover:bg-[#146C36]/5"
//                   >
//                     Explore Our Services
//                     <RiArrowRightLine className="text-lg" />
//                   </motion.a>
//                 </MagneticButton>
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         <div className="qatind-scroll-cue pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 sm:flex">
//           <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#5B4636]">Scroll</span>
//           <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
//             <rect x="1" y="1" width="12" height="18" rx="6" stroke="#5B4636" strokeWidth="1.2" />
//             <circle cx="7" cy="6" r="1.6" fill="#C0392B" />
//           </svg>
//         </div>
//       </section>

//       {/* ================================================================
//           2 — MARQUEE (dual direction)
//       ================================================================ */}
//       <div className="relative overflow-hidden border-y border-[#241608]/8 bg-[#241608]">
//         {[{ items: tickerA, cls: 'qatind-marquee-a' }, { items: tickerB, cls: 'qatind-marquee-b' }].map((row, i) => (
//           <div key={i} className={`flex w-max py-2.5 ${row.cls}`}>
//             {[...row.items, ...row.items].map((item, idx) => (
//               <span key={idx} className="mx-5 flex items-center gap-3 whitespace-nowrap text-sm font-bold uppercase tracking-[0.2em] text-white/90">
//                 {item}
//                 <span className="h-1.5 w-1.5 rounded-full bg-[#F2921A]" />
//               </span>
//             ))}
//           </div>
//         ))}
//       </div>

//       {/* ================================================================
//           3 — FOOD JOURNEY
//       ================================================================ */}
//       <section className="relative px-6 py-24 lg:px-10">
//         <div className="mx-auto max-w-7xl">
//           <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C0392B]">One kitchen. Many occasions.</p>
//           <h2 className="mt-4 max-w-3xl text-[clamp(2rem,4.4vw,3.4rem)] font-black leading-[1.02] tracking-[-0.02em] text-[#241608]">
//             Everyday. Business. Celebration.
//           </h2>
//           <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-[#241608]/10 bg-[#241608]/10 md:grid-cols-4">
//             {journeyChapters.map((chapter, i) => {
//               const Icon = chapter.icon
//               return (
//                 <motion.div
//                   key={chapter.label}
//                   initial={{ opacity: 0, y: 24 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, margin: '-80px' }}
//                   transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
//                   whileHover={{ y: -4 }}
//                   onMouseMove={handleTilt}
//                   onMouseLeave={resetTilt}
//                   className="qatind-tilt qatind-shine group relative flex min-h-[280px] flex-col justify-between bg-[#FBF2E3] p-7 transition-colors hover:bg-white"
//                 >
//                   <div>
//                     <motion.div
//                       className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F2921A]/15 border border-[#F2921A]/30 text-[#C0392B] group-hover:bg-[#C0392B] group-hover:text-white transition-all duration-300 shadow-sm"
//                       whileHover={{ scale: 1.1 }}
//                       transition={{ type: 'spring', stiffness: 260, damping: 18 }}
//                     >
//                       <Icon className="text-2xl" />
//                     </motion.div>
//                     <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-[#C0392B]">{chapter.label}</p>
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-black text-[#241608]">{chapter.title}</h3>
//                     <p className="mt-2 text-sm leading-6 text-[#5B4636]">{chapter.copy}</p>
//                   </div>
//                 </motion.div>
//               )
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ================================================================
//           4 — INTERACTIVE SERVICE EXPERIENCE
//       ================================================================ */}
//       <section id="menu" className="relative bg-white px-6 py-24 lg:px-10">
//         <div className="mx-auto max-w-7xl">
//           <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C0392B]">Industries We Serve</p>
//           <h2 className="mt-4 max-w-2xl text-[clamp(2rem,4.2vw,3.2rem)] font-black leading-[1.05] tracking-[-0.02em] text-[#241608]">
//             Pick an occasion. See how we'd feed it.
//           </h2>

//           <div className="mt-14 grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:items-stretch">
//             {/* Service list */}
//             <div className="flex flex-col divide-y divide-[#241608]/10 border-y border-[#241608]/10 lg:border-0 lg:divide-y-0">
//               {serviceMenu.map((service) => {
//                 const active = service.id === activeService
//                 return (
//                   <motion.button
//                     key={service.id}
//                     type="button"
//                     onClick={() => setActiveService(service.id)}
//                     whileHover={{ x: 6 }}
//                     whileTap={{ scale: 0.98 }}
//                     transition={{ type: 'spring', stiffness: 350, damping: 24 }}
//                     className="group relative flex items-center justify-between gap-4 py-5 text-left"
//                   >
//                     <span className="flex items-center gap-4">
//                       <span className="text-xs font-bold tracking-widest transition-colors" style={{ color: active ? service.accent : '#5B4636' }}>
//                         {service.num}
//                       </span>
//                       <span className={`text-xl font-black transition-colors sm:text-2xl ${active ? 'text-[#241608]' : 'text-[#5B4636]/70 group-hover:text-[#241608]'}`}>
//                         {service.label}
//                       </span>
//                     </span>
//                     <RiArrowRightUpLine
//                       className={`shrink-0 text-2xl transition-all ${active ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60'}`}
//                       style={{ color: service.accent }}
//                     />
//                     {active && (
//                       <motion.span
//                         layoutId="menu-active-line"
//                         className="absolute left-0 top-0 h-full w-[3px]"
//                         style={{ background: service.accent }}
//                         transition={{ type: 'spring', stiffness: 400, damping: 34 }}
//                       />
//                     )}
//                   </motion.button>
//                 )
//               })}
//             </div>

//             {/* Service panel */}
//             <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-[#241608]">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeItem.id}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.4 }}
//                   className="absolute inset-0"
//                 >
//                   <motion.img
//                     initial={{ scale: 1.12 }}
//                     animate={{ scale: 1 }}
//                     transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//                     src={activeItem.image}
//                     alt={activeItem.title}
//                     className="h-full w-full object-cover"
//                     loading="lazy"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#241608] via-[#241608]/55 to-transparent" />
//                 </motion.div>
//               </AnimatePresence>

//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeItem.id + '-copy'}
//                   initial={{ opacity: 0, y: 18 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -12 }}
//                   transition={{ duration: 0.45, delay: 0.1 }}
//                   className="relative z-10 flex h-full min-h-[520px] flex-col justify-end p-8 sm:p-10"
//                 >
//                   <span
//                     className="mb-4 inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold text-[#241608]"
//                     style={{ background: activeItem.accent }}
//                   >
//                     <activeItem.icon className="text-sm" />
//                     {activeItem.label}
//                   </span>
//                   <h3 className="max-w-lg text-2xl font-black leading-tight text-white sm:text-3xl">{activeItem.title}</h3>
//                   <p className="mt-3 max-w-lg text-sm leading-7 text-white/75">{activeItem.description}</p>
//                   <div className="mt-5 flex flex-wrap gap-2">
//                     {activeItem.highlights.map((h) => (
//                       <span key={h} className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur">
//                         {h}
//                       </span>
//                     ))}
//                   </div>
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================================================================
//           5 — IMMERSIVE IMAGE STORY
//       ================================================================ */}
//       <ImmersiveStory prefersReducedMotion={prefersReducedMotion} />

//       {/* ================================================================
//           6 — HOW IT WORKS (new CurvedProcess with circular bubbles)
//       ================================================================ */}
//       <CurvedProcess steps={plateSteps} prefersReducedMotion={prefersReducedMotion} />

//       {/* ================================================================
//           7 — FOOD SHOWCASE slider
//       ================================================================ */}
//       <FoodShowcase plates={showcasePlates} prefersReducedMotion={prefersReducedMotion} />

//       {/* ================================================================
//           8 — QUALITY PILLARS
//       ================================================================ */}
//       <section
//         className="relative overflow-hidden px-6 py-24 lg:px-10"
//         style={{ background: 'linear-gradient(150deg, #0A331A 0%, #146C36 55%, #184228 100%)' }}
//       >
//         <div className="qatind-grain pointer-events-none absolute inset-0 opacity-40" />
//         <div className="pointer-events-none absolute -right-20 top-0 h-[320px] w-[320px] rounded-full bg-[#F2921A]/20 blur-[130px]" />

//         <div className="relative mx-auto max-w-7xl">
//           <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#F2921A]">Quality, promised</p>
//           <h2 className="mt-4 max-w-3xl text-[clamp(2rem,4.4vw,3.4rem)] font-black leading-[1.05] tracking-[-0.02em] text-white">
//             Home-style at heart. Professional in every detail.
//           </h2>

//           <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
//             {qualityPillars.map((pillar, i) => (
//               <motion.div
//                 key={pillar.num}
//                 initial={{ opacity: 0, y: 24 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: '-60px' }}
//                 transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
//                 whileHover={{ y: -6 }}
//                 onMouseMove={handleTilt}
//                 onMouseLeave={resetTilt}
//                 className="qatind-tilt qatind-shine rounded-2xl border-t border-white/15 bg-white/[0.03] p-6 pt-6"
//               >
//                 <div className="flex items-baseline justify-between">
//                   <motion.span
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.6, delay: i * 0.06 + 0.15 }}
//                     className="text-4xl font-black text-white/20"
//                   >
//                     {pillar.num}
//                   </motion.span>
//                   <motion.span whileHover={{ rotate: 12, scale: 1.15 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
//                     <pillar.icon className="text-xl text-[#F2921A]" />
//                   </motion.span>
//                 </div>
//                 <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-[#F2921A]">{pillar.label}</p>
//                 <h3 className="mt-1 text-lg font-black text-white">{pillar.title}</h3>
//                 <p className="mt-2 text-sm leading-6 text-white/70">{pillar.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//     </div>
//   )
// }
