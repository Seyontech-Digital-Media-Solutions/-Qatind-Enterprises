export const easeLuxury = [0.16, 1, 0.3, 1]
export const easeSpring = { type: 'spring', stiffness: 350, damping: 25 }

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeLuxury } }
}

export const fadeLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: easeLuxury } }
}

export const fadeRight = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: easeLuxury } }
}

export const blurReveal = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 24 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.8, ease: easeLuxury } }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: easeLuxury } }
}

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
}

export const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.02 } }
}

export const textRevealContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } }
}

export const textRevealWord = {
  hidden: { opacity: 0, y: '100%' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeLuxury } }
}

// Trending Micro-Animation Variants
export const hoverSpring = {
  hover: { y: -8, scale: 1.02, transition: easeSpring },
  tap: { scale: 0.98 }
}

export const pulseGlow = {
  initial: { opacity: 0.7, scale: 0.98 },
  animate: {
    opacity: [0.7, 1, 0.7],
    scale: [0.98, 1.03, 0.98],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
  }
}

export const floatY = (delay = 0) => ({
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
      delay
    }
  }
})

export const badgeBounce = {
  hidden: { opacity: 0, scale: 0.5, y: 15 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 20 } }
}