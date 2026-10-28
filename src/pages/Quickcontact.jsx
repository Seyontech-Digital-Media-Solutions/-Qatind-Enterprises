import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa'
import contact from '../data/contact.json'
import '../components/styles/QuickContact.scss'

const whatsappLink = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
  contact.whatsappMessage
)}`
const callLink = `tel:${contact.phone}`

// Small floating buttons, mounted once in your layout (App.jsx) so they
// appear on every page.
export default function QuickContact() {
  return (
    <div className="quick-contact" aria-label="Quick contact">
      <a
        className="quick-contact__btn quick-contact__btn--whatsapp"
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp />
      </a>
      <a className="quick-contact__btn quick-contact__btn--call" href={callLink} aria-label="Call us">
        <FaPhoneAlt />
      </a>
    </div>
  )
}

// Labelled version for the phone menu (hamburger drawer). Drop it at the
// bottom of the mobile nav list:
//   <QuickContactLinks onNavigate={() => setMenuOpen(false)} />
export function QuickContactLinks({ onNavigate }) {
  return (
    <div className="quick-contact-links">
      <a
        className="quick-contact-links__item quick-contact-links__item--whatsapp"
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
      >
        <FaWhatsapp /> WhatsApp
      </a>
      <a
        className="quick-contact-links__item quick-contact-links__item--call"
        href={callLink}
        onClick={onNavigate}
      >
        <FaPhoneAlt /> Call us
      </a>
    </div>
  )
}