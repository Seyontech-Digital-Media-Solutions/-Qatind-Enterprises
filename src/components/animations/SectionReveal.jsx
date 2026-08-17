import { motion } from 'framer-motion'
import { fadeUp } from './motionVariants'

export default function SectionReveal({
  children,
  className = '',
  as = 'section',
  id,
  delay = 0,
  once = true,
  margin = '-80px'
}) {
  const Component = motion[as] || motion.section

  return (
    <Component
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={{
        hidden: {},
        visible: { transition: { delay, staggerChildren: 0.08 } }
      }}
    >
      {children}
    </Component>
  )
}

export function RevealItem({ children, className = '', variant = fadeUp }) {
  return (
    <motion.div className={className} variants={variant}>
      {children}
    </motion.div>
  )
}