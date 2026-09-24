import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FaLeaf,
  FaUtensils,
  FaSeedling,
  FaShieldAlt,
  FaTruck,
  FaHeart,
  FaFire,
  FaAward,
  FaBoxOpen,
  FaBirthdayCake,
  FaBriefcase,
  FaRing,
  FaGraduationCap,
  FaHome,
  FaUsers,
  FaArrowRight
} from 'react-icons/fa'
import FoodCard from '../components/cards/FoodCard'
// import TestimonialCarousel from '../components/TestimonialCarousel'
import heroData from '../data/hero.json'
import menuData from '../data/menu.json'
import mainImg from '../assets/main-img.png'
import img1 from '../assets/img-1.jpeg'
import img2 from '../assets/img-2.jpeg'
import img3 from '../assets/img-snac.jpeg'
import sectionImg from '../assets/imge-ab.png'
import ctaImg from '../assets/img-cta.png'
import '../components/styles/Home.scss'
import fresh from '../assets/fresh.jpg'
import cook from '../assets/cook.jpg'
import quality from '../assets/quality.jpg'
import packing from '../assets/packing.jpg'
import delivery from '../assets/delivery.jpg'
import catering from '../assets/catering.jpg'

// ---------------------------------------------------------------------
// Static content for the new sections. Swap these for real data/JSON
// whenever it's ready — shapes are kept flat and simple on purpose.
// ---------------------------------------------------------------------
const reasons = [
  { icon: <FaUtensils />, title: 'Home-Style Taste', text: 'Traditional recipes with a personal touch.', tint: 'saffron' },
  { icon: <FaSeedling />, title: 'Quality Ingredients', text: 'Only the best, no compromise.', tint: 'green' },
  { icon: <FaShieldAlt />, title: 'Hygienic Preparation', text: 'Clean kitchen, safe food.', tint: 'red' },
  { icon: <FaTruck />, title: 'On-Time Delivery', text: 'Because your time matters.', tint: 'blue' },
  { icon: <FaHeart />, title: 'Made With Care', text: 'Every meal cooked with love.', tint: 'saffron' }
]

// Each step doubles as the caption for the photo strip below it — swap
// `img` for real kitchen-process photography whenever it's available.
const processSteps = [
  { icon: <FaLeaf />, title: 'Fresh Ingredients', img: fresh },
  { icon: <FaFire />, title: 'Cooking with Care', img: cook },
  { icon: <FaAward />, title: 'Quality Check', img: quality },
  { icon: <FaBoxOpen />, title: 'Packing with Hygiene', img: packing },
  { icon: <FaTruck />, title: 'On-time Delivery', img: delivery }
]

const occasions = [
  { icon: <FaBirthdayCake />, title: 'Birthday Parties', text: 'Make it special' },
  { icon: <FaBriefcase />, title: 'Corporate Events', text: 'Impress your team' },
  { icon: <FaRing />, title: 'Weddings & Engagements', text: 'For your big day' },
  { icon: <FaHome />, title: 'House Functions', text: 'Family, food, happiness' },
  { icon: <FaGraduationCap />, title: 'School / College Events', text: 'Fuel young minds' },
  { icon: <FaUsers />, title: 'Get-Togethers', text: 'Good food, great company' }
]

// `tint` cycles through the same palette used by the reason cards so the
// testimonial carousel reads as one consistent design system.
// const testimonials = [
//   { id: 1, name: 'Ananya R.', role: 'Corporate Client', rating: 5, text: 'Qatind catered our office anniversary and every plate came back empty. Genuinely home-style food.', tint: 'saffron' },
//   { id: 2, name: 'Vikram S.', role: 'Wedding Host', rating: 5, text: 'From tasting to the big day, the team was on time and the food tasted like it was made with love.', tint: 'green' },
//   { id: 3, name: 'Priya M.', role: 'Regular Customer', rating: 4, text: 'Order weekly for the family — consistently fresh and hygienically packed.', tint: 'red' },
//   { id: 4, name: 'Rahul K.', role: 'College Fest Organiser', rating: 5, text: 'Fed 300 students on time without a single complaint. Will book again.', tint: 'blue' },
//   { id: 5, name: 'Deepa N.', role: 'Birthday Host', rating: 5, text: 'The snacks were the highlight of the party. Everyone asked where we ordered from.', tint: 'saffron' }
// ]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const reasonVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
}

export default function Home() {
  const [whyImgFailed, setWhyImgFailed] = useState(false)

  // Get first item from each category
  const featuredItems = menuData.categories.slice(0, 3).map(cat => cat.items[0])

  return (
    <div className="home">
      {/* Reusable organic blob mask for the "Why Qatind" photo — exact
          irregular freeform shape (not an ellipse/border-radius fake),
          defined once and referenced via clip-path: url(#whyQatindBlob) */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <clipPath id="whyQatindBlob" clipPathUnits="objectBoundingBox">
            <path d="M0.25,0.04 C0.42,-0.03 0.66,0.00 0.78,0.13
                     C0.90,0.25 0.97,0.37 0.92,0.53
                     C0.87,0.68 0.98,0.79 0.81,0.88
                     C0.64,0.97 0.43,1.00 0.27,0.92
                     C0.11,0.84 0.01,0.75 0.04,0.59
                     C0.07,0.43 -0.02,0.31 0.07,0.19
                     C0.14,0.10 0.18,0.08 0.25,0.04 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Hero Section — unchanged */}
      <section className="hero">
        <span className="hero__shape hero__shape--1" />
        <span className="hero__shape hero__shape--2" />

        <div className="container">
          <div className="hero__grid">
            <motion.div
              className="hero__content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="hero__eyebrow">Welcome to Qatind</span>
              <h1 className="hero__title">{heroData.title}</h1>
              <p className="hero__subtitle">{heroData.subtitle}</p>
              <div className="hero__actions">
                <Link to={heroData.ctaLink} className="hero__cta hero__cta--primary">
                  {heroData.cta}
                </Link>
                <Link to="/about" className="hero__cta hero__cta--outline">
                  About Us
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="hero__visual"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <motion.span
                className="hero__ring"
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              />
              <div className="hero__blob" />

              <img className="hero__main-img" src={mainImg} alt="Signature dish" />

              <motion.img
                className="hero__float hero__float--1"
                src={img1}
                alt="Featured dish"
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.img
                className="hero__float hero__float--2"
                src={img2}
                alt="Featured dish"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              />
              <motion.img
                className="hero__float hero__float--3"
                src={img3}
                alt="Featured snack"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Qatind? */}
      <section className="why-qatind">
        <FaLeaf className="why-qatind__leaf why-qatind__leaf--tl" aria-hidden="true" />
        <FaLeaf className="why-qatind__leaf why-qatind__leaf--tr" aria-hidden="true" />

        <div className="container">
          <div className="why-qatind__top">
            <motion.div
              className="why-qatind__copy"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="why-qatind__eyebrow">
                <FaLeaf /> Why Qatind?
              </span>
              <h2 className="why-qatind__title">
                More Than Food,
                <span className="why-qatind__title-script">We Create Happiness.</span>
              </h2>
              <p className="why-qatind__text">
                At Qatind, we believe food is not just about filling your stomach,
                it's about creating moments of joy, comfort and togetherness.
                We bring you homemade food, made with love, just like your home.
              </p>
              <Link to="/about" className="why-qatind__link">
                Learn More <FaArrowRight />
              </Link>
            </motion.div>

            <motion.div
              className="why-qatind__visual"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <span className="why-qatind__made">
                <FaHeart /> Made with Love
              </span>

              {/* Thin curved accent strokes flanking the blob photo */}
              <svg className="why-qatind__accent why-qatind__accent--1" viewBox="0 0 60 40" aria-hidden="true">
                <path d="M4 36C10 10 30 6 54 4" />
              </svg>
              <svg className="why-qatind__accent why-qatind__accent--2" viewBox="0 0 60 40" aria-hidden="true">
                <path d="M56 4C50 30 30 34 6 36" />
              </svg>

              {!whyImgFailed ? (
                <img
                  src={sectionImg}
                  alt="Qatind chef preparing a meal"
                  className="why-qatind__img"
                  onError={() => setWhyImgFailed(true)}
                />
              ) : (
                <div className="why-qatind__placeholder">Upload image</div>
              )}
            </motion.div>
          </div>

          <motion.div
            className="why-qatind__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {reasons.map(reason => (
              <motion.div
                key={reason.title}
                className={`reason-card reason-card--${reason.tint}`}
                variants={reasonVariants}
              >
                <span className="reason-card__icon">{reason.icon}</span>
                <h3 className="reason-card__title">{reason.title}</h3>
                <p className="reason-card__text">{reason.text}</p>
                <span className="reason-card__underline" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <svg className="why-qatind__wave" viewBox="0 0 1440 110" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,40 C240,100 480,0 720,40 C960,80 1200,10 1440,50 L1440,110 L0,110 Z" />
        </svg>
      </section>

      {/* What Makes Our Food Different? */}
      <section className="process">
        <div className="container">
          <div className="process__header">
            <motion.div
              className="process__copy"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="process__eyebrow">
                <FaLeaf /> Our Kitchen Journey
              </span>
              <h2 className="process__title">
                What Makes Our<br />
                <span>Food Different?</span>
              </h2>
              <p className="process__text">
                From farm-fresh ingredients to your doorstep, every step is
                filled with care, tradition and love.
              </p>
              <Link to="/about" className="process__link">
                Our Process <FaArrowRight />
              </Link>
            </motion.div>


            {/* Pyramid: 3 icons wrap to a first row, the remaining 2
                center themselves on the row below (see Home.scss). */}
            <motion.div
              className="process__steps"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              {processSteps.map((step, index) => (
                <motion.div className="process__step" key={step.title} variants={itemVariants}>
                  <span className="process__step-badge">
                    <span className="process__step-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="process__step-icon">{step.icon}</span>
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="process__gallery"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {processSteps.map(step => (
              <motion.div className="process__photo" key={step.title} variants={itemVariants}>
                <img src={step.img} alt={step.title} />
                <span className="process__photo-caption">
                  {step.icon}
                  {step.title}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <svg className="process__corner" viewBox="0 0 260 260" preserveAspectRatio="none" aria-hidden="true">
          <path d="M260,260 L260,90 C170,110 100,180 80,260 Z" />
        </svg>
      </section>

      {/* Signature Dishes — unchanged */}
      <section className="featured">
        <div className="container">
          <h2 className="section__title">Featured Dishes</h2>
          <motion.div
            className="featured__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {featuredItems.map(item => (
              <motion.div key={item.id} variants={itemVariants}>
                <FoodCard item={item} />
              </motion.div>
            ))}
          </motion.div>
          <div className="featured__footer">
            <Link to="/menu" className="featured__link">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Catering */}
      <section className="catering">
        <div className="container">
          <div className="catering__grid">
            <motion.div
              className="catering__visual"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <span className="catering__dashed" aria-hidden="true" />
              <img src={catering} alt="Catering spread" className="catering__img" />
              <span className="catering__tag">Fresh, Hygienic &amp; Tasty</span>
            </motion.div>

            <motion.div
              className="catering__content"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            >
              <span className="catering__eyebrow">Let Us Cater Your Special Moments</span>
              <h2 className="catering__title">Catering</h2>
              <p className="catering__subtitle">Delicious food for every occasion</p>
              <p className="catering__text">
                From birthdays to corporate events, we bring the homemade
                goodness to your celebrations.
              </p>

              <ul className="catering__list">
                {occasions.map(item => (
                  <li className="catering__item" key={item.title}>
                    <span className="catering__item-icon">{item.icon}</span>
                    <span>
                      <strong>{item.title}</strong>
                      <em>{item.text}</em>
                    </span>
                  </li>
                ))}
              </ul>

              <Link to="/contact" className="catering__cta">
                Get Catering Quote <FaArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>

        <svg className="catering__corner" viewBox="0 0 260 260" preserveAspectRatio="none" aria-hidden="true">
          <path d="M260,260 L260,90 C170,110 100,180 80,260 Z" />
        </svg>
      </section>

      {/* Reviews / Testimonials — two-column carousel (no marquee, no
          boxed cards): swipe/click through paired testimonials, sliding
          horizontally with arrow + dot navigation. */}
      {/* <section className="reviews">
        <div className="container">
          <h2 className="section__title">What Our Customers Say</h2>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section> */}


      {/* CTA Section — unchanged */}
      <section className="cta" style={{ backgroundImage: `url(${ctaImg})` }}>
        <div className="container">
          <motion.div
            className="cta__content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Taste Excellence?</h2>
            <p>Order now and experience premium food delivered fast</p>
            <Link to="/menu" className="cta__button">
              Order Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}