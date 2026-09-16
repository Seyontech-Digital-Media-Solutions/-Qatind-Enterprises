import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

import flair2 from '../assets/footer/flair-2.png'
import flair3 from '../assets/footer/flair-3.png'
import flair4 from '../assets/footer/flair-4.png'
import flair5 from '../assets/footer/flair-5.png'
import flair6 from '../assets/footer/flair-6.png'
import flair7 from '../assets/footer/flair-7.png'
import flair8 from '../assets/footer/flair-8.png'
import flair9 from '../assets/footer/flair-9.png'
import flair10 from '../assets/footer/flair-10.png'
import flair11 from '../assets/footer/flair-11.png'
import flair12 from '../assets/footer/flair-12.png'
import flair13 from '../assets/footer/flair-13.png'
import flair14 from '../assets/footer/flair-14.png'
import flair15 from '../assets/footer/flair-15.png'
import flair16 from '../assets/footer/flair-16.png'
import flair17 from '../assets/footer/flair-17.png'
import flair18 from '../assets/footer/flair-18.png'
import flair19 from '../assets/footer/flair-19.png'
import flair20 from '../assets/footer/flair-20.png'
import flair21 from '../assets/footer/flair-21.png'
import flair22 from '../assets/footer/flair-22.png'

const flairImages = [
  flair2,
  flair3,
  flair4,
  flair5,
  flair6,
  flair7,
  flair8,
  flair9,
  flair10,
  flair11,
  flair12,
  flair13,
  flair14,
  flair15,
  flair16,
  flair17,
  flair18,
  flair19,
  flair20,
  flair21,
  flair22,
]

export default function FooterParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let cw = (canvas.width = canvas.offsetWidth)
    let ch = (canvas.height = canvas.offsetHeight)
    let radius = Math.max(cw, ch)

    const particles = Array.from({ length: 99 }, (_, i) => {
      const img = new Image()
      img.src = flairImages[i % flairImages.length]

      return {
        x: 0,
        y: 0,
        scale: 0,
        rotate: 0,
        img,
      }
    })

    const draw = () => {
      particles.sort((a, b) => a.scale - b.scale)

      ctx.clearRect(0, 0, cw, ch)

      particles.forEach((p) => {
        if (!p.img.complete) return

        ctx.translate(cw / 2, ch / 2)
        ctx.rotate(p.rotate)

        ctx.drawImage(
          p.img,
          p.x,
          p.y,
          p.img.width * p.scale,
          p.img.height * p.scale
        )

        ctx.resetTransform()
      })
    }

    const tl = gsap.timeline({
      onUpdate: draw,
      repeat: -1,
    })

    tl.fromTo(
      particles,
      {
        x: (i) => {
          const angle =
            (i / particles.length) * Math.PI * 2 - Math.PI / 2

          return Math.cos(angle * 10) * radius
        },

        y: (i) => {
          const angle =
            (i / particles.length) * Math.PI * 2 - Math.PI / 2

          return Math.sin(angle * 10) * radius
        },

        scale: 1.1,
        rotate: 0,
      },

      {
        duration: 5,
        ease: 'sine.inOut',

        x: 0,
        y: 0,
        scale: 0,
        rotate: -3,

        stagger: {
          each: -0.05,
          repeat: -1,
        },
      }
    )

    const resize = () => {
      cw = canvas.width = canvas.offsetWidth
      ch = canvas.height = canvas.offsetHeight
      radius = Math.max(cw, ch)

      tl.invalidate()
    }

    window.addEventListener('resize', resize)

    const pointerUp = () => {
      gsap.to(tl, {
        timeScale: tl.isActive() ? 0 : 1,
        duration: 0.3,
      })
    }

    canvas.addEventListener('pointerup', pointerUp)

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointerup', pointerUp)
      tl.kill()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="footer-particles"
      aria-hidden="true"
    />
  )
}