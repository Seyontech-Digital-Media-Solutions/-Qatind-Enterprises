import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX, FiShoppingCart, FiChevronDown } from 'react-icons/fi'
import qatindIcon from "../../assets/qatind-logo.png";
import '../styles/Navbar.scss'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeAll = () => {
    setIsOpen(false)
    setMenuDropdownOpen(false)
  }

  const navLinks = [
    { path: '/', label: 'Home' },
    // { path: '/about', label: 'About Us' },
   

    {
      label: 'Menu',
      dropdown: [
        { path: '/menu', label: 'Full Menu' },
        { path: '/daily-menu', label: 'Weekly Menu' }
      ]
    },
     { path: '/ServicesPage', label: 'Services' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/bakery', label: 'Bakery' },
    { path: '/ContactPage', label: 'Contact' }
  ]

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo" onClick={closeAll}>
          <img src={qatindIcon} alt="Qatind" className="navbar__logo-icon" />
          Qatind Enterprises
        </Link>

        <div className={`navbar__menu ${isOpen ? 'navbar__menu--active' : ''}`}>
          {navLinks.map(link =>
            link.dropdown ? (
              <div
                key={link.label}
                className={`navbar__dropdown ${menuDropdownOpen ? 'navbar__dropdown--open' : ''}`}
                onMouseEnter={() => setMenuDropdownOpen(true)}
                onMouseLeave={() => setMenuDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="navbar__link navbar__link--dropdown-toggle"
                  onClick={() => setMenuDropdownOpen(prev => !prev)}
                >
                  {link.label}
                  <FiChevronDown className="navbar__dropdown-arrow" />
                </button>

                <div className="navbar__dropdown-panel">
                  {link.dropdown.map(sub => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      className="navbar__dropdown-link"
                      onClick={closeAll}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className="navbar__link"
                onClick={closeAll}
              >
                {link.label}
              </Link>
            )
          )}
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