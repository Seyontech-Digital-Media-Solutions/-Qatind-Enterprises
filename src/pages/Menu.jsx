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
} from 'react-icons/fi'

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
  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.id
  )

  const gridRef = useRef(null)
  const flipTweenRef = useRef(null)
  const isFirstRender = useRef(true)

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


 

  useLayoutEffect(() => {
    const track = marqueeTrackRef.current
    const group = marqueeGroupRef.current

    if (!track || !group) return

    let splitInstances = []

    const ctx = gsap.context(() => {

      /*
       * ---------------------------------------------------
       * GET ALL MARQUEE GROUPS
       * ---------------------------------------------------
       */

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

      const allChars = track.querySelectorAll(
        '.menu-char'
      )

      /*
       * ---------------------------------------------------
       * INITIAL CHARACTER STATE
       * ---------------------------------------------------
       */

      gsap.set(allChars, {
        yPercent: () =>
          gsap.utils.random(-35, 35),

        rotation: () =>
          gsap.utils.random(-6, 6),

        scaleY: () =>
          gsap.utils.random(0.88, 1.12),

        transformOrigin: 'center center',
      })

      /*
       * ---------------------------------------------------
       * TRACK POSITION
       * ---------------------------------------------------
       */

      gsap.set(track, {
        x: 0,
      })

      /*
       * ---------------------------------------------------
       * GET EXACT WIDTH OF ONE GROUP
       * ---------------------------------------------------
       *
       * Because the group contains its right padding,
       * moving exactly this distance gives us a seamless
       * loop with ZERO blank space.
       */

      const getGroupWidth = () => {
        return group.getBoundingClientRect().width
      }

      /*
       * ---------------------------------------------------
       * MARQUEE SPEED
       * ---------------------------------------------------
       *
       * Pixels per second.
       *
       * 18 = very slow
       * 22 = slow
       * 28 = normal
       *
       * Using pixels/second means the speed stays
       * consistent regardless of screen size.
       */

      const PIXELS_PER_SECOND = 22

      /*
       * ---------------------------------------------------
       * CREATE MARQUEE
       * ---------------------------------------------------
       */

      const createMarquee = () => {
        if (marqueeAnimationRef.current) {
          marqueeAnimationRef.current.kill()
        }

        const groupWidth = getGroupWidth()

        const duration =
          groupWidth / PIXELS_PER_SECOND

        /*
         * Reset position.
         */
        gsap.set(track, {
          x: 0,
        })

        /*
         * Continuous horizontal movement.
         */
        marqueeAnimationRef.current = gsap.to(
          track,
          {
            x: -groupWidth,

            duration,

            ease: 'none',

            repeat: -1,

            overwrite: true,
          }
        )
      }

      /*
       * Create initial marquee.
       */
      createMarquee()


      /*
       * ---------------------------------------------------
       * CHARACTER DISTORTION ANIMATION
       * ---------------------------------------------------
       *
       * This is independent from scrolling.
       *
       * Characters continuously move slightly up/down
       * and rotate while the sentence travels.
       */

      const characterLoop = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.3,
      })

      characterLoop.to(allChars, {
        yPercent: () =>
          gsap.utils.random(-28, 28),

        rotation: () =>
          gsap.utils.random(-5, 5),

        scaleY: () =>
          gsap.utils.random(0.9, 1.1),

        duration: 0.7,

        ease: 'power2.inOut',

        stagger: {
          each: 0.025,
          from: 'random',
        },
      })

      characterLoop.to(allChars, {
        yPercent: 0,

        rotation: 0,

        scaleY: 1,

        duration: 0.8,

        ease: 'back.out(1.2)',

        stagger: {
          each: 0.02,
          from: 'random',
        },
      })

      characterAnimationsRef.current.push(
        characterLoop
      )


      /*
       * ---------------------------------------------------
       * RESIZE
       * ---------------------------------------------------
       */

      let resizeTimer

      const handleResize = () => {
        clearTimeout(resizeTimer)

        resizeTimer = setTimeout(() => {
          createMarquee()
        }, 150)
      }

      window.addEventListener(
        'resize',
        handleResize
      )

      /*
       * Cleanup.
       */
      return () => {
        clearTimeout(resizeTimer)

        window.removeEventListener(
          'resize',
          handleResize
        )

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
    <div className="menu-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="menu-hero"
        style={{
          backgroundImage: `url(${menuBanner})`,
        }}
      >

        <div className="container">

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
              All Menu's
            </h1>

            <p className="menu-hero__subtitle">
              Explore every category, from breakfast to
              dessert.
            </p>

          </motion.div>

        </div>

      </section>


      {/* =================================================
          CATEGORY TABS
      ================================================= */}

      <section className="menu-tabs">

        <div className="container">

          <div className="menu-tabs__scroll">

            {categories.map((cat) => {
              const Icon = iconMap[cat.icon]

              const isActive =
                cat.id === activeCategory

              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`menu-tabs__pill ${
                    isActive
                      ? 'menu-tabs__pill--active'
                      : ''
                  }`}
                  onClick={() =>
                    setActiveCategory(cat.id)
                  }
                  aria-pressed={isActive}
                >

                  {Icon && (
                    <Icon
                      size={16}
                      aria-hidden="true"
                    />
                  )}

                  <span>
                    {cat.name}
                  </span>

                </button>
              )
            })}

          </div>

        </div>

      </section>


      {/* =================================================
          MENU ITEMS
      ================================================= */}

      <section className="menu-items">

        <div className="container">

          <h2 className="menu-items__title">
            {active?.name}
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

                  </article>
                )
              })
            )}

          </div>

        </div>

      </section>


      {/* =================================================
          AUTOMATIC INFINITE TEXT MARQUEE
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