import { useRef, useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
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
  RiTeamLine,
  RiHeart2Line,
} from 'react-icons/ri'
import { FiPhone, FiClock, FiUsers } from 'react-icons/fi'
import { BsShieldCheck, BsPatchCheck } from 'react-icons/bs'
import { LuChefHat, LuUtensilsCrossed } from 'react-icons/lu'
import { MdDeliveryDining, MdOutlineRestaurantMenu } from 'react-icons/md'

import MouseGlowCursor from '../components/common/MouseGlowCursor'
import MagneticButton from '../components/animations/MagneticButton'

/* =====================================================================
   QATIND ENTERPRISES — ULTRA MODERN & TRENDING CONTACT PAGE
===================================================================== */

const contactChannels = [
  {
    id: 'call',
    label: 'Call Us Direct',
    value: '+91 73054 61104',
    sub: 'Mon – Sun, 8:00 AM – 9:00 PM',
    badge: 'Immediate Response',
    icon: RiPhoneLine,
    href: 'tel:+917305461104',
    accent: '#C0392B',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp Kitchen',
    value: 'Message Our Chef',
    sub: 'Fastest way to get custom quote',
    badge: '⚡ Under 15 Mins',
    icon: RiWhatsappLine,
    href: 'https://wa.me/917305461104',
    accent: '#146C36',
  },
  {
    id: 'email',
    label: 'Email Concierge',
    value: 'hello@qatind.com',
    sub: 'Detailed menu proposals & bids',
    badge: 'Same-Day Proposal',
    icon: RiMailLine,
    href: 'mailto:hello@qatind.com',
    accent: '#F2921A',
  },
  {
    id: 'visit',
    label: 'Kitchen & Tasting',
    value: 'Madambakkam, Tamil Nadu',
    sub: 'By appointment for live tastings',
    badge: 'Tasting Sessions',
    icon: RiMapPin2Line,
    href: 'https://maps.google.com/?q=Qatind+Enterprises+Vellore',
    accent: '#C0392B',
  },
]

const occasionOptions = [
  { id: 'everyday', label: 'Everyday / Office Meals', icon: FiUsers },
  { id: 'corporate', label: 'Corporate Events & Summits', icon: LuChefHat },
  { id: 'hospital', label: 'Hospital & Healthcare Meals', icon: BsShieldCheck },
  { id: 'school', label: 'School / College Canteen', icon: LuUtensilsCrossed },
  { id: 'wedding', label: 'Wedding & Reception Feast', icon: RiHeart2Line },
  { id: 'party', label: 'Party & Celebration', icon: RiSparklingLine },
  { id: 'hampers', label: 'Festive & Corporate Gift Hampers', icon: MdOutlineRestaurantMenu },
  { id: 'custom', label: 'Custom Catering Requirement', icon: MdDeliveryDining },
]

const stats = [
  { label: 'Meals Delivered Daily', value: '10,000+', icon: MdDeliveryDining, accent: '#F2921A' },
  { label: 'On-Time Scheduled Delivery', value: '99.8%', icon: FiClock, accent: '#146C36' },
  { label: 'Customer Satisfaction', value: '4.9 / 5', icon: RiStarFill, accent: '#C0392B' },
  { label: 'Separate Veg/Non-Veg Lines', value: '100%', icon: BsPatchCheck, accent: '#F2921A' },
]

const officeHours = [
  { day: 'Monday – Friday', time: '8:00 AM – 9:00 PM', status: 'Open Now' },
  { day: 'Saturday', time: '8:00 AM – 9:00 PM', status: 'Open Now' },
  { day: 'Sunday', time: '9:00 AM – 6:00 PM', status: 'Active Dispatch' },
]

const showcaseCards = [
  {
    title: 'Corporate & Office Feasts',
    tag: 'Daily Delivery',
    img: '/Services/CorporateEvents.jpg',
    accent: '#C0392B',
  },
  {
    title: 'Weddings & Celebrations',
    tag: 'Grand Feasts',
    img: '/Services/WeddingCatering.png',
    accent: '#F2921A',
  },
  {
    title: 'Freshly Prepared & Sealed',
    tag: 'Hygiene Assured',
    img: '/Services/prepareFood.webp',
    accent: '#146C36',
  },
]

