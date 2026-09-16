import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, CustomEase, SplitText)

// Smooth "luxury" ease — gentle acceleration, soft landing
CustomEase.create('luxeOut', '0.16, 1, 0.3, 1')
CustomEase.create('luxeInOut', '0.45, 0, 0.2, 1')

import cakeMain from '../assets/plumcake/plum-cake-main.png'
import overlaySteam from '../assets/plumcake/steam-overlay1.png'
import ingRaisins from '../assets/plumcake/raisins.png'
import ingCashews from '../assets/plumcake/cashews.png'
import ingAlmonds from '../assets/plumcake/almonds.png'
import ingPistachios from '../assets/plumcake/pistachios.png'
import ingCherries from '../assets/plumcake/candied-cherries.png'
import ingOrangePeel from '../assets/plumcake/orange-peel.png'
import ingCinnamon from '../assets/plumcake/orange-fruite.png'
import ingStarAnise from '../assets/plumcake/figgg.png'
import overlayCrumbs from '../assets/plumcake/cake-crumbs.png'

const ORBIT_RADIUS = 165
const deg2rad = d => (d * Math.PI) / 180
const orbitX = (angle, radius) => Math.cos(deg2rad(angle)) * radius
const orbitY = (angle, radius) => Math.sin(deg2rad(angle)) * radius

const INGREDIENTS = [
  { id: 'raisins', src: ingRaisins, alt: 'Raisins', angle: 0, size: 42, spinDuration: 6,
    from: { x: 130, y: 30, rotate: -50, scale: 0.4 }, via: { x: 40, y: -20 }, entranceAt: 0.0, settleBounce: true },
  { id: 'cashews', src: ingCashews, alt: 'Cashews', angle: 45, size: 48, spinDuration: 7.5,
    from: { x: -170, y: -10, rotate: 20, scale: 0.4 }, via: { x: -50, y: -70 }, entranceAt: 0.4 },
  { id: 'almonds', src: ingAlmonds, alt: 'Almonds', angle: 90, size: 44, spinDuration: 6.5,
    from: { x: -160, y: -20, rotate: -30, scale: 0.4 }, via: { x: -60, y: -50 }, entranceAt: 0.8 },
  { id: 'pistachios', src: ingPistachios, alt: 'Pistachios', angle: 135, size: 44, spinDuration: 8,
    from: { x: 0, y: 0, rotate: -70, scale: 0 }, via: { x: 0, y: 0 }, entranceAt: 1.2 },
  { id: 'cherries', src: ingCherries, alt: 'Candied cherries', angle: 180, size: 60, spinDuration: 9,
    from: { x: 0, y: -150, rotate: 0, scale: 0.5 }, via: { x: 15, y: -30 }, entranceAt: 1.6, settleBounce: true },
  { id: 'orangePeel', src: ingOrangePeel, alt: 'Candied orange peel', angle: 225, size: 50, spinDuration: 7,
    from: { x: -50, y: -150, rotate: -200, scale: 0.4 },
    viaSpiral: [{ x: 70, y: -100 }, { x: 40, y: -50 }, { x: -20, y: -10 }], entranceAt: 2.0 },
  { id: 'cinnamon', src: ingCinnamon, alt: 'Cinnamon sticks', angle: 270, size: 66, spinDuration: 10,
    from: { x: 150, y: -50, rotate: 80, scale: 0.4 }, via: { x: 60, y: 40 }, rotateTo: 18, entranceAt: 2.4 },
  { id: 'starAnise', src: ingStarAnise, alt: 'Star anise', angle: 315, size: 46, spinDuration: 6,
    from: { x: 40, y: 140, rotate: 100, scale: 0.4 }, via: { x: -30, y: 50 }, entranceAt: 2.8 }
]

const CRUMB_SLOTS = [
  { id: 'c1', top: '86%', left: '30%', size: 14 },
  { id: 'c2', top: '90%', left: '48%', size: 11 },
  { id: 'c3', top: '88%', left: '66%', size: 12 }
]

