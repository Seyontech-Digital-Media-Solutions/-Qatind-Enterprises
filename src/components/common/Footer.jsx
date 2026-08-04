import { FiFacebook, FiInstagram, FiTwitter, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import siteData from '../../data/site.json'
import '../styles/Footer.scss'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="container">
          <div className="row">
            <div className="col-md-3 footer__section">
              <h3 className="footer__title">{siteData.siteName}</h3>
              <p className="footer__description">{siteData.description}</p>
              <div className="footer__social">
                <a href={siteData.socialMedia.facebook} className="footer__social-link">
                  <FiFacebook size={20} />
                </a>
                <a href={siteData.socialMedia.instagram} className="footer__social-link">
                  <FiInstagram size={20} />
                </a>
                <a href={siteData.socialMedia.twitter} className="footer__social-link">
                  <FiTwitter size={20} />
                </a>
              </div>
            </div>

            <div className="col-md-3 footer__section">
              <h4 className="footer__heading">Quick Links</h4>
              <ul className="footer__links">
                <li><a href="/">Home</a></li>
              </ul>
            </div>

            <div className="col-md-3 footer__section">
              <h4 className="footer__heading">Hours</h4>
              <p><strong>Weekdays:</strong> {siteData.hours.weekdays}</p>
              <p><strong>Weekends:</strong> {siteData.hours.weekends}</p>
            </div>

            <div className="col-md-3 footer__section">
              <h4 className="footer__heading">Contact</h4>
              <div className="footer__contact">
                <div className="footer__contact-item">
                  <FiPhone size={18} />
                  <a href={`tel:${siteData.phone}`}>{siteData.phone}</a>
                </div>
                <div className="footer__contact-item">
                  <FiMail size={18} />
                  <a href={`mailto:${siteData.email}`}>{siteData.email}</a>
                </div>
                <div className="footer__contact-item">
                  <FiMapPin size={18} />
                  <span>{siteData.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>&copy; 2024 {siteData.siteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
