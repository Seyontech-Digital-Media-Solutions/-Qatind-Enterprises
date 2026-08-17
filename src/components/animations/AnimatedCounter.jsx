import { useState, useEffect } from 'react'

export default function AnimatedCounter({ value, suffix = '', inView, reducedMotion, className = '' }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return undefined
    if (reducedMotion) {
      setCount(value)
      return undefined
    }

    let start = 0
    const duration = 2200
    const step = value / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [inView, value, reducedMotion])

  const display = value >= 1000 ? `${Math.round(count / 1000)}K` : count

  return (
    <span className={className}>
      {display}{suffix}
    </span>
  )
}