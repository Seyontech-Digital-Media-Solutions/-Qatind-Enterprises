import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import {
  FiBox,
  FiFeather,
  FiTarget,
  FiCircle,
  FiSunrise,
  FiCoffee,
  FiGift,
} from 'react-icons/fi'

import categories from '../data/menuCategories.json'
import '../components/styles/Menu.scss'
import menuBanner from '../assets/menu-banner2.png'

const iconMap = {
  FiBox,
  FiFeather,
  FiTarget,
  FiCircle,
  FiSunrise,
  FiCoffee,
  FiGift,
}

const menuImages = import.meta.glob(
  '../assets/menu/*.{jpg,jpeg,png}',
  { eager: true }
)

function getImageUrl(filename) {
  const match = Object.entries(menuImages).find(([path]) =>
    path.endsWith(`/${filename}`)
  )
  return match ? match[1].default : undefined
}

// Framer Motion animation variants
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.35, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.2, ease: 'easeIn' }
  }
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id)

  const activeGroup = categories.find((cat) => cat.id === activeCategory)
  const currentItems = activeGroup?.items || []

  return (
    <div className="menu-page">

      {/* HERO SECTION */}
      <section
        className="menu-hero"
        style={{ backgroundImage: `url(${menuBanner})` }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="menu-hero__eyebrow">Qatind Restaurant</span>
            <h1 className="menu-hero__title">All Menu's</h1>
            <p className="menu-hero__subtitle">
              Explore every category, from breakfast to dessert.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <section className="menu-tabs">
        <div className="container">
          <div className="menu-tabs__scroll">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon]
              const isActive = cat.id === activeCategory

              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`menu-tabs__pill ${
                    isActive ? 'menu-tabs__pill--active' : ''
                  }`}
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={isActive}
                >
                  {Icon && <Icon size={16} aria-hidden="true" />}
                  <span>{cat.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* MENU ITEMS GRID */}
      <section className="menu-items">
        <div className="container">
          <h2 className="menu-items__title">{activeGroup?.name}</h2>

          <motion.div className="menu-items__grid" layout>
            <AnimatePresence mode="popLayout">
              {currentItems.map((item, index) => {
                const imageUrl = getImageUrl(item.image)

                return (
                  <motion.article
                    layout
                    key={`${activeCategory}-${item.name}-${index}`}
                    className="menu-item-card"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="menu-item-card__img-wrap">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={item.name}
                          loading="eager"
                          draggable="false"
                        />
                      ) : (
                        <div className="menu-item-card__image-placeholder">
                          <span>Image unavailable</span>
                        </div>
                      )}
                    </div>

                    <h4 className="menu-item-card__name">
                      <span>{item.name}</span>
                    </h4>
                  </motion.article>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

    </div>
  )
}