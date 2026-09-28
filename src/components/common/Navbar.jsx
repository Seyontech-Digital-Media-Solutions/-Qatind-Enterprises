import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import { useCart } from '../../hooks/useCart'
import qatindIcon from '../../assets/qatind-logo.png'
import '../styles/Navbar.scss'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/ServicesPage', label: 'Services' },
  {
    label: 'Menu',
    dropdown: [
      { path: '/menu', label: 'Full Menu' },
      { path: '/daily-menu', label: 'Weekly Menu' }
    ]
  },
  { path: '/gallery', label: 'Gallery' },
  { path: '/bakery', label: 'Bakery' },
  { path: '/ContactPage', label: 'Contact' }
]

// Hover-to-open only on desktop with a real mouse. On touch devices and
// in the mobile drawer the dropdown opens/closes by tap instead.
const HOVER_QUERY = '(min-width: 992px) and (hover: hover) and (pointer: fine)'
const hoverMode = () => window.matchMedia(HOVER_QUERY).matches

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { totalCount } = useCart()

  const dropRef = useRef(null)
  const closeTimer = useRef(null)

  const isActive = (path) =>
    location.pathname.toLowerCase() === path.toLowerCase()

  // ── Scroll shadow ─────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Close everything when the route changes ───────────────────
  useEffect(() => {
    setIsOpen(false)
    setDropOpen(false)
  }, [location.pathname])

  // ── Lock page scroll while the mobile drawer is open ──────────
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // ── Escape key + click outside the dropdown ───────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setDropOpen(false)
        setIsOpen(false)
      }
    }
    const onPointerDown = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
      clearTimeout(closeTimer.current)
    }
  }, [])

  // ── Reset drawer state when the window grows to desktop size ──
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 992px)')
    const onChange = (e) => {
      if (e.matches) {
        setIsOpen(false)
        setDropOpen(false)
      }
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // ── Dropdown handlers ─────────────────────────────────────────
  const handleEnter = () => {
    if (!hoverMode()) return
    clearTimeout(closeTimer.current)
    setDropOpen(true)
  }

  // Small delay so the menu doesn't flicker shut if the cursor
  // briefly leaves it.
  const handleLeave = () => {
    if (!hoverMode()) return
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setDropOpen(false), 140)
  }

  const handleToggle = () => {
    clearTimeout(closeTimer.current)
    setDropOpen((prev) => (hoverMode() ? true : !prev))
  }

  const closeAll = () => {
    setIsOpen(false)
    setDropOpen(false)
  }

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
          {navLinks.map((link) =>
            link.dropdown ? (
              <div
                key={link.label}
                ref={dropRef}
                className={`site-nav__item site-nav__item--drop${dropOpen ? ' site-nav__item--drop-open' : ''}`}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
              >
                <button
                  type="button"
                  className={`site-nav__pill${link.dropdown.some((d) => isActive(d.path)) ? ' site-nav__pill--active' : ''}`}
                  onClick={handleToggle}
                  aria-haspopup="true"
                  aria-expanded={dropOpen}
                >
                  <span>{link.label}</span>
                  <span className="site-nav__pill-chevron" aria-hidden="true" />
                </button>

                {/* Outer panel = invisible hover bridge; inner list = visible card */}
                <div className="site-nav__drop-panel">
                  <div className="site-nav__drop-list" role="menu">
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        role="menuitem"
                        className={`site-nav__drop-item${isActive(sub.path) ? ' site-nav__drop-item--active' : ''}`}
                        aria-current={isActive(sub.path) ? 'page' : undefined}
                        onClick={closeAll}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`site-nav__pill${isActive(link.path) ? ' site-nav__pill--active' : ''}`}
                aria-current={isActive(link.path) ? 'page' : undefined}
                onClick={closeAll}
              >
                <span>{link.label}</span>
              </Link>
            )
          )}
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