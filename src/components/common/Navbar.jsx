import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import qatindIcon from "../../assets/qatind-logo.png"
import '../styles/Navbar.scss'

const navLinks = [
  { path: '/',            label: 'Home'},
  { path: '/about',       label: 'About' },
  { path: '/ServicesPage',label: 'Services' },
  {
    label: 'Menu',
    dropdown: [
      { path: '/menu',       label: 'Full Menu' },
      { path: '/daily-menu', label: 'Weekly Menu' }
    ]
  },
  { path: '/gallery',     label: 'Gallery' },
  { path: '/bakery',      label: 'Bakery'},
  { path: '/ContactPage', label: 'Contact'},
]

export default function Navbar() {
  const [isOpen, setIsOpen]               = useState(false)
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false)
  const [scrolled, setScrolled]           = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setMenuDropdownOpen(false)
  }, [location.pathname])

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`site-nav${scrolled ? ' site-nav--scrolled' : ''}`}>
      <div className="site-nav__container">

        {/* ── Logo (left) ─────────────────────────────── */}
        <Link to="/" className="site-nav__logo" onClick={() => setIsOpen(false)}>
          <div className="site-nav__logo-ring">
            <img src={qatindIcon} alt="Qatind logo" className="site-nav__logo-img" />
          </div>
          <div className="site-nav__logo-copy">
            <span className="site-nav__logo-name">Qatind</span>
            <span className="site-nav__logo-tagline">Enterprises</span>
          </div>
        </Link>

        {/* ── Nav items (centre) ───────────────────────── */}
        <div className={`site-nav__links${isOpen ? ' site-nav__links--open' : ''}`}>
          {navLinks.map((link) =>
            link.dropdown ? (
              <div
                key={link.label}
                className={`site-nav__item site-nav__item--drop${menuDropdownOpen ? ' site-nav__item--drop-open' : ''}`}
                onMouseEnter={() => setMenuDropdownOpen(true)}
                onMouseLeave={() => setMenuDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={`site-nav__pill${link.dropdown.some(d => isActive(d.path)) ? ' site-nav__pill--active' : ''}`}
                  onClick={() => setMenuDropdownOpen(p => !p)}
                  aria-expanded={menuDropdownOpen}
                >
                  <span>{link.label}</span>
                  <span className="site-nav__pill-chevron" aria-hidden="true" />
                </button>

                <div className="site-nav__drop-panel" role="menu">
                  {link.dropdown.map((sub, i) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      role="menuitem"
                      style={{ '--i': i }}
                      className={`site-nav__drop-item${isActive(sub.path) ? ' site-nav__drop-item--active' : ''}`}
                      onClick={() => { setIsOpen(false); setMenuDropdownOpen(false) }}
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
                className={`site-nav__pill${isActive(link.path) ? ' site-nav__pill--active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <span>{link.label}</span>
              </Link>
            )
          )}
        </div>

        {/* ── CTA (right) ──────────────────────────────── */}
        <button className="site-nav__cta" type="button">
          <FiShoppingCart className="site-nav__cta-icon" />
          <span>CART</span>
        </button>

        {/* ── Mobile hamburger ─────────────────────────── */}
        <button
          className={`site-nav__burger${isOpen ? ' site-nav__burger--open' : ''}`}
          onClick={() => setIsOpen(p => !p)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {isOpen && (
        <div className="site-nav__backdrop" onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}
    </nav>
  )
}