const faqs = [
  { question: 'How quickly will someone respond to my enquiry?', answer: 'WhatsApp messages and direct calls receive immediate replies within 15 minutes during kitchen hours. Form submissions and email requests are answered within 2 to 4 hours with full menu breakdowns.' },
  { question: 'What details should I have ready for a quick quote?', answer: 'Occasion type, approximate headcount, event date, venue location, and dietary preference split (Veg/Non-Veg, Jain, Eggless). The more specific you are, the faster we shape your menu plan!' },
  { question: 'Can we book a menu tasting before finalizing?', answer: 'Absolutely! For weddings, grand celebrations, and major corporate contracts, we arrange live tasting sessions at our Vellore kitchen facility or deliver fresh tasting samples directly to your office.' },
  { question: 'Do you cater for small family functions or last-minute orders?', answer: 'Yes! We accommodate both small intimate housewarming meals (20+ guests) and large 5,000+ guest summits. For daily office orders, 24-hour advance notice is recommended, though urgent orders can be accommodated by direct call.' },
]

const ticker = ['⚡ Same-Day Responses', '🍵 Live Tastings Available', '🍲 100% Morning Fresh', '🚚 Insulated Dispatch', '★ FSSAI Certified', '🤝 Customized Menu Plans']

/* =====================================================================
   MAIN PAGE COMPONENT
===================================================================== */
export default function ContactPage() {
  const prefersReducedMotion = useReducedMotion()
  const [openFaq, setOpenFaq] = useState(0)

  const [form, setForm] = useState({ name: '', phone: '', occasion: occasionOptions[0].label, guests: '', message: '' })
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    const previousBg = document.body.style.backgroundColor
    const previousColor = document.body.style.color
    document.body.style.backgroundColor = '#FBF2E3'
    document.body.style.color = '#241608'
    return () => {
      document.body.style.backgroundColor = previousBg
      document.body.style.color = previousColor
    }
  }, [])

  const heroRef = useRef(null)
  const { scrollYProgress: pageProgress } = useScroll()
  const progressBar = useSpring(pageProgress, { stiffness: 120, damping: 24 })

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
    ].filter(Boolean).join('\n')

    window.setTimeout(() => {
      window.open(`https://wa.me/917305401704?text=${encodeURIComponent(lines)}`, '_blank', 'noopener')
      setStatus('sent')
    }, 550)
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
    <div
      className="relative min-h-screen overflow-x-hidden bg-[#FBF2E3] font-sans text-[#241608] selection:bg-[#F2921A] selection:text-[#241608]"
      style={{ fontFamily: "'Inter', Arial, sans-serif" }}
    >
      <style>{`
        @keyframes qatind-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .qatind-marquee-a { animation: qatind-marquee 28s linear infinite; }
        .qatind-grain {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
        }
        .qatind-shine { position: relative; overflow: hidden; }
        .qatind-shine::after {
          content: '';
          position: absolute; top: 0; left: -60%;
          width: 40%; height: 100%;
          background: linear-gradient(115deg,transparent,rgba(255,255,255,0.22),transparent);
          transform: skewX(-20deg);
          transition: left 0.7s ease;
          pointer-events: none;
        }
        .qatind-shine:hover::after { left: 130%; }
        .qatind-tilt {
          transform: perspective(900px) rotateX(calc(var(--ty,0)*-6deg)) rotateY(calc(var(--tx,0)*6deg)) translateZ(0);
          transition: transform .25s ease-out;
        }
        .qatind-field {
          background: white;
          border: 1.5px solid rgba(36,22,8,0.12);
          border-radius: 1.25rem;
          padding: 0.95rem 1.2rem;
          font-size: 0.95rem;
          color: #241608;
          transition: border-color .2s ease, box-shadow .2s ease;
          width: 100%;
        }
        .qatind-field::placeholder { color: #5B4636; opacity: .6; }
        .qatind-field:focus {
          outline: none;
          border-color: #F2921A;
          box-shadow: 0 0 0 4px rgba(242,146,26,0.18);
        }
        @media (prefers-reduced-motion: reduce) {
          .qatind-marquee-a { animation: none !important; }
          .qatind-tilt { transform: none !important; }
          .qatind-shine::after { display: none; }
        }
      `}</style>

      <MouseGlowCursor />

      {/* Reading Progress Indicator */}
      <motion.div
        style={{ scaleX: progressBar }}
        className="fixed left-0 right-0 top-0 z-[100] h-[3.5px] origin-left bg-gradient-to-r from-[#C0392B] via-[#F2921A] to-[#146C36]"
      />

      {/* ================================================================
          1 — DYNAMIC 2-COLUMN HERO WITH FLOATING IMAGE STACK
      ================================================================ */}
      <section ref={heroRef} className="relative overflow-hidden px-6 pb-20 pt-28 lg:px-10 lg:pb-28 lg:pt-36">
        <div className="qatind-grain pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(242,146,26,0.22),transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(20,108,54,0.18),transparent_45%)]" />
        <div className="pointer-events-none absolute -left-28 top-10 h-[420px] w-[420px] rounded-full bg-[#C0392B]/12 blur-[140px]" />
        <div className="pointer-events-none absolute -right-20 top-40 h-[400px] w-[400px] rounded-full bg-[#F2921A]/15 blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.span
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                className="inline-flex items-center gap-2 rounded-full border border-[#C0392B]/20 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#C0392B] shadow-sm backdrop-blur-md"
              >
                <RiSparklingLine className="text-base text-[#F2921A]" />
                Direct Kitchen Concierge
              </motion.span>

              <motion.h1
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 text-[clamp(2.5rem,6vw,5.2rem)] font-black leading-[0.98] tracking-[-0.03em] text-[#241608]"
              >
                Let's bring good food{' '}
                <span className="bg-gradient-to-r from-[#C0392B] via-[#F2921A] to-[#146C36] bg-clip-text text-transparent">
                  to your table.
                </span>
              </motion.h1>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
                className="mt-6 max-w-lg text-lg leading-8 text-[#5B4636]"
              >
                Whether it's daily office lunches for 500 or a grand wedding feast for 3,000 —
                our kitchen is ready to plan, cook, and serve with care.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <MagneticButton>
                  <a
                    href="https://wa.me/917305401704"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#146C36] to-[#0A331A] px-7 py-4 text-sm font-bold text-white shadow-[0_20px_50px_-20px_rgba(20,108,54,0.6)] transition duration-300 hover:-translate-y-1"
                  >
                    <RiWhatsappLine className="text-xl text-[#2ECC71]" />
                    Chat on WhatsApp
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href="tel:+917305401704"
                    className="inline-flex items-center gap-3 rounded-full border border-[#241608]/15 bg-white px-7 py-4 text-sm font-bold text-[#241608] shadow-sm transition duration-300 hover:border-[#C0392B]/40 hover:bg-[#C0392B]/5"
                  >
                    <FiPhone className="text-lg text-[#C0392B]" />
                    Call +91 73054 01704
                  </a>
                </MagneticButton>
              </motion.div>
            </motion.div>

            {/* Right Visual Image Showcase Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex justify-center"
            >
              <div className="relative w-full max-w-md">
                {/* Glowing Aura Ring */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-[#F2921A]/30 to-[#C0392B]/30 blur-2xl transform rotate-3" />

                {/* Main Card Container */}
                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/40 bg-white/60 p-4 shadow-[0_30px_70px_-20px_rgba(36,22,8,0.25)] backdrop-blur-xl">
                  <img
                    src="/Services/FoodDelivery.png"
                    alt="Qatind Catering Delivery"
                    className="h-80 w-full rounded-[2rem] object-cover shadow-md"
                  />

                  {/* Floating Live Badge */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-8 left-8 right-8 flex items-center justify-between rounded-2xl border border-white/30 bg-[#241608]/85 p-4 text-white backdrop-blur-xl shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F2921A] text-[#241608] text-lg font-bold">
                        ⚡
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white/70">Response Guarantee</p>
                        <p className="text-sm font-bold text-white">Under 15 Mins Reply</p>
                      </div>
                    </div>
                    <span className="flex h-3 w-3 rounded-full bg-[#2ECC71] animate-ping" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ================================================================
          3 — QUICK METRICS STATS BAR
      ================================================================ */}
      <section className="relative px-6 py-14 lg:px-10 bg-white/40 border-b border-[#241608]/5">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((st, i) => (
              <motion.div
                key={st.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-center gap-4 rounded-2xl border border-[#241608]/8 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-[#F2921A]/40"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl"
                  style={{ background: `${st.accent}15`, color: st.accent }}
                >
                  <st.icon />
                </div>
                <div>
                  <p className="text-2xl font-black text-[#241608]">{st.value}</p>
                  <p className="text-xs font-semibold text-[#5B4636]">{st.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          4 — CONTACT CHANNELS (BENTO GRID)
      ================================================================ */}
      <section className="relative px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C0392B]">Fast & Direct Access</p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.2rem)] font-black leading-[1.05] tracking-[-0.02em] text-[#241608]">
              Reach out however suits you best.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactChannels.map((ch, i) => (
              <motion.a
                key={ch.id}
                href={ch.href}
                target={ch.id === 'visit' || ch.id === 'whatsapp' ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.02 }}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                className="qatind-tilt qatind-shine group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#241608]/10 bg-white p-7 shadow-lg transition-all duration-300 hover:border-[#F2921A]/50 hover:shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl shadow-inner group-hover:scale-110 transition-transform duration-300"
                      style={{ background: `${ch.accent}18`, color: ch.accent }}
                    >
                      <ch.icon />
                    </span>
                    <span
                      className="rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider"
                      style={{ background: `${ch.accent}15`, color: ch.accent }}
                    >
                      {ch.badge}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-black text-[#241608] group-hover:text-[#C0392B] transition-colors">
                    {ch.label}
                  </h3>
                  <p className="mt-1 text-base font-bold text-[#5B4636]">{ch.value}</p>
                  <p className="mt-2 text-xs text-[#5B4636]/80">{ch.sub}</p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: ch.accent }}>
                  <span>Connect Now</span>
                  <RiArrowRightLine className="text-sm group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          5 — INTERACTIVE FORM + VISUAL INFO SHOWCASE PANEL
      ================================================================ */}
      <section className="relative bg-white px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C0392B]">Instant Plan & Quote</p>
            <h2 className="mt-3 text-[clamp(2rem,4.2vw,3.2rem)] font-black leading-[1.05] tracking-[-0.02em] text-[#241608]">
              Tell us about your event. We'll craft the menu.
            </h2>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[0.58fr_0.42fr] lg:items-stretch">
            {/* Interactive Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit}
              className="rounded-[2.5rem] border border-[#241608]/10 bg-[#FBF2E3] p-7 sm:p-10 shadow-xl flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-black text-[#241608] mb-6 flex items-center gap-2">
                  <LuChefHat className="text-[#C0392B]" /> Catering Requirements Form
                </h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#5B4636]">Your Name *</span>
                    <input
                      required
                      value={form.name}
                      onChange={handleChange('name')}
                      placeholder="e.g. Aravind Kumar"
                      className="qatind-field"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#5B4636]">Phone Number *</span>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      placeholder="+91 XXXXX XXXXX"
                      className="qatind-field"
                    />
                  </label>
                </div>

                {/* Occasion Selection Chips */}
                <div className="mt-6">
                  <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#5B4636]">Select Occasion Type *</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {occasionOptions.slice(0, 4).map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, occasion: o.label }))}
                        className={`flex items-center gap-2 rounded-xl p-3 text-xs font-bold text-left transition-all ${form.occasion === o.label
                            ? 'bg-[#241608] text-white shadow-md'
                            : 'bg-white border border-[#241608]/10 text-[#5B4636] hover:border-[#F2921A]'
                          }`}
                      >
                        <o.icon className="text-base shrink-0 text-[#F2921A]" />
                        <span className="truncate">{o.label.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#5B4636]">Occasion Category</span>
                    <select value={form.occasion} onChange={handleChange('occasion')} className="qatind-field">
                      {occasionOptions.map((o) => <option key={o.id} value={o.label}>{o.label}</option>)}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#5B4636]">Estimated Guests</span>
                    <input
                      type="number"
                      min="1"
                      value={form.guests}
                      onChange={handleChange('guests')}
                      placeholder="e.g. 150 Guests"
                      className="qatind-field"
                    />
                  </label>
                </div>

                <label className="mt-5 block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-[#5B4636]">Dietary Notes & Event Date</span>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={handleChange('message')}
                    placeholder="Event date, venue location, Veg/Non-Veg ratio, Jain or low-oil requests..."
                    className="qatind-field resize-none"
                  />
                </label>
              </div>

              <div className="mt-8">
                <MagneticButton>
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    disabled={status === 'sending'}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#F2921A] via-[#E8871E] to-[#C0392B] px-8 py-4 text-base font-extrabold text-[#241608] shadow-[0_20px_50px_-20px_rgba(242,146,26,0.65)] transition duration-300 hover:-translate-y-1 disabled:opacity-70"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {status === 'sent' ? (
                        <motion.span key="sent" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2">
                          <RiCheckLine className="text-xl" /> Opened WhatsApp Chat
                        </motion.span>
                      ) : (
                        <motion.span key="send" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2">
                          {status === 'sending' ? 'Opening WhatsApp…' : 'Send Enquiry via WhatsApp'}
                          <RiSendPlaneFill className="text-lg" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </MagneticButton>
                <p className="mt-3 text-xs leading-5 text-center text-[#5B4636]">
                  ⚡ Opens WhatsApp directly with pre-filled details for instant estimation.
                </p>
              </div>
            </motion.form>

            {/* Visual Info Showcase Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-[2.5rem] bg-[#241608] p-8 text-white sm:p-10 shadow-2xl flex flex-col justify-between"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full bg-[#F2921A]/20 blur-[100px]" />
              <div className="pointer-events-none absolute -left-16 -bottom-16 h-60 w-60 rounded-full bg-[#C0392B]/20 blur-[100px]" />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-[#F2921A] backdrop-blur-md">
                  <BsShieldCheck /> FSSAI Certified Master Kitchen
                </span>

                <h3 className="mt-6 text-2xl font-black text-white">Kitchen Hours & Support</h3>
                <div className="mt-5 space-y-3.5">
                  {officeHours.map((h) => (
                    <div key={h.day} className="flex items-center justify-between border-b border-white/10 pb-3.5 text-sm">
                      <span className="flex items-center gap-2.5 text-white/80">
                        <RiTimeLine className="text-[#F2921A]" /> {h.day}
                      </span>
                      <span className="font-bold text-white">{h.time}</span>
                    </div>
                  ))}
                </div>

                <h3 className="mt-8 text-2xl font-black text-white">Kitchen & Office Address</h3>
                <p className="mt-3 flex items-start gap-3 text-sm leading-6 text-white/80">
                  <RiMapPin2Line className="mt-1 shrink-0 text-xl text-[#F2921A]" />
                  Qatind Enterprises, Main Road, Vellore, Tamil Nadu — Tastings available by appointment.
                </p>

                {/* Image Card Overlay */}
                <div className="mt-6 overflow-hidden rounded-2xl border border-white/15 shadow-lg">
                  <img
                    src='/Contact/officekitchen.jpg'
                    alt="Qatind Office & Kitchen"
                    className="h-36 w-full object-cover"
                  />
                </div>
              </div>

              <div className="relative z-10 mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                <span className="text-xs font-bold uppercase tracking-wider text-white/60">Follow Qatind</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-xl transition hover:border-[#F2921A] hover:text-[#F2921A] hover:bg-white/5"
                  >
                    <RiInstagramLine />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-xl transition hover:border-[#F2921A] hover:text-[#F2921A] hover:bg-white/5"
                  >
                    <RiFacebookCircleLine />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================
          6 — OCCASION SHOWCASE GALLERY CARDS
      ================================================================ */}
      <section className="relative px-6 py-24 lg:px-10 bg-[#FBF2E3]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C0392B]">What We Cater</p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.2rem)] font-black leading-[1.05] tracking-[-0.02em] text-[#241608]">
              Food created for every scale & style.
            </h2>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {showcaseCards.map((sc, i) => (
              <motion.div
                key={sc.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-[2rem] border border-[#241608]/10 bg-white shadow-xl"
              >
                <div className="relative h-60 overflow-hidden">
                  <img src={sc.img} alt={sc.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241608]/80 via-transparent to-transparent" />
                  <span
                    className="absolute top-4 left-4 rounded-full px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-white backdrop-blur-md"
                    style={{ background: sc.accent }}
                  >
                    {sc.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-[#241608] group-hover:text-[#C0392B] transition-colors">{sc.title}</h3>
                  <p className="mt-2 text-xs text-[#5B4636] font-medium">Customized menus, live counters & full event service.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          7 — FAQ ACCORDION
      ================================================================ */}
      <section className="relative bg-white px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.4fr_0.6fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C0392B]">Questions Answered</p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-black leading-[1.05] tracking-[-0.02em] text-[#241608]">
              Frequently asked catering questions.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#5B4636]">
              Have a custom request or dietary requirement? Call our kitchen team directly.
            </p>
            <MagneticButton>
              <a href="tel:+917305401704" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#C0392B]">
                <FiPhone /> +91 73054 01704
              </a>
            </MagneticButton>
          </div>

          <div className="space-y-4">
            {faqs.map((item, index) => {
              const isOpen = openFaq === index
              return (
                <div key={item.question} className="overflow-hidden rounded-2xl border border-[#241608]/10 bg-[#FBF2E3] transition-colors hover:border-[#F2921A]/50">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left text-base font-bold text-[#241608]"
                  >
                    <span>{item.question}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="shrink-0 text-2xl leading-none text-[#C0392B]">
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-7"
                      >
                        <p className="pb-6 text-sm leading-7 text-[#5B4636]">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          8 — FINAL CTA BANNER
      ================================================================ */}
      <section
        className="relative overflow-hidden px-6 py-24 lg:px-10"
        style={{ background: 'linear-gradient(150deg, #0A331A 0%, #146C36 55%, #184228 100%)' }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[5px] bg-gradient-to-r from-[#C0392B] via-[#F2921A] to-[#146C36]" />
        <div className="pointer-events-none absolute left-1/4 top-0 h-[280px] w-[280px] rounded-full bg-[#F2921A]/18 blur-[130px]" />
        <div className="pointer-events-none absolute bottom-0 right-10 h-[240px] w-[240px] rounded-full bg-[#C0392B]/18 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#F2921A]">Ready to get started?</p>
          <h2 className="mt-4 text-[clamp(2.2rem,5vw,3.6rem)] font-black leading-[1.02] tracking-[-0.02em] text-white">
            A 5-minute conversation sets your menu in motion.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-white/75">
            No commitment, no stress — let's plan delicious food for your guests.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <MagneticButton>
              <a
                href="tel:+917305401704"
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#F2921A] via-[#E8871E] to-[#C0392B] px-8 py-4 text-sm font-bold text-[#241608] shadow-lg transition duration-300 hover:-translate-y-1"
              >
                Call Qatind Kitchen
                <RiArrowRightLine className="text-lg" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://wa.me/917305401704"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/20 px-8 py-4 text-sm font-bold text-white transition duration-300 hover:bg-white/10"
              >
                <RiWhatsappLine className="text-lg text-[#2ECC71]" /> WhatsApp Instant Quote
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </section>
    </div>
  )
}