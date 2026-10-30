import { motion } from 'framer-motion'
import TestimonialCarousel from '../../pages/Testimonial'
import testimonialsData from '../../data/testimonials.json'
import partnersData from '../../data/partners.json'
import mainImg from '../../assets/main-img.png'
import img1 from '../../assets/img-1.jpeg'
import img2 from '../../assets/img-2.jpeg'
import img3 from '../../assets/img-snac.jpeg'
import fresh from '../../assets/fresh.jpg'
import cook from '../../assets/cook.jpg'
import quality from '../../assets/quality.jpg'
import '../styles/SocialProof.scss'

// Food photos used as avatars, matched to testimonials.json by order.
const testimonialImages = [mainImg, img1, img2, img3, fresh, cook, quality]

const { partners } = partnersData

// Customer reviews (swipeable) + optional client logos.
//   <SocialProof />                      -> reviews + logos (Home page)
//   <SocialProof showPartners={false} /> -> reviews only (About page)
export default function SocialProof({ showPartners = true }) {
  return (
    <section className="social-proof">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2 className="social-proof__title">What Our Customers Say</h2>
          <p className="social-proof__subtitle">
            Real words from the people who order from Qatind.
          </p>
        </motion.div>
      </div>

      <TestimonialCarousel
        testimonials={testimonialsData.testimonials}
        images={testimonialImages}
      />

      {showPartners && (
        <div className="container social-proof__partners">
          <h3 className="social-proof__partners-title">Trusted by teams at</h3>
          <ul className="social-proof__logos">
            {partners.map(partner => (
              <li className="social-proof__logo" key={partner.name}>
                <img
                  src={`${import.meta.env.BASE_URL}About/${partner.logo}`}
                  alt={partner.name}
                  loading="lazy"
                  style={partner.scale ? { '--logo-scale': partner.scale } : undefined}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}