import { useEffect, useRef } from 'react'

export default function MouseGlowCursor() {
  const blobRed     = useRef(null)
  const blobSaffron = useRef(null)
  const blobGreen   = useRef(null)

  useEffect(() => {
    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const state = {
      tx: window.innerWidth / 2,  ty: window.innerHeight / 2,
      rx: window.innerWidth / 2,  ry: window.innerHeight / 2,
      sfx: window.innerWidth / 2, sfy: window.innerHeight / 2,
      gx: window.innerWidth / 2,  gy: window.innerHeight / 2,
    }

    const onMove = (e) => { state.tx = e.clientX; state.ty = e.clientY }
    window.addEventListener('mousemove', onMove, { passive: true })

    let raf
    const tick = () => {
      // Three different lerp speeds → colors peel apart on fast moves
      state.rx  += (state.tx - state.rx)  * 0.16
      state.ry  += (state.ty - state.ry)  * 0.16
      state.sfx += (state.tx - state.sfx) * 0.09
      state.sfy += (state.ty - state.sfy) * 0.09
      state.gx  += (state.tx - state.gx)  * 0.045
      state.gy  += (state.ty - state.gy)  * 0.045

      // Blobs are position:fixed — move them directly with left/top via transform
      // Subtract half their size so they're centered on the cursor
      if (blobRed.current)
        blobRed.current.style.transform = `translate3d(${state.rx - 200}px, ${state.ry - 200}px, 0)`
      if (blobSaffron.current)
        blobSaffron.current.style.transform = `translate3d(${state.sfx - 150}px, ${state.sfy - 150}px, 0)`
      if (blobGreen.current)
        blobGreen.current.style.transform = `translate3d(${state.gx - 240}px, ${state.gy - 240}px, 0)`

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={blobRed}     className="mgc-red"     aria-hidden="true" />
      <div ref={blobSaffron} className="mgc-saffron" aria-hidden="true" />
      <div ref={blobGreen}   className="mgc-green"   aria-hidden="true" />
    </>
  )
}
