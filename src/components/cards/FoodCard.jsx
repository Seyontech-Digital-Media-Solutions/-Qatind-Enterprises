import { motion } from 'framer-motion'
import { FiShoppingCart, FiHeart } from 'react-icons/fi'
import '../styles/FoodCard.scss'

// Import all images from src/assets/menu
const menuImages = import.meta.glob('../../assets/menu/*.{png,jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default'
})

export default function FoodCard({ item }) {
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  }

  // Find image by filename from menu.json
  const image =
    Object.entries(menuImages).find(([path]) =>
      path.endsWith(`/${item.image}`)
    )?.[1] || ''

  return (
    <motion.div
      className="food-card"
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="food-card__image-container">
        <img
          src={image}
          alt={item.name}
          className="food-card__image"
          loading="lazy"
        />

        <button className="food-card__wishlist">
          <FiHeart size={20} />
        </button>
      </div>

      <div className="food-card__content">
        <h3 className="food-card__name">{item.name}</h3>

        <p className="food-card__description">
          {item.description}
        </p>

        <div className="food-card__footer">
          <span className="food-card__price">
            ${item.price.toFixed(2)}
          </span>

          <button className="food-card__add-btn">
            <FiShoppingCart size={18} />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  )
}