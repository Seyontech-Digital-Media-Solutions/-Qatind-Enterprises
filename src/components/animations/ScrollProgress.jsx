import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress({ className = 'scroll-progress' }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className={className}
      style={{ scaleX, transformOrigin: '0%' }}
      aria-hidden="true"
    />
  )
}