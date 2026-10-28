import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaLeaf, FaFire, FaAward, FaBoxOpen, FaTruck, FaArrowRight } from 'react-icons/fa'
import fresh from '../assets/fresh.jpg'
import cook from '../assets/cook.jpg'
import quality from '../assets/quality.jpg'
import packing from '../assets/packing.jpg'
import delivery from '../assets/delivery.jpg'
import './styles/KitchenJourney.scss'

const processSteps = [
  { icon: <FaLeaf />, title: 'Fresh Ingredients', img: fresh },
  { icon: <FaFire />, title: 'Cooking with Care', img: cook },
  { icon: <FaAward />, title: 'Quality Check', img: quality },
  { icon: <FaBoxOpen />, title: 'Packing with Hygiene', img: packing },
  { icon: <FaTruck />, title: 'On-time Delivery', img: delivery }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

// "What Makes Our Food Different?" - 5 labelled steps + photo strip.
// Used on the Home page (with the "Our Process" link) and the About
// page (pass showLink={false}, since you're already there).
export default function KitchenJourney({ showLink = true }) {
  return (
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
            {showLink && (
              <Link to="/about" className="process__link">
                Our Process <FaArrowRight />
              </Link>
            )}
          </motion.div>

          <motion.ol
            className="process__steps"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {processSteps.map((step, index) => (
              <motion.li className="process__step" key={step.title} variants={itemVariants}>
                <span className="process__step-badge">
                  <span className="process__step-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="process__step-icon">{step.icon}</span>
                </span>
                <span className="process__step-label">{step.title}</span>
              </motion.li>
            ))}
          </motion.ol>
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
  )
}