import { motion } from 'framer-motion'
import { FiFacebook, FiInstagram, FiTwitter, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import siteData from '../../data/site.json'
import qatindLogo from '../../assets/qatind-logo.png'

import footerBanner from '../../assets/main-footer.png'

import '../styles/Footer.scss'

const quickLinks = [
  { path: '/', label: 'Home'},
  { path: '/services', label: 'Services'},
  { path: '/menu', label: 'Menu'},
  { path: '/daily-menu', label: 'Daily Menu'},
  { path: '/gallery', label: 'Gallery'},
  { path: '/bakery', label: 'Bakery'},
]

const socialLinks = [
  { href: siteData.socialMedia.facebook, Icon: FiFacebook },
  { href: siteData.socialMedia.instagram, Icon: FiInstagram },
  { href: siteData.socialMedia.twitter, Icon: FiTwitter },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const socialVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -90 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 16 } }
}

function Heading({ children }) {
  return (
    <h4 className="footer__heading">
      {children}
      <motion.span
        className="footer__heading-underline"
        initial={{ width: 0 }}
        whileInView={{ width: 36 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      />
    </h4>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      {/* Banner background */}
      <div
        className="footer__banner"
        style={{ backgroundImage: `url(${footerBanner})` }}
      />
      {/* Dark overlay for text readability */}
      <div className="footer__overlay" />

      <div className="footer__content">
        <div className="container">
          <motion.div
            className="row footer__row"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div className="col-md-3 footer__section" variants={itemVariants}>
              <img
                src={qatindLogo}
                alt={siteData.siteName}
                className="footer__logo"
              />
              <p className="footer__description">{siteData.description}</p>
              <div className="footer__social">
                {socialLinks.map(({ href, Icon }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    className="footer__social-link"
                    variants={socialVariants}
                    whileHover={{ scale: 1.2, rotate: 8, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div className="col-md-3 footer__section" variants={itemVariants}>
              <Heading>Quick Links</Heading>
              <ul className="footer__links">
                {quickLinks.map(link => (
                  <motion.li key={link.path} whileHover={{ x: 4 }}>
                    <a href={link.path}>{link.label}</a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div className="col-md-3 footer__section" variants={itemVariants}>
              <Heading>Opening Hours</Heading>
              <p><strong>Weekdays:</strong> {siteData.hours.weekdays}</p>
              <p><strong>Weekends:</strong> {siteData.hours.weekends}</p>
            </motion.div>

            <motion.div className="col-md-3 footer__section" variants={itemVariants}>
              <Heading>Contact</Heading>
              <div className="footer__contact">
                <motion.div className="footer__contact-item" whileHover={{ x: 4 }}>
                  <FiPhone size={18} />
                  <a href={`tel:${siteData.phone}`}>{siteData.phone}</a>
                </motion.div>
                <motion.div className="footer__contact-item" whileHover={{ x: 4 }}>
                  <FiMail size={18} />
                  <a href={`mailto:${siteData.email}`}>{siteData.email}</a>
                </motion.div>
                <motion.div className="footer__contact-item" whileHover={{ x: 4 }}>
                  <FiMapPin size={18} />
                  <span>{siteData.address}</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="footer__bottom"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <p>&copy; 2026 {siteData.siteName}. All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
  )
}