import { motion } from 'framer-motion'
import { FiShoppingCart, FiHeart } from 'react-icons/fi'
import '../styles/FoodCard.scss'

export default function FoodCard({ item }) {
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  }

  return (
    <motion.div
      className="food-card"
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="food-card__image-container">
        <img src={item.image} alt={item.name} className="food-card__image" />
        <button className="food-card__wishlist">
          <FiHeart size={20} />
        </button>
      </div>

      <div className="food-card__content">
        <h3 className="food-card__name">{item.name}</h3>
        <p className="food-card__description">{item.description}</p>

        <div className="food-card__footer">
          <span className="food-card__price">${item.price}</span>
          <button className="food-card__add-btn">
            <FiShoppingCart size={18} />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  )
}
