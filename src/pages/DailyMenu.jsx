import { motion } from 'framer-motion'
import { FiClock, FiSunrise, FiSun, FiMoon } from 'react-icons/fi'
import dailyMenu from '../data/dailyMenu.json'
import '../components/styles/DailyMenu.scss'

const slotIcons = {
  breakfast: FiSunrise,
  lunch: FiSun,
  dinner: FiMoon
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function DailyMenu() {
  return (
    <div className="daily-menu">
      <section className="daily-hero">
        <span className="daily-hero__shape daily-hero__shape--1" />
        <span className="daily-hero__shape daily-hero__shape--2" />

        <div className="container">
          <div className="daily-hero__grid">
            <motion.div
              className="daily-hero__content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="daily-hero__eyebrow">Today's Special</span>
              <h1 className="daily-hero__title">{dailyMenu.todaysSpecial.name}</h1>
              <p className="daily-hero__desc">{dailyMenu.todaysSpecial.description}</p>

              <div className="daily-hero__meta">
                <span><FiClock size={16} /> {dailyMenu.todaysSpecial.time}</span>
                <span className="daily-hero__price">{dailyMenu.todaysSpecial.price}</span>
              </div>

              <button className="daily-hero__cta">Order Now</button>
            </motion.div>

            <motion.div
              className="daily-hero__visual"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <motion.span
                className="daily-hero__ring"
                animate={{ rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
              />
              <img
                className="daily-hero__img"
                src={dailyMenu.todaysSpecial.image}
                alt={dailyMenu.todaysSpecial.name}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="daily-slots">
        <div className="container">
          <motion.h2
            className="daily-slots__title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Meal Timings & Menu
          </motion.h2>

          <motion.div
            className="daily-slots__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {dailyMenu.slots.map(slot => {
              const Icon = slotIcons[slot.id]
              return (
                <motion.div
                  key={slot.id}
                  className="slot-card"
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                >
                  <div className="slot-card__header">
                    <span className="slot-card__icon">{Icon && <Icon size={20} />}</span>
                    <div>
                      <h3>{slot.label}</h3>
                      <span className="slot-card__time">
                        <FiClock size={13} /> {slot.time}
                      </span>
                    </div>
                  </div>

                  <ul className="slot-card__items">
                    {slot.items.map(item => (
                      <li key={item.name}>
                        <span>{item.name}</span>
                        <span className="slot-card__item-price">{item.price}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="slot-card__cta">Order Now</button>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </div>
  )
}