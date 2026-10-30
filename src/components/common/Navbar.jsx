import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import { useCart } from '../../hooks/useCart'
import qatindIcon from '../../assets/qatind-logo.png'
import '../styles/Navbar.scss'

// "Menu" and "Weekly Menu" are now two separate links (no dropdown).
const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/ServicesPage', label: 'Services' },
  { path: '/menu', label: 'Menu' },
  { path: '/daily-menu', label: 'Weekly Menu' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/bakery', label: 'Bakery' },
  { path: '/ContactPage', label: 'Contact' }
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { totalCount } = useCart()

  const isActive = (path) =>
    location.pathname.toLowerCase() === path.toLowerCase()

  // ── Scroll shadow ─────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Close the drawer when the route changes ───────────────────
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // ── Lock page scroll while the mobile drawer is open ──────────
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // ── Escape key closes the drawer ──────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // ── Reset drawer state when the window grows to desktop size ──
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 992px)')
    const onChange = (e) => {
      if (e.matches) setIsOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const closeAll = () => setIsOpen(false)

  return (
    <nav
      className={`site-nav${scrolled ? ' site-nav--scrolled' : ''}`}
      aria-label="Main navigation"
    >
      <div className="site-nav__container">

        {/* ── Logo ─────────────────────────────────────── */}
        <Link to="/" className="site-nav__logo" onClick={closeAll}>
          <div className="site-nav__logo-ring">
            <img src={qatindIcon} alt="Qatind logo" className="site-nav__logo-img" />
          </div>
          <div className="site-nav__logo-copy">
            <span className="site-nav__logo-name">Qatind</span>
            <span className="site-nav__logo-tagline">Enterprises</span>
          </div>
        </Link>

        {/* ── Links (desktop row / mobile drawer) ──────── */}
        <div
          id="site-nav-links"
          className={`site-nav__links${isOpen ? ' site-nav__links--open' : ''}`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`site-nav__pill${isActive(link.path) ? ' site-nav__pill--active' : ''}`}
              aria-current={isActive(link.path) ? 'page' : undefined}
              onClick={closeAll}
            >
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* ── Cart (one button: pill on desktop, icon on mobile) ── */}
        <Link
          to="/cart"
          className="site-nav__cart"
          aria-label={totalCount > 0 ? `View cart, ${totalCount} items` : 'View cart'}
          onClick={closeAll}
        >
          <FiShoppingCart size={19} aria-hidden="true" />
          <span className="site-nav__cart-label">Cart</span>
          {totalCount > 0 && (
            <span className="site-nav__cart-badge">
              {totalCount > 99 ? '99+' : totalCount}
            </span>
          )}
        </Link>

        {/* ── Mobile hamburger ─────────────────────────── */}
        <button
          type="button"
          className={`site-nav__burger${isOpen ? ' site-nav__burger--open' : ''}`}
          onClick={() => setIsOpen((p) => !p)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="site-nav-links"
        >
          <span /><span /><span />
        </button>
      </div>

      {isOpen && (
        <div className="site-nav__backdrop" onClick={closeAll} aria-hidden="true" />
      )}
    </nav>
  )
}