const SPARKLE_COUNT = 16

export default function PlumCakeHeroLayer({ startDelay = 0.6, heroRef }) {
  const layerRef = useRef(null)
  const cakeRef = useRef(null)
  const shadowRef = useRef(null)
  const orbitRef = useRef(null)
  const glowRef = useRef(null)
  const flashRef = useRef(null)
  const steamRef = useRef(null)
  const lightRef = useRef(null)
  const ingredientRefs = useRef({})
  const crumbRefs = useRef({})
  const sparkleRefs = useRef([])
  const ambientTweens = useRef([])
  const tlRef = useRef(null)
  const splitRef = useRef(null)
  const hasPlayedOnce = useRef(false)
  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (reducedMotion.current) {
      gsap.set(cakeRef.current, { opacity: 1, scale: 1 })
      gsap.set(shadowRef.current, { opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      const heroSection = layerRef.current?.closest('.bakery-hero')
      const headingEl = heroSection?.querySelector('.bakery-hero__title')
      const subtitleEl = heroSection?.querySelector('.bakery-hero__subtitle')
      const actionsEl = heroSection?.querySelector('.bakery-hero__actions')

      // ── kill any running ambient loops (self-spin, crumbs, float, steam, sparkles) ──
      function killAmbient() {
        ambientTweens.current.forEach(t => t.kill && t.kill())
        ambientTweens.current = []
      }

      // ── snap every element back to its pre-entrance hidden state ──
      function resetVisual() {
        Object.values(ingredientRefs.current).forEach(el => {
          if (el) gsap.set(el, { xPercent: -50, yPercent: -50, clearProps: 'transform' })
        })
        sparkleRefs.current.forEach(el => el && gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 }))
        Object.values(crumbRefs.current).forEach(el => el && gsap.set(el, { opacity: 0 }))

        gsap.set(orbitRef.current, { opacity: 1, scale: 1, filter: 'blur(0px)' })
        gsap.set(glowRef.current, { opacity: 0, scale: 0.3 })
        gsap.set(flashRef.current, { opacity: 0 })
        gsap.set(cakeRef.current, { opacity: 0, scale: 0.6, rotate: -6, y: 0 })
        gsap.set(shadowRef.current, { opacity: 0, scaleX: 0.6 })
        gsap.set(steamRef.current, { opacity: 0 })

        if (splitRef.current) {
          splitRef.current.revert()
          splitRef.current = null
        }
        if (headingEl) gsap.set(headingEl, { opacity: 1 })
        if (subtitleEl) gsap.set(subtitleEl, { opacity: 0, y: 16 })
        if (actionsEl) gsap.set(actionsEl, { opacity: 0, y: 20 })
      }

      // ── build (or rebuild) the full intro timeline ──
      function playIntro(withDelay = 0, includeText = true) {
        if (tlRef.current) tlRef.current.kill()
        killAmbient()
        resetVisual()

        Object.values(ingredientRefs.current).forEach(el => {
          if (el) gsap.set(el, { xPercent: -50, yPercent: -50 })
        })

        const tl = gsap.timeline({ delay: withDelay })
        tlRef.current = tl

        tl.to(glowRef.current, { opacity: 1, scale: 1, duration: 1.2, ease: 'luxeOut' })

        INGREDIENTS.forEach(cfg => {
          const el = ingredientRefs.current[cfg.id]
          if (!el) return

          const finalX = orbitX(cfg.angle, ORBIT_RADIUS)
          const finalY = orbitY(cfg.angle, ORBIT_RADIUS)

          gsap.set(el, {
            opacity: 0,
            x: finalX + cfg.from.x,
            y: finalY + cfg.from.y,
            rotate: cfg.from.rotate,
            scale: cfg.from.scale
          })

          const path = cfg.viaSpiral
            ? [...cfg.viaSpiral.map(v => ({ x: finalX + v.x, y: finalY + v.y })), { x: finalX, y: finalY }]
            : [{ x: finalX + cfg.via.x, y: finalY + cfg.via.y }, { x: finalX, y: finalY }]

          tl.to(
            el,
            {
              opacity: 1,
              scale: 1,
              rotate: cfg.rotateTo ?? 0,
              motionPath: { path, curviness: 1.5, autoRotate: false },
              duration: 1.1,
              ease: cfg.settleBounce ? 'back.out(1.5)' : 'luxeOut'
            },
            cfg.entranceAt
          )

          tl.call(() => {
            ambientTweens.current.push(
              gsap.to(el, {
                rotate: `+=${cfg.rotateTo ? 40 : 360}`,
                duration: cfg.spinDuration,
                ease: 'none',
                repeat: -1
              })
            )
          }, [], cfg.entranceAt + 1.1)
        })

        const settledAt = 2.8 + 1.1 + 0.2

        const orbitProxy = { angle: 0, radiusScale: 1 }
        const orbitTargets = INGREDIENTS.map(cfg => ({
          el: ingredientRefs.current[cfg.id],
          baseAngle: cfg.angle
        }))

        tl.to(
          orbitProxy,
          {
            angle: 720,
            radiusScale: 0.35,
            duration: 3.4,
            ease: 'power2.in',
            onUpdate: () => {
              const r = ORBIT_RADIUS * orbitProxy.radiusScale
              orbitTargets.forEach(({ el, baseAngle }) => {
                if (!el) return
                const a = baseAngle + orbitProxy.angle
                gsap.set(el, { x: orbitX(a, r), y: orbitY(a, r) })
              })
            }
          },
          settledAt
        )
        tl.to(glowRef.current, { opacity: 1.5, duration: 2, ease: 'luxeInOut' }, settledAt)

        const collapseAt = settledAt + 3.4

        tl.to(orbitRef.current, { filter: 'blur(6px)', duration: 0.35, ease: 'power1.in' }, collapseAt)
        sparkleRefs.current.forEach((el, i) => {
          if (!el) return
          const a = (i / SPARKLE_COUNT) * 360
          tl.fromTo(
            el,
            { x: 0, y: 0, opacity: 0, scale: 0.4 },
            { x: orbitX(a, 100), y: orbitY(a, 100), opacity: 1, scale: 1, duration: 0.5, ease: 'luxeOut' },
            collapseAt
          ).to(el, { opacity: 0, duration: 0.45, ease: 'power1.in' }, collapseAt + 0.35)
        })
        tl.to(flashRef.current, { opacity: 0.9, duration: 0.18, ease: 'power1.in' }, collapseAt + 0.15)
        tl.to(flashRef.current, { opacity: 0, duration: 0.5, ease: 'power2.out' }, collapseAt + 0.33)
        tl.to(
          orbitRef.current,
          { opacity: 0, scale: 0.4, filter: 'blur(14px)', duration: 0.5, ease: 'power2.in' },
          collapseAt + 0.15
        )
        tl.to(glowRef.current, { scale: 2, opacity: 0, duration: 0.6, ease: 'power2.out' }, collapseAt + 0.2)

        const revealAt = collapseAt + 0.55
        tl.to(cakeRef.current, { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: 'back.out(1.4)' }, revealAt)
        tl.to(shadowRef.current, { opacity: 1, scaleX: 1, duration: 0.7, ease: 'luxeOut' }, revealAt + 0.15)
        tl.to(steamRef.current, { opacity: 0.7, duration: 1, ease: 'luxeInOut' }, revealAt + 0.5)

        tl.call(() => startAmbientLoops(), [], revealAt + 0.6)

        if (headingEl) {
          const split = new SplitText(headingEl, { type: 'lines', linesClass: 'bakery-hero__split-line' })
          splitRef.current = split
          gsap.set(split.lines, { opacity: 0, y: 28 })
          tl.to(split.lines, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'luxeOut' }, revealAt + 1.0)
        }
        if (subtitleEl) {
          tl.to(subtitleEl, { opacity: 1, y: 0, duration: 0.6, ease: 'luxeOut' }, revealAt + 1.5)
        }
        if (actionsEl) {
          tl.to(actionsEl, { opacity: 1, y: 0, duration: 0.6, ease: 'luxeOut' }, revealAt + 1.7)
        }

        return tl
      }

      function startAmbientLoops() {
        function dropRandomCrumbs() {
          const count = 2 + Math.round(Math.random())
          const slots = [...CRUMB_SLOTS].sort(() => Math.random() - 0.5).slice(0, count)
          slots.forEach(slot => {
            const el = crumbRefs.current[slot.id]
            if (!el) return
            gsap.fromTo(
              el,
              { opacity: 0, y: -16, rotate: 0 },
              { opacity: 0.9, y: 0, rotate: 60 + Math.random() * 120, duration: 0.6, ease: 'bounce.out' }
            )
            gsap.to(el, { opacity: 0, duration: 0.5, delay: 2 + Math.random() })
          })
        }
        const crumbInterval = () => {
          dropRandomCrumbs()
          const t = gsap.delayedCall(4 + Math.random() * 4, crumbInterval)
          ambientTweens.current.push(t)
        }
        crumbInterval()

        sparkleRefs.current.forEach((el, i) => {
          if (!el) return
          gsap.set(el, {
            x: (Math.random() - 0.5) * 180,
            y: (Math.random() - 0.5) * 180,
            opacity: 0,
            scale: 0.5 + Math.random() * 0.5
          })
          ambientTweens.current.push(
            gsap.to(el, {
              y: '-=45',
              opacity: Math.random() > 0.5 ? 0.9 : 0,
              rotate: 180,
              duration: 3 + Math.random() * 3,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
              delay: i * 0.2
            })
          )
        })

        ambientTweens.current.push(
          gsap.to(cakeRef.current, { y: -8, duration: 4, ease: 'luxeInOut', yoyo: true, repeat: -1 })
        )

        ambientTweens.current.push(
          gsap.to(steamRef.current, {
            y: -14,
            opacity: 0.4,
            duration: 2.6,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
          })
        )
      }

      // ── initial paint (first time hero is on screen, e.g. page load) ──
      playIntro(startDelay)
      hasPlayedOnce.current = true

      // ── replay whenever the hero re-enters the viewport, either
      //    direction (scrolling down onto it, or scrolling back up onto it) ──
      const replayTrigger = ScrollTrigger.create({
        trigger: heroRef?.current || layerRef.current,
        start: 'top 75%',
        onEnter: () => {
          if (hasPlayedOnce.current) playIntro(0)
        },
        onEnterBack: () => {
          playIntro(0)
        }
      })

      // ── scroll: zoom, cake rotate, background parallax slower ──
      let scrollZoomTrigger
      if (heroRef?.current) {
        const bg = heroSection?.querySelector('.bakery-hero__bg')
        scrollZoomTrigger = ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: self => {
            const p = self.progress
            gsap.set(cakeRef.current, { scale: 1 + p * 0.08, rotate: p * 6 })
            if (bg) gsap.set(bg, { scale: 1 + p * 0.03 })
          }
        })
      }

      return () => {
        replayTrigger?.kill()
        scrollZoomTrigger?.kill()
      }
    }, layerRef)

    // ── mouse interaction: parallax + light reflection, max 5deg cake tilt ──
    const heroEl = heroRef?.current
    let quickCake, quickIngredients, quickSparkles, quickLight
    if (heroEl && !reducedMotion.current) {
      quickCake = {
        x: gsap.quickTo(cakeRef.current, 'x', { duration: 0.6, ease: 'power3' }),
        y: gsap.quickTo(cakeRef.current, 'y', { duration: 0.6, ease: 'power3' }),
        rot: gsap.quickTo(cakeRef.current, 'rotate', { duration: 0.6, ease: 'power3' })
      }
      quickIngredients = Object.values(ingredientRefs.current)
        .filter(Boolean)
        .map(el => ({
          x: gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' }),
          y: gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })
        }))
      quickSparkles = sparkleRefs.current
        .filter(Boolean)
        .map(el => ({
          x: gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3' }),
          y: gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3' })
        }))
      quickLight = lightRef.current && {
        x: gsap.quickTo(lightRef.current, 'x', { duration: 0.4, ease: 'power2' }),
        y: gsap.quickTo(lightRef.current, 'y', { duration: 0.4, ease: 'power2' })
      }

      const handleMove = e => {
        const b = heroEl.getBoundingClientRect()
        const nx = (e.clientX - b.left) / b.width - 0.5
        const ny = (e.clientY - b.top) / b.height - 0.5

        quickCake.x(nx * 10)
        quickCake.y(ny * 8)
        quickCake.rot(nx * 5)

        quickIngredients.forEach((q, i) => {
          q.x(nx * 6 * (i % 2 === 0 ? 1 : -1))
          q.y(ny * 5)
        })
        quickSparkles.forEach(q => {
          q.x(nx * 14)
          q.y(ny * 14)
        })
        quickLight?.x(nx * 60)
        quickLight?.y(ny * 60)
      }
      const handleLeave = () => {
        quickCake.x(0); quickCake.y(0); quickCake.rot(0)
        quickIngredients.forEach(q => { q.x(0); q.y(0) })
        quickSparkles.forEach(q => { q.x(0); q.y(0) })
        quickLight?.x(0); quickLight?.y(0)
      }
      heroEl.addEventListener('mousemove', handleMove)
      heroEl.addEventListener('mouseleave', handleLeave)

      return () => {
        heroEl.removeEventListener('mousemove', handleMove)
        heroEl.removeEventListener('mouseleave', handleLeave)
        ambientTweens.current.forEach(t => t.kill && t.kill())
        if (tlRef.current) tlRef.current.kill()
        if (splitRef.current) splitRef.current.revert()
        ctx.revert()
      }
    }

    return () => {
      ambientTweens.current.forEach(t => t.kill && t.kill())
      if (tlRef.current) tlRef.current.kill()
      if (splitRef.current) splitRef.current.revert()
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="bakery-hero__cake-layer" ref={layerRef}>
      <div className="bakery-hero__cake-light" ref={lightRef} />
      <div className="bakery-hero__cake-glow" ref={glowRef} />

      <div className="bakery-hero__cake-orbit" ref={orbitRef}>
        {INGREDIENTS.map(cfg => (
          <img
            key={cfg.id}
            ref={el => (ingredientRefs.current[cfg.id] = el)}
            src={cfg.src}
            alt={cfg.alt}
            className="bakery-hero__cake-ingredient"
            style={{ top: '50%', left: '50%', width: cfg.size, height: cfg.size }}
          />
        ))}
      </div>

      {/* <img ref={steamRef} src={overlaySteam} alt="" className="bakery-hero__cake-steam" /> */}

      <img
        ref={cakeRef}
        src={cakeMain}
        alt="Premium handcrafted plum cake"
        className="bakery-hero__cake-main"
      />

      <div className="bakery-hero__cake-shadow" ref={shadowRef} />

      {CRUMB_SLOTS.map(c => (
        <img
          key={c.id}
          ref={el => (crumbRefs.current[c.id] = el)}
          src={overlayCrumbs}
          alt=""
          className="bakery-hero__cake-crumb"
          style={{ top: c.top, left: c.left, width: c.size, height: c.size }}
        />
      ))}

      <div className="bakery-hero__cake-sparkles">
        {Array.from({ length: SPARKLE_COUNT }).map((_, i) => (
          <span key={i} ref={el => (sparkleRefs.current[i] = el)} className="bakery-hero__cake-sparkle-dot" />
        ))}
      </div>

      <div className="bakery-hero__cake-flash" ref={flashRef} />
    </div>
  )
}