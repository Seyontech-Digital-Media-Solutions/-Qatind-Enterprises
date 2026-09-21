import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import FoodCard from '../components/cards/FoodCard'
import heroData from '../data/hero.json'
import featuresData from '../data/features.json'
import testimonialsData from '../data/testimonials.json'
import faqData from '../data/faq.json'
import menuData from '../data/menu.json'
import mainImg from '../assets/main-img.png'
import img1 from '../assets/img-1.jpeg'
import img2 from '../assets/img-2.jpeg'
import img3 from '../assets/img-snac.jpeg'
import '../components/styles/Home.scss'
import sectionImg from '../assets/imge-ab.png'
import ctaImg from '../assets/img-cta.png'

// Auto-maps every file in src/assets/features/ by filename.
// To use real icons/photos later: drop a file into src/assets/features/ with
// the SAME filename referenced in features.json — no component changes needed.
const featureImages = import.meta.glob('../assets/features/*.{jpg,jpeg,png}', { eager: true })

function getFeatureImage(filename) {
  const match = Object.entries(featureImages).find(([path]) => path.endsWith(`/${filename}`))
  return match ? match[1].default : undefined
}

export default function Home() {
  const [introImageFailed, setIntroImageFailed] = useState(false)

  const introPoints = [
    'Great food that brings people together.',
    'Hygienically prepared and consistently high-quality meals.',
    'Professional service for every dining experience.',
    'Perfect for corporate events, institutions, celebrations, and everyday meals.'
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  // Get first item from each category
  const featuredItems = menuData.categories.slice(0, 3).map(cat => cat.items[0])

  return (
    <div className="home">
      {/* Hero Section */}
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

              <img
                className="hero__main-img"
                src={mainImg}
                alt="Signature dish"
              />

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




      {/* Features Grid */}
      <section className="features">
        <div className="container">
          <h2 className="section__title">Why Choose Qatind?</h2>
          <motion.div
            className="features__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {featuresData.features.map(feature => (
              <motion.div
                key={feature.id}
                className="feature-card"
                variants={itemVariants}
              >
                <div className="feature-card__icon">
                  <div className="feature-card__icon-bg">
                    <img
                      src={getFeatureImage(feature.image)}
                      alt={feature.title}
                      className="feature-card__icon-img"
                    />
                  </div>
                </div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__description">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>




      
       {/* Intro Section */}
      <section className="intro">
        <div className="container">
          <motion.div
            className="intro__grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            <motion.div className="intro__visual" variants={itemVariants}>
              <motion.span
                className="intro__glow"
                animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="intro__steam">
                <motion.span
                  className="intro__steam-wisp intro__steam-wisp--1"
                  animate={{ y: [0, -18, 0], opacity: [0, 0.7, 0] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.span
                  className="intro__steam-wisp intro__steam-wisp--2"
                  animate={{ y: [0, -22, 0], opacity: [0, 0.6, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                />
                <motion.span
                  className="intro__steam-wisp intro__steam-wisp--3"
                  animate={{ y: [0, -16, 0], opacity: [0, 0.7, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
                />
              </div>

              <motion.span
                className="intro__spice intro__spice--1"
                animate={{ y: [0, -14, 0], x: [0, 6, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.span
                className="intro__spice intro__spice--2"
                animate={{ y: [0, 14, 0], x: [0, -6, 0], rotate: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              />
              <motion.span
                className="intro__spice intro__spice--3"
                animate={{ y: [0, -10, 0], x: [0, -8, 0], rotate: [0, 20, 0] }}
                transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              />
              <motion.span
                className="intro__spice intro__spice--4"
                animate={{ y: [0, 12, 0], x: [0, 8, 0], rotate: [0, -18, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              />

              <motion.div
                className="intro__image-wrap"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                {!introImageFailed && (
                  <motion.img
                    src={sectionImg}
                    alt="Qatind dining experience"
                    className="intro__image"
                    onError={() => setIntroImageFailed(true)}
                    whileHover={{ scale: 1.04, rotate: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                )}
                {introImageFailed && (
                  <div className="intro__placeholder">
                    <span>Upload final image here</span>
                  </div>
                )}
              </motion.div>
            </motion.div>

            <motion.div className="intro__content" variants={itemVariants}>
              <span className="intro__eyebrow">Dishes</span>
              <h2 className="intro__title">More Than Food. We Create Experiences.</h2>
              <p className="intro__text">
                At Qatind Restaurant, we believe great food has the power to bring people together.
                Our focus is on delivering delicious, hygienically prepared and consistently high-quality food
                supported by professional service. Whether you are planning a corporate event, managing an
                institution, organising a celebration or simply looking for a satisfying meal, our team is
                committed to making every dining experience enjoyable and hassle-free.
              </p>

              <div className="intro__points">
                {introPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    className="intro__point"
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="intro__point-dot" />
                    <p>{point}</p>
                  </motion.div>
                ))}
              </div>

              <div className="intro__actions">
                <Link to="/menu" className="intro__button intro__button--primary">
                  Explore Menu
                </Link>
                <Link to="/contact" className="intro__button intro__button--outline">
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Items */}
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

      {/* Testimonials */}
      {/* <section className="testimonials">
        <div className="container">
          <h2 className="section__title">What Our Customers Say</h2>
          <motion.div
            className="testimonials__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {testimonialsData.testimonials.map(testimonial => (
              <motion.div
                key={testimonial.id}
                className="testimonial-card"
                variants={itemVariants}
              >
                <div className="testimonial-card__stars">
                  {'⭐'.repeat(testimonial.rating)}
                </div>
                <p className="testimonial-card__text">{testimonial.text}</p>
                <div className="testimonial-card__author">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* FAQ Section */}
      {/* <section className="faq">
        <div className="container">
          <h2 className="section__title">Frequently Asked Questions</h2>
          <motion.div
            className="faq__list"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {faqData.faqs.slice(0, 4).map((faq, index) => (
              <motion.details
                key={faq.id}
                className="faq__item"
                variants={itemVariants}
              >
                <summary className="faq__question">
                  {faq.question}
                </summary>
                <p className="faq__answer">{faq.answer}</p>
              </motion.details>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section
        className="cta"
        style={{ backgroundImage: `url(${ctaImg})` }}
      >
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