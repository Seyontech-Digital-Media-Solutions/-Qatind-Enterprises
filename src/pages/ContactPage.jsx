import { useRef, useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
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
  RiHeart2Line,
} from 'react-icons/ri'
import { FiPhone, FiClock, FiUsers } from 'react-icons/fi'
import { BsShieldCheck, BsPatchCheck } from 'react-icons/bs'
import { LuChefHat, LuUtensilsCrossed } from 'react-icons/lu'
import { MdDeliveryDining, MdOutlineRestaurantMenu } from 'react-icons/md'

import MouseGlowCursor from '../components/common/MouseGlowCursor'
import MagneticButton from '../components/animations/MagneticButton'

import '../components/styles/ContactPage.scss'

/* =====================================================================
   QATIND ENTERPRISES — CONTACT PAGE
   Styling: SCSS module only (ContactPage.module.scss), built from the
   shared variables.scss / mixins.scss design tokens. No Tailwind, no
   inline style objects for static design — only dynamic accent keys.
===================================================================== */

const img = (path) => `${import.meta.env.BASE_URL}${path}`

const contactChannels = [
  {
    id: 'call',
    label: 'Call Us Direct',
    value: '+91 73054 61104',
    sub: 'Mon – Sun, 8:00 AM – 9:00 PM',
    badge: 'Immediate Response',
    icon: RiPhoneLine,
    href: 'tel:+917305461104',
    accent: 'red',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp Kitchen',
    value: 'Message Our Chef',
    sub: 'Fastest way to get custom quote',
    badge: '⚡ Under 15 Mins',
    icon: RiWhatsappLine,
    href: 'https://wa.me/917305461104',
    accent: 'green',
  },
  {
    id: 'email',
    label: 'Email Concierge',
    value: 'hello@qatind.com',
    sub: 'Detailed menu proposals & bids',
    badge: 'Same-Day Proposal',
    icon: RiMailLine,
    href: 'mailto:hello@qatind.com',
    accent: 'saffron',
  },
  {
    id: 'visit',
    label: 'Kitchen & Tasting',
    value: 'Madambakkam, Tamil Nadu',
    sub: 'By appointment for live tastings',
    badge: 'Tasting Sessions',
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
  { id: 'hampers', label: 'Festive & Corporate Gift Hampers', icon: MdOutlineRestaurantMenu },
  { id: 'custom', label: 'Custom Catering Requirement', icon: MdDeliveryDining },
]

const stats = [
  { label: 'Meals Delivered Daily', value: '10,000+', icon: MdDeliveryDining, accent: 'saffron' },
  { label: 'On-Time Scheduled Delivery', value: '99.8%', icon: FiClock, accent: 'green' },
  { label: 'Customer Satisfaction', value: '4.9 / 5', icon: RiStarFill, accent: 'red' },
  { label: 'Separate Veg/Non-Veg Lines', value: '100%', icon: BsPatchCheck, accent: 'saffron' },
]

const officeHours = [
  { day: 'Monday – Friday', time: '8:00 AM – 9:00 PM' },
  { day: 'Saturday', time: '8:00 AM – 9:00 PM' },
  { day: 'Sunday', time: '9:00 AM – 6:00 PM' },
]

const showcaseCards = [
  {
    title: 'Corporate & Office Feasts',
    tag: 'Daily Delivery',
    img: img('Services/CorporateEvents.jpg'),
    accent: 'red',
  },
  {
    title: 'Weddings & Celebrations',
    tag: 'Grand Feasts',
    img: img('Services/WeddingCatering.png'),
    accent: 'saffron',
  },
  {
    title: 'Freshly Prepared & Sealed',
    tag: 'Hygiene Assured',
    img: img('Services/prepareFood.webp'),
    accent: 'green',
  },
]

const faqs = [
  { question: 'How quickly will someone respond to my enquiry?', answer: 'WhatsApp messages and direct calls receive immediate replies within 15 minutes during kitchen hours. Form submissions and email requests are answered within 2 to 4 hours with full menu breakdowns.' },
  { question: 'What details should I have ready for a quick quote?', answer: 'Occasion type, approximate headcount, event date, venue location, and dietary preference split (Veg/Non-Veg, Jain, Eggless). The more specific you are, the faster we shape your menu plan!' },
  { question: 'Can we book a menu tasting before finalizing?', answer: 'Absolutely! For weddings, grand celebrations, and major corporate contracts, we arrange live tasting sessions at our Vellore kitchen facility or deliver fresh tasting samples directly to your office.' },
  { question: 'Do you cater for small family functions or last-minute orders?', answer: 'Yes! We accommodate both small intimate housewarming meals (20+ guests) and large 5,000+ guest summits. For daily office orders, 24-hour advance notice is recommended, though urgent orders can be accommodated by direct call.' },
]

/* =====================================================================
   MAIN PAGE COMPONENT
===================================================================== */
export default function ContactPage() {
  const prefersReducedMotion = useReducedMotion()
  const [openFaq, setOpenFaq] = useState(0)

  const [form, setForm] = useState({ name: '', phone: '', occasion: occasionOptions[0].label, guests: '', message: '' })
  const [status, setStatus] = useState('idle')

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
    <div className="contact-page">
      <MouseGlowCursor />

      {/* Reading Progress Indicator */}
      <motion.div style={{ scaleX: progressBar }} className="progressBar" />

      {/* ================================================================
          1 — HERO
      ================================================================ */}
      <section ref={heroRef} className="hero">
        <div className="grain" />
        <div className="heroBgRadial" />
        <div className="heroGlowRed" />
        <div className="heroGlowSaffron" />

        <div className="heroInner">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.span
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="badge"
            >
              <RiSparklingLine />
              Direct Kitchen Concierge
            </motion.span>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="heroTitle"
            >
              Let's bring good food{' '}
              <span className="heroTitleGradient">to your table.</span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6 }}
              className="heroSubtitle"
            >
              Whether it's daily office lunches for 500 or a grand wedding feast for 3,000 —
              our kitchen is ready to plan, cook, and serve with care.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6 }}
              className="heroActions"
            >
              <MagneticButton>
                <a
                  href="https://wa.me/917305401704"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btnWhatsapp"
                >
                  <RiWhatsappLine />
                  Chat on WhatsApp
                </a>
              </MagneticButton>

              <MagneticButton>
                <a href="tel:+917305401704" className="btnCallOutline">
                  <FiPhone />
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
            className="heroVisual"
          >
            <div className="heroVisualInner">
              <div className="heroVisualGlow" />

              <div className="heroCard">
                <img
                  src={img('Services/FoodDelivery.png')}
                  alt="Qatind Catering Delivery"
                  className="heroImage"
                />

                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="liveBadge"
                >
                  <div className="liveBadgeLeft">
                    <div className="liveBadgeIcon">⚡</div>
                    <div>
                      <p className="liveBadgeEyebrow">Response Guarantee</p>
                      <p className="liveBadgeTitle">Under 15 Mins Reply</p>
                    </div>
                  </div>
                  <span className="liveDot" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          2 — QUICK METRICS STATS BAR
      ================================================================ */}
      <section className="statsSection">
        <div className="statsInner">
          <div className="statsGrid">
            {stats.map((st, i) => (
              <motion.div
                key={st.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`statCard statCard--${st.accent}`}
              >
                <div className="statIcon">
                  <st.icon />
                </div>
                <div>
                  <p className="statValue">{st.value}</p>
                  <p className="statLabel">{st.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          3 — CONTACT CHANNELS (BENTO GRID)
      ================================================================ */}
      <section className="channelsSection">
        <div className="channelsInner">
          <div className="sectionHeader">
            <p className="eyebrow">Fast & Direct Access</p>
            <h2 className="sectionTitle">Reach out however suits you best.</h2>
          </div>

          <div className="channelsGrid">
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
                className={`channelCard accent-${ch.accent}`}
              >
                <div>
                  <div className="channelTop">
                    <span className="channelIcon">
                      <ch.icon />
                    </span>
                    <span className="channelBadge">{ch.badge}</span>
                  </div>

                  <h3 className="channelTitle">{ch.label}</h3>
                  <p className="channelValue">{ch.value}</p>
                  <p className="channelSub">{ch.sub}</p>
                </div>

                <div className="channelFooter">
                  <span>Connect Now</span>
                  <RiArrowRightLine className="channelFooterArrow" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          4 — INTERACTIVE FORM + VISUAL INFO SHOWCASE PANEL
      ================================================================ */}
      <section className="formSection">
        <div className="formSectionInner">
          <div className="formSectionHeader">
            <p className="eyebrow">Instant Plan & Quote</p>
            <h2 className="formSectionTitle">Tell us about your event. We'll craft the menu.</h2>
          </div>

          <div className="formLayout">
            {/* Interactive Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit}
              className="form"
            >
              <div>
                <h3 className="formTitle">
                  <LuChefHat /> Catering Requirements Form
                </h3>

                <div className="fieldGrid">
                  <label className="fieldLabel">
                    <span className="fieldCaption">Your Name *</span>
                    <input
                      required
                      value={form.name}
                      onChange={handleChange('name')}
                      placeholder="e.g. Aravind Kumar"
                      className="field"
                    />
                  </label>
                  <label className="fieldLabel">
                    <span className="fieldCaption">Phone Number *</span>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      placeholder="+91 XXXXX XXXXX"
                      className="field"
                    />
                  </label>
                </div>

                {/* Occasion Selection Chips */}
                <div className="occasionBlock">
                  <span className="fieldCaption">Select Occasion Type *</span>
                  <div className="occasionChips">
                    {occasionOptions.slice(0, 4).map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, occasion: o.label }))}
                        className={`chip ${form.occasion === o.label ? 'chipActive' : ''}`}
                      >
                        <o.icon />
                        <span>{o.label.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="fieldGrid formRowSpaced">
                  <label className="fieldLabel">
                    <span className="fieldCaption">Occasion Category</span>
                    <select value={form.occasion} onChange={handleChange('occasion')} className="field">
                      {occasionOptions.map((o) => <option key={o.id} value={o.label}>{o.label}</option>)}
                    </select>
                  </label>

                  <label className="fieldLabel">
                    <span className="fieldCaption">Estimated Guests</span>
                    <input
                      type="number"
                      min="1"
                      value={form.guests}
                      onChange={handleChange('guests')}
                      placeholder="e.g. 150 Guests"
                      className="field"
                    />
                  </label>
                </div>

                <label className="fieldLabel formRowSpaced">
                  <span className="fieldCaption">Dietary Notes & Event Date</span>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={handleChange('message')}
                    placeholder="Event date, venue location, Veg/Non-Veg ratio, Jain or low-oil requests..."
                    className="field textarea"
                  />
                </label>
              </div>

              <div className="formSubmitRow">
                <MagneticButton>
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.97 }}
                    disabled={status === 'sending'}
                    className="submitBtn"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {status === 'sent' ? (
                        <motion.span key="sent" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="submitBtnInner">
                          <RiCheckLine /> Opened WhatsApp Chat
                        </motion.span>
                      ) : (
                        <motion.span key="send" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="submitBtnInner">
                          {status === 'sending' ? 'Opening WhatsApp…' : 'Send Enquiry via WhatsApp'}
                          <RiSendPlaneFill />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </MagneticButton>
                <p className="submitNote">
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
              className="infoPanel"
            >
              <div className="infoPanelGlowSaffron" />
              <div className="infoPanelGlowRed" />

              <div className="infoPanelBody">
                <span className="infoBadge">
                  <BsShieldCheck /> FSSAI Certified Master Kitchen
                </span>

                <h3 className="infoTitle">Kitchen Hours & Support</h3>
                <div className="hoursList">
                  {officeHours.map((h) => (
                    <div key={h.day} className="hoursRow">
                      <span className="hoursDay">
                        <RiTimeLine /> {h.day}
                      </span>
                      <span className="hoursTime">{h.time}</span>
                    </div>
                  ))}
                </div>

                <h3 className="infoTitle">Kitchen & Office Address</h3>
                <p className="addressText">
                  <RiMapPin2Line />
                  Qatind Enterprises, Main Road, Vellore, Tamil Nadu — Tastings available by appointment.
                </p>

                <div className="infoImageWrap">
                  <img
                    src={img('Contact/officekitchen.jpg')}
                    alt="Qatind Office & Kitchen"
                    className="infoImage"
                  />
                </div>
              </div>

              <div className="socialRow">
                <span className="socialLabel">Follow Qatind</span>
                <div className="socialIcons">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="socialIcon"
                  >
                    <RiInstagramLine />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="socialIcon"
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
          5 — OCCASION SHOWCASE GALLERY CARDS
      ================================================================ */}
      <section className="showcaseSection">
        <div className="showcaseInner">
          <div className="sectionHeader">
            <p className="eyebrow">What We Cater</p>
            <h2 className="sectionTitle">Food created for every scale & style.</h2>
          </div>

          <div className="showcaseGrid">
            {showcaseCards.map((sc, i) => (
              <motion.div
                key={sc.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="showcaseCard"
              >
                <div className="showcaseImageWrap">
                  <img src={sc.img} alt={sc.title} className="showcaseImage" />
                  <div className="showcaseOverlay" />
                  <span className={`showcaseTag showcaseTag--${sc.accent}`}>
                    {sc.tag}
                  </span>
                </div>
                <div className="showcaseBody">
                  <h3 className="showcaseTitle">{sc.title}</h3>
                  <p className="showcaseDesc">Customized menus, live counters & full event service.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          6 — FAQ ACCORDION
      ================================================================ */}
      <section className="faqSection">
        <div className="faqInner">
          <div>
            <p className="eyebrow">Questions Answered</p>
            <h2 className="faqTitle">Frequently asked catering questions.</h2>
            <p className="faqDesc">
              Have a custom request or dietary requirement? Call our kitchen team directly.
            </p>
            <MagneticButton>
              <a href="tel:+917305401704" className="faqPhoneLink">
                <FiPhone /> +91 73054 01704
              </a>
            </MagneticButton>
          </div>

          <div className="faqList">
            {faqs.map((item, index) => {
              const isOpen = openFaq === index
              return (
                <div key={item.question} className="faqItem">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="faqButton"
                  >
                    <span>{item.question}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="faqIcon">
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
                        className="faqAnswerWrap"
                      >
                        <p className="faqAnswer">{item.answer}</p>
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
          7 — FINAL CTA BANNER
      ================================================================ */}
      <section className="ctaSection">
        <div className="ctaTopBar" />
        <div className="ctaGlowSaffron" />
        <div className="ctaGlowRed" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="ctaInner"
        >
          <p className="ctaEyebrow">Ready to get started?</p>
          <h2 className="ctaTitle">A 5-minute conversation sets your menu in motion.</h2>
          <p className="ctaDesc">
            No commitment, no stress — let's plan delicious food for your guests.
          </p>
          <div className="ctaActions">
            <MagneticButton>
              <a href="tel:+917305401704" className="btnCtaPrimary">
                Call Qatind Kitchen
                <RiArrowRightLine />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://wa.me/917305401704"
                target="_blank"
                rel="noopener noreferrer"
                className="btnCtaOutline"
              >
                <RiWhatsappLine /> WhatsApp Instant Quote
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </section>
    </div>
  )
}