import { useEffect, useCallback, useRef, useLayoutEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import {
  FiShoppingCart,
  FiMinus,
  FiPlus,
  FiTrash2,
} from 'react-icons/fi'
import { useCart } from '../hooks/useCart'
import categories from '../data/menuCategories.json'
import deliveryConfig from '../data/deliveryConfig.json'
import '../components/styles/Cart.scss'
import menuBanner from '../assets/menu-banner2.png'

gsap.registerPlugin(Flip)

/**
 * Format a numeric price as Indian Rupees.
 * Uses the en-IN locale so thousands are grouped the Indian way
 * (e.g. ₹1,00,000) and always shows exactly 2 decimal places.
 *
 * @param {number} amount
 * @returns {string}  e.g. "₹13.99" or "₹1,299.00"
 */
function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

const menuImages = import.meta.glob(
  '../assets/menu/*.{jpg,jpeg,png}',
  {
    eager: true,
  }
)

function getImageUrl(filename) {
  const match = Object.entries(menuImages).find(([path]) =>
    path.endsWith(`/${filename}`)
  )

  return match ? match[1].default : undefined
}

function flattenMenu() {
  return categories.flatMap((category) =>
    category.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      categoryId: category.id,
    }))
  )
}

export default function Cart() {
  const {
    items,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    totalCount,
    totalPrice,
  } = useCart()

  const listRef = useRef(null)
  const flipStateRef = useRef(null)
  const flipTweenRef = useRef(null)
  const isFirstRender = useRef(true)

  const subtotal = totalPrice
  const deliveryFee =
    subtotal >= deliveryConfig.freeDeliveryThreshold
      ? 0
      : deliveryConfig.deliveryFee
  const tax = Number((subtotal * deliveryConfig.taxRate).toFixed(2))
  const grandTotal = Number((subtotal + deliveryFee + tax).toFixed(2))

  const suggestions = useMemo(() => {
    if (!items.length) return []

    const catalog = flattenMenu()
    const cartIds = new Set(items.map((item) => item.id))
    const firstCart = items[0]
    const firstCatalog = catalog.find((entry) => entry.id === firstCart.id)
    const categoryId = firstCart.categoryId || firstCatalog?.categoryId

    const fromSame = catalog.filter(
      (entry) => entry.categoryId === categoryId && !cartIds.has(entry.id)
    )
    const fromOther = catalog.filter(
      (entry) => entry.categoryId !== categoryId && !cartIds.has(entry.id)
    )

    return [...fromSame, ...fromOther].slice(0, 4)
  }, [items])

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return

    const cards = Array.from(list.querySelectorAll('.cart-item-card'))
    if (!cards.length) {
      flipStateRef.current = null
      return
    }

    if (isFirstRender.current) {
      flipStateRef.current = Flip.getState(cards)
      isFirstRender.current = false
      return
    }

    if (flipTweenRef.current) {
      flipTweenRef.current.kill()
      flipTweenRef.current = null
    }

    if (flipStateRef.current) {
      flipTweenRef.current = Flip.from(flipStateRef.current, {
        duration: 0.6,
        ease: 'power1.inOut',
        absolute: true,
        onComplete: () => {
          gsap.set(cards, {
            clearProps: 'transform,width,height,left,top,opacity',
          })
          flipTweenRef.current = null
        },
      })
    }

    flipStateRef.current = Flip.getState(cards)
  }, [items])

  useEffect(() => {
    return () => {
      if (flipTweenRef.current) {
        flipTweenRef.current.kill()
      }
    }
  }, [])

  const handleClear = useCallback(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="cart-page">
      <section
        className="cart-hero"
        style={{
          backgroundImage: `url(${menuBanner})`,
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="cart-hero__eyebrow">
              Qatind Restaurant
            </span>
            <h1 className="cart-hero__title">
              Your Cart
            </h1>
            <p className="cart-hero__subtitle">
              {totalCount > 0
                ? `${totalCount} item${totalCount > 1 ? 's' : ''} ready to order`
                : 'Your cart is empty'}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="cart-body">
        <div className="cart-items">
          <AnimatePresence mode="wait">
            {items.length === 0 ? (
              <motion.div
                key="empty"
                className="cart-empty"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <FiShoppingCart size={48} aria-hidden="true" />
                <h2 className="cart-empty__heading">Your cart is empty</h2>
                <p className="cart-empty__copy">
                  Browse our menu and add something delicious.
                </p>
                <Link to="/menu" className="cart-empty__cta">
                  Browse Menu
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                ref={listRef}
                className="cart-items__list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AnimatePresence>
                  {items.map((item) => {
                    const imageUrl = getImageUrl(item.image)
                    const lineTotal = item.price * item.qty

                    return (
                      <motion.div
                        layout={true}
                        key={item.id}
                        className="cart-item-card"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40, scale: 0.95 }}
                        transition={{ duration: 0.28 }}
                      >
                        {imageUrl ? (
                          <img
                            className="cart-item-card__img"
                            src={imageUrl}
                            alt={item.name}
                            loading="eager"
                            draggable="false"
                          />
                        ) : (
                          <div className="cart-item-card__img cart-item-card__img--placeholder">
                            <span>No image</span>
                          </div>
                        )}

                        <div className="cart-item-card__body">
                          <div className="cart-item-card__top">
                            <div>
                              <h3 className="cart-item-card__name">{item.name}</h3>
                              <p className="cart-item-card__unit-price">
                                {formatINR(item.price)}
                              </p>
                            </div>
                            <button
                              type="button"
                              className="cart-item-card__remove"
                              onClick={() => removeItem(item.id)}
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <FiTrash2 aria-hidden="true" />
                            </button>
                          </div>

                          <div className="cart-item-card__bottom">
                            <div className="cart-item-card__stepper">
                              <button
                                type="button"
                                onClick={() => updateQty(item.id, item.qty - 1)}
                                aria-label={`Decrease quantity of ${item.name}`}
                              >
                                <FiMinus aria-hidden="true" />
                              </button>
                              <span>{item.qty}</span>
                              <button
                                type="button"
                                onClick={() => updateQty(item.id, item.qty + 1)}
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                <FiPlus aria-hidden="true" />
                              </button>
                            </div>
                            <span className="cart-item-card__line-total">
                              {formatINR(lineTotal)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <aside className="cart-summary">
          <div className="cart-summary__card">
            <h2 className="cart-summary__heading">Order Summary</h2>

            <div className="cart-summary__row">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="cart-summary__row">
              <span>Delivery</span>
              <span>{deliveryFee === 0 ? 'Free' : formatINR(deliveryFee)}</span>
            </div>
            <div className="cart-summary__row">
              <span>Tax ({(deliveryConfig.taxRate * 100).toFixed(0)}%)</span>
              <span>{formatINR(tax)}</span>
            </div>

            {items.length > 0 && (
              <p className="cart-summary__free-delivery-note">
                {subtotal >= deliveryConfig.freeDeliveryThreshold
                  ? '🎉 You qualify for free delivery!'
                  : `Add ${formatINR(
                      deliveryConfig.freeDeliveryThreshold - subtotal
                    )} more for free delivery`}
              </p>
            )}

            <div className="cart-summary__divider" />

            <div className="cart-summary__row cart-summary__row--total">
              <span>Total</span>
              <span>{formatINR(grandTotal)}</span>
            </div>

            <button
              type="button"
              className="cart-summary__checkout"
              disabled={items.length === 0}
            >
              Checkout
            </button>

            <Link to="/menu" className="cart-summary__continue">
              Continue Shopping
            </Link>

            <AnimatePresence>
              {items.length > 0 && (
                <motion.button
                  type="button"
                  key="clear"
                  className="cart-summary__clear"
                  onClick={handleClear}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <FiTrash2 aria-hidden="true" />
                  Clear cart
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </aside>
      </section>

      <AnimatePresence>
        {items.length > 0 && (
          <motion.section
            className="cart-suggestions"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <div className="cart-suggestions__inner">
            <h2 className="cart-suggestions__heading">You may also like</h2>
            <div className="cart-suggestions__row">
              {suggestions.map((item) => {
                const imageUrl = getImageUrl(item.image)
                return (
                  <article key={item.id} className="cart-suggestion-card">
                    {imageUrl ? (
                      <img src={imageUrl} alt={item.name} loading="lazy" />
                    ) : (
                      <div className="cart-suggestion-card__placeholder">
                        <span>No image</span>
                      </div>
                    )}
                    <div className="cart-suggestion-card__body">
                      <h3 className="cart-suggestion-card__name">{item.name}</h3>
                      <span className="cart-suggestion-card__price">
                        {formatINR(item.price)}
                      </span>
                      <button
                        type="button"
                        className="cart-suggestion-card__add"
                        onClick={() => addItem(item)}
                        aria-label={`Add ${item.name} to cart`}
                      >
                        Add
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}