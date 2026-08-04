import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import FoodCard from '../components/cards/FoodCard'
import heroData from '../data/hero.json'
import featuresData from '../data/features.json'
import testimonialsData from '../data/testimonials.json'
import faqData from '../data/faq.json'
import menuData from '../data/menu.json'
import '../components/styles/Home.scss'

export default function Home() {
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
        <div className="container">
          <motion.div
            className="hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero__title">{heroData.title}</h1>
            <p className="hero__subtitle">{heroData.subtitle}</p>
            <Link to={heroData.ctaLink} className="hero__cta">
              {heroData.cta}
            </Link>
          </motion.div>
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
                  <div className="feature-card__icon-bg" />
                </div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__description">{feature.description}</p>
              </motion.div>
            ))}
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
      <section className="testimonials">
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
      </section>

      {/* FAQ Section */}
      <section className="faq">
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
      </section>

      {/* CTA Section */}
      <section className="cta">
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
