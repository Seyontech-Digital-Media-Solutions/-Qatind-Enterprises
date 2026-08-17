import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Renders as <motion.div> — never <motion.a> — so nesting a <Link> inside
// (which renders as <a>) never produces the invalid <a> inside <a> error.
export default function MagneticButton({
  children,
  className = '',
  style = {},
  // Explicitly destructure and DISCARD href/onClick so they are never
  // forwarded to the div (they belong on the child <Link> or <a> anyway).
  href: _href,
  onClick: _onClick,
  ...props
}) {
  const ref = useRef(null)
  const reducedMotion = useReducedMotion()

  const handleMove = (e) => {
    if (reducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate3d(${x * 0.15}px, ${y * 0.2}px, 0)`
  }

  const handleLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate3d(0, 0, 0)'
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ display: 'inline-flex', ...style }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={reducedMotion ? {} : { scale: 1.03 }}
      whileTap={reducedMotion ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}