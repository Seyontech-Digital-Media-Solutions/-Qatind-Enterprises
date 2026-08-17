import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

export default function MouseGlow({ className = 'mouse-glow' }) {
  const reducedMotion = useReducedMotion()

  const x1 = useMotionValue(-600); const y1 = useMotionValue(-600)
  const sx1 = useSpring(x1, { stiffness: 55, damping: 20, mass: 0.6 })
  const sy1 = useSpring(y1, { stiffness: 55, damping: 20, mass: 0.6 })

  const x2 = useMotionValue(-600); const y2 = useMotionValue(-600)
  const sx2 = useSpring(x2, { stiffness: 28, damping: 18, mass: 1.2 })
  const sy2 = useSpring(y2, { stiffness: 28, damping: 18, mass: 1.2 })

  const x3 = useMotionValue(-600); const y3 = useMotionValue(-600)
  const sx3 = useSpring(x3, { stiffness: 14, damping: 16, mass: 1.8 })
  const sy3 = useSpring(y3, { stiffness: 14, damping: 16, mass: 1.8 })

  const rafRef = useRef(null)
  const targetRef = useRef({ x: -600, y: -600 })

  useEffect(() => {
    if (reducedMotion) return
    const handleMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        x1.set(targetRef.current.x); y1.set(targetRef.current.y)
        x2.set(targetRef.current.x); y2.set(targetRef.current.y)
        x3.set(targetRef.current.x); y3.set(targetRef.current.y)
        rafRef.current = null
      })
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [x1, y1, x2, y2, x3, y3, reducedMotion])

  if (reducedMotion) return null

  return (
    <>
      <motion.div className={`${className} ${className}--saffron`} style={{ x: sx1, y: sy1 }} aria-hidden="true" />
      <motion.div className={`${className} ${className}--red`}     style={{ x: sx2, y: sy2 }} aria-hidden="true" />
      <motion.div className={`${className} ${className}--green`}   style={{ x: sx3, y: sy3 }} aria-hidden="true" />
    </>
  )
}