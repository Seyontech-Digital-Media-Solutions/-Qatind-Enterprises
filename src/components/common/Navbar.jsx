import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi'
import '../styles/Navbar.scss'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navLinks = [
    { path: '/', label: 'Home' },
   
  ]

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          Qatind
        </Link>

        <div className={`navbar__menu ${isOpen ? 'navbar__menu--active' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className="navbar__link"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button className="navbar__cta">
            <FiShoppingCart className="navbar__icon" />
            Cart
          </button>
        </div>

        <button className="navbar__toggle" onClick={toggleMenu}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
    </nav>
  )
}
