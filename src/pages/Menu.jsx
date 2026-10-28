import { useState, useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { SplitText } from 'gsap/SplitText'

import {
  FiBox,
  FiFeather,
  FiTarget,
  FiCircle,
  FiSunrise,
  FiCoffee,
  FiGift,
  FiShoppingCart,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi'
import { useCart } from '../hooks/useCart'

import categories from '../data/menuCategories.json'
import '../components/styles/Menu.scss'
import menuBanner from '../assets/menu-banner2.png'

gsap.registerPlugin(Flip, SplitText)

const iconMap = {
  FiBox,
  FiFeather,
  FiTarget,
  FiCircle,
  FiSunrise,
  FiCoffee,
  FiGift,
}

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

export default function Menu() {
  const { addItem } = useCart()
  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.id
  )

  const gridRef = useRef(null)
  const flipTweenRef = useRef(null)
  const isFirstRender = useRef(true)
  const heroRef = useRef(null)
  const pageRef = useRef(null)
  const sidebarRef = useRef(null)
  const listRef = useRef(null)
  const contentRef = useRef(null)

  // Show "more categories" hints on the phone row.
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  /*
   * =======================================================
   * MARQUEE REFS
   * =======================================================
   */

  const marqueeTrackRef = useRef(null)
  const marqueeGroupRef = useRef(null)
  const marqueeAnimationRef = useRef(null)
  const characterAnimationsRef = useRef([])


  /*
   * =======================================================
   * STICKY CATEGORY BAR: where is the bottom of the header?
   * =======================================================
   *
   * The category bar must stick just BELOW the site header.
   * Instead of guessing a tag name, we ask the browser which
   * fixed / sticky element is really covering the top of the
   * screen, and use its bottom edge. The result is published
   * as --header-height (used by Menu.scss).
   *
   * If nothing is fixed at the top (header scrolls away with
   * the page), the value is 0 and the bar sticks to the top.
   */

  useLayoutEffect(() => {
    const root = document.documentElement
    const page = pageRef.current
    const hero = heroRef.current

    let topBar = null
    let lastValue = null

    const findTopBar = () => {
      // 1. The element actually covering the top-centre of the screen.
      const probe = document.elementFromPoint(
        window.innerWidth / 2,
        2
      )

      let node = probe

      while (
        node &&
        node !== document.body &&
        node !== document.documentElement
      ) {
        // Ignore this page's own sticky bar.
        if (!(page && page.contains(node))) {
          const position = window.getComputedStyle(node).position

          if (position === 'fixed' || position === 'sticky') {
            return node
          }
        }

        node = node.parentElement
      }

      // 2. Fallback: a <header> element that is fixed or sticky.
      const header = document.querySelector('header')

      if (header) {
        const position = window.getComputedStyle(header).position

        if (position === 'fixed' || position === 'sticky') {
          return header
        }
      }

      return null
    }

    const publish = () => {
      const bottom = topBar
        ? Math.max(0, Math.round(topBar.getBoundingClientRect().bottom))
        : 0

      if (bottom === lastValue) return

      lastValue = bottom

      root.style.setProperty('--header-height', `${bottom}px`)

      /*
       * A fixed header also sits ON TOP of the start of the hero
       * and can hide its first lines. Push the hero content down
       * by however much is covered (0 if nothing overlaps).
       */
      if (hero) {
        const heroTop =
          hero.getBoundingClientRect().top + window.scrollY

        hero.style.setProperty(
          '--hero-offset',
          `${Math.max(0, bottom - heroTop)}px`
        )
      }
    }

    const measure = () => {
      topBar = findTopBar()
      lastValue = null
      publish()
    }

    measure()

    // Fonts and the logo can change the header height after load.
    const timers = [
      setTimeout(measure, 250),
      setTimeout(measure, 900),
    ]

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure)
    }

    const observer =
      typeof ResizeObserver !== 'undefined' && topBar
        ? new ResizeObserver(publish)
        : null

    if (observer) observer.observe(topBar)

    // Some headers shrink when you scroll: keep following them.
    let frame = 0

    const onScroll = () => {
      if (frame) return

      frame = requestAnimationFrame(() => {
        frame = 0
        publish()
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    window.addEventListener('load', measure)

    return () => {
      timers.forEach(clearTimeout)

      if (frame) cancelAnimationFrame(frame)

      if (observer) observer.disconnect()

      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)

      root.style.removeProperty('--header-height')
    }
  }, [])


  /*
   * =======================================================
   * CATEGORY ROW: "there is more" hints (phones)
   * =======================================================
   */

  useLayoutEffect(() => {
    const list = listRef.current

    if (!list) return

    const update = () => {
      const maxScroll = list.scrollWidth - list.clientWidth

      setCanScrollLeft(list.scrollLeft > 4)
      setCanScrollRight(
        maxScroll > 4 && list.scrollLeft < maxScroll - 4
      )
    }

    update()

    list.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(update)
        : null

    if (observer) observer.observe(list)

    return () => {
      list.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)

      if (observer) observer.disconnect()
    }
  }, [])

  // Keep the selected category centred in the row.
  useLayoutEffect(() => {
    const list = listRef.current

    if (!list || list.scrollWidth <= list.clientWidth) return

    const selected = list.querySelector('[aria-pressed="true"]')

    if (!selected) return

    list.scrollTo({
      left:
        selected.offsetLeft -
        (list.clientWidth - selected.offsetWidth) / 2,
      behavior: 'smooth',
    })
  }, [activeCategory])

  const scrollList = (direction) => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: direction * 200,
        behavior: 'smooth',
      })
    }
  }

  /*
   * Switching category while scrolled far down: jump back so the
   * first dishes are visible just under the sticky bar, instead
   * of leaving you in the middle of an empty area.
   */
  const selectCategory = (id) => {
    if (id === activeCategory) return

    const content = contentRef.current
    const list = listRef.current

    if (content && list) {
      const headerBottom =
        parseFloat(
          getComputedStyle(
            document.documentElement
          ).getPropertyValue('--header-height')
        ) || 0

      // On phones the bar is horizontal and sits above the dishes.
      const isRow =
        getComputedStyle(list).flexDirection === 'row'

      const barHeight =
        isRow && sidebarRef.current
          ? sidebarRef.current.offsetHeight
          : 0

      const limit = headerBottom + barHeight + 16
      const top = content.getBoundingClientRect().top

      if (top < limit) {
        window.scrollBy({
          top: top - limit,
          left: 0,
          behavior: 'instant',
        })
      }
    }

    setActiveCategory(id)
  }


  /*
   * =======================================================
   * MENU CATEGORY ANIMATION
   * =======================================================
   */

  useLayoutEffect(() => {
    const grid = gridRef.current

    if (!grid) return

    const allItems = Array.from(
      grid.querySelectorAll('.menu-item-card')
    )

    if (!allItems.length) return

    /*
     * First render
     */
    if (isFirstRender.current) {
      allItems.forEach((item) => {
        item.style.display =
          item.dataset.category === activeCategory
            ? ''
            : 'none'
      })

      isFirstRender.current = false

      return
    }

    /*
     * Kill previous FLIP animation.
     */
    if (flipTweenRef.current) {
      flipTweenRef.current.kill()
      flipTweenRef.current = null
    }

    /*
     * Clear old GSAP properties.
     */
    gsap.set(allItems, {
      clearProps:
        'transform,width,height,left,top,opacity',
    })

    /*
     * Current visible cards.
     */
    const currentlyVisible = allItems.filter(
      (item) => item.style.display !== 'none'
    )

    if (!currentlyVisible.length) return

    /*
     * Capture old positions.
     */
    const state = Flip.getState(currentlyVisible)

    /*
     * Lock current grid height.
     */
    gsap.set(grid, {
      height: grid.offsetHeight,
      overflow: 'hidden',
    })

    /*
     * Change category.
     */
    allItems.forEach((item) => {
      item.style.display =
        item.dataset.category === activeCategory
          ? ''
          : 'none'
    })

    /*
     * Force layout.
     */
    grid.offsetHeight

    /*
     * FLIP animation.
     */
    flipTweenRef.current = Flip.from(state, {
      duration: 0.6,

      ease: 'power1.inOut',

      absolute: true,

      stagger: 0.04,

      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          {
            opacity: 0,
            scale: 0.75,
            y: 20,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.45,
            ease: 'back.out(1.3)',
            stagger: {
              each: 0.035,
              from: 'random',
            },
          }
        )
      },

      onLeave: (elements) => {
        gsap.to(elements, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: 'power2.in',
          stagger: {
            each: 0.02,
            from: 'random',
          },
        })
      },

      onComplete: () => {
        gsap.set(grid, {
          height: 'auto',
          overflow: '',
        })

        gsap.set(allItems, {
          clearProps:
            'transform,width,height,left,top,opacity',
        })

        flipTweenRef.current = null
      },
    })
  }, [activeCategory])


  /*
   * =======================================================
   * MARQUEE (currently disabled: the marquee section in the
   * JSX below is commented out, so the refs stay null and
   * this effect returns early. Kept so it can be switched
   * back on by un-commenting that section.)
   * =======================================================
   */

  useLayoutEffect(() => {
    const track = marqueeTrackRef.current
    const group = marqueeGroupRef.current

    if (!track || !group) return

    let splitInstances = []

    const ctx = gsap.context(() => {
      const groups = Array.from(
        track.querySelectorAll('.menu-marquee-group')
      )

      if (groups.length < 2) return

      groups.forEach((currentGroup) => {
        const split = SplitText.create(currentGroup, {
          type: 'chars,words',
          charsClass: 'menu-char',
          wordsClass: 'menu-word',
        })

        splitInstances.push(split)
      })

      const allChars = track.querySelectorAll('.menu-char')

      gsap.set(allChars, {
        yPercent: () => gsap.utils.random(-35, 35),
        rotation: () => gsap.utils.random(-6, 6),
        scaleY: () => gsap.utils.random(0.88, 1.12),
        transformOrigin: 'center center',
      })

      gsap.set(track, { x: 0 })

      /*
       * Exact width of one group: moving by this distance
       * gives a seamless loop with no blank space.
       */
      const getGroupWidth = () => group.getBoundingClientRect().width

      /*
       * Pixels per second, so speed stays the same on any
       * screen size. 18 = very slow, 22 = slow, 28 = normal.
       */
      const PIXELS_PER_SECOND = 22

      const createMarquee = () => {
        if (marqueeAnimationRef.current) {
          marqueeAnimationRef.current.kill()
        }

        const groupWidth = getGroupWidth()
        const duration = groupWidth / PIXELS_PER_SECOND

        gsap.set(track, { x: 0 })

        marqueeAnimationRef.current = gsap.to(track, {
          x: -groupWidth,
          duration,
          ease: 'none',
          repeat: -1,
          overwrite: true,
        })
      }

      createMarquee()

      /*
       * Character distortion, independent from scrolling.
       */
      const characterLoop = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.3,
      })

      characterLoop.to(allChars, {
        yPercent: () => gsap.utils.random(-28, 28),
        rotation: () => gsap.utils.random(-5, 5),
        scaleY: () => gsap.utils.random(0.9, 1.1),
        duration: 0.7,
        ease: 'power2.inOut',
        stagger: { each: 0.025, from: 'random' },
      })

      characterLoop.to(allChars, {
        yPercent: 0,
        rotation: 0,
        scaleY: 1,
        duration: 0.8,
        ease: 'back.out(1.2)',
        stagger: { each: 0.02, from: 'random' },
      })

      characterAnimationsRef.current.push(characterLoop)

      let resizeTimer

      const handleResize = () => {
        clearTimeout(resizeTimer)

        resizeTimer = setTimeout(() => {
          createMarquee()
        }, 150)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        clearTimeout(resizeTimer)

        window.removeEventListener('resize', handleResize)

        if (marqueeAnimationRef.current) {
          marqueeAnimationRef.current.kill()
        }

        characterAnimationsRef.current.forEach(
          (animation) => animation.kill()
        )

        characterAnimationsRef.current = []

        splitInstances.forEach((split) => {
          split.revert()
        })

        splitInstances = []
      }
    })

    return () => {
      ctx.revert()
    }
  }, [])


  /*
   * =======================================================
   * ACTIVE CATEGORY
   * =======================================================
   */

  const active = categories.find(
    (category) => category.id === activeCategory
  )


  /*
   * =======================================================
   * RENDER
   * =======================================================
   */

  return (
    <div className="menu-page" ref={pageRef}>

      {/* =================================================
          HERO
      ================================================= */}

      <section
        ref={heroRef}
        className="menu-hero"
        style={{
          backgroundImage: `url(${menuBanner})`,
        }}
      >

        <div className="container menu-hero__inner">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
            }}
          >

            <span className="menu-hero__eyebrow">
              Qatind Restaurant
            </span>

            <h1 className="menu-hero__title">
              Our Menu
            </h1>

            <p className="menu-hero__subtitle">
              Explore every category, from breakfast to
              dessert.
            </p>

          </motion.div>

        </div>

      </section>


      {/* =================================================
          CATEGORIES (left sidebar) + MENU ITEMS
      ================================================= */}

      <section className="menu-items">

        <div className="container menu-items__layout">

          {/* ---------- Left: category list ---------- */}

          <aside
            ref={sidebarRef}
            className="menu-sidebar"
            aria-label="Menu categories"
          >

            <h3 className="menu-sidebar__heading">
              Categories
            </h3>

            <div
              className={`menu-sidebar__scroller ${
                canScrollLeft ? 'has-left' : ''
              } ${canScrollRight ? 'has-right' : ''}`}
            >

              <button
                type="button"
                className="menu-sidebar__arrow menu-sidebar__arrow--left"
                onClick={() => scrollList(-1)}
                aria-label="Show earlier categories"
                tabIndex={-1}
              >
                <FiChevronLeft size={18} aria-hidden="true" />
              </button>

              <nav
                ref={listRef}
                className="menu-sidebar__list"
              >

                {categories.map((cat) => {
                  const Icon = iconMap[cat.icon]

                  const isActive =
                    cat.id === activeCategory

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`menu-sidebar__item ${
                        isActive
                          ? 'menu-sidebar__item--active'
                          : ''
                      }`}
                      onClick={() =>
                        selectCategory(cat.id)
                      }
                      aria-pressed={isActive}
                    >

                      <span className="menu-sidebar__icon">
                        {Icon && (
                          <Icon
                            size={16}
                            aria-hidden="true"
                          />
                        )}
                      </span>

                      <span className="menu-sidebar__name">
                        {cat.name}
                      </span>

                      <span className="menu-sidebar__count">
                        {cat.items.length}
                      </span>

                    </button>
                  )
                })}

              </nav>

              <button
                type="button"
                className="menu-sidebar__arrow menu-sidebar__arrow--right"
                onClick={() => scrollList(1)}
                aria-label="Show more categories"
                tabIndex={-1}
              >
                <FiChevronRight size={18} aria-hidden="true" />
              </button>

            </div>

          </aside>


          {/* ---------- Right: dishes ---------- */}

          <div className="menu-items__content" ref={contentRef}>

            <h2 className="menu-items__title">
              {active?.name}

              <span className="menu-items__count">
                {active?.items.length} dishes
              </span>
            </h2>

            <div
              className="menu-items__grid"
              ref={gridRef}
            >

              {categories.flatMap((category) =>
                category.items.map((item, index) => {

                  const imageUrl =
                    getImageUrl(item.image)

                  return (
                    <article
                      key={`${category.id}-${item.name}-${index}`}
                      className="menu-item-card"
                      data-category={category.id}
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
                            <span>
                              Image unavailable
                            </span>
                          </div>
                        )}

                      </div>

                      <h4 className="menu-item-card__name">

                        <span>
                          {item.name}
                        </span>

                      </h4>

                      <div className="menu-item-card__footer">
                        <span className="menu-item-card__price">{formatINR(item.price)}</span>
                        <button
                          type="button"
                          className="menu-item-card__add-btn"
                          onClick={() => addItem({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            categoryId: category.id,
                          })}
                          aria-label={`Add ${item.name} to cart`}
                        >
                          <FiShoppingCart size={15} aria-hidden="true" />
                          <span>Add</span>
                        </button>
                      </div>

                    </article>
                  )
                })
              )}

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          AUTOMATIC INFINITE TEXT MARQUEE (disabled)
      ================================================= */}

      {/* <section className="menu-horizontal">

        <div className="menu-horizontal__viewport">

          <div
            ref={marqueeTrackRef}
            className="menu-horizontal__track"
          >

            <div
              ref={marqueeGroupRef}
              className="menu-marquee-group"
            >

              <span className="menu-horizontal__light">
                Freshly prepared.
              </span>

              <span className="menu-horizontal__orange">
                Carefully packed.
              </span>

              <span className="menu-horizontal__green">
                Made for your cravings.
              </span>

            </div>

            <div
              className="menu-marquee-group"
              aria-hidden="true"
            >

              <span className="menu-horizontal__light">
                Freshly prepared.
              </span>

              <span className="menu-horizontal__orange">
                Carefully packed.
              </span>

              <span className="menu-horizontal__green">
                Made for your cravings.
              </span>

            </div>

          </div>

        </div>

      </section> */}

    </div>
  )
}