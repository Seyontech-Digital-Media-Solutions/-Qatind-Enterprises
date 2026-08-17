import { motion } from 'framer-motion'
import { textRevealContainer, textRevealWord } from './motionVariants'

export default function TextReveal({ text, className = '', as: Tag = 'span' }) {
  const words = text.split(' ')
  const Component = motion[Tag] || motion.span

  return (
    <Component
      className={className}
      variants={textRevealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className={`${className}__word-wrap`}>
          <motion.span className={`${className}__word`} variants={textRevealWord}>
            {word}
          </motion.span>
          {i < words.length - 1 ? '\u00A0' : null}
        </span>
      ))}
    </Component>
  )
}