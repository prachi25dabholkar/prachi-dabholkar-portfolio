import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, animate, useSpring, useReducedMotion } from 'motion/react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

// Strong ease-out for entrances (Emil Kowalski / animate skill token).
export const EASE_OUT = [0.23, 1, 0.32, 1]

export function Reveal({ children, delay = 0, className = '', y = 24 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, transform: `translateY(${y}px)` }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}

// Masked text reveal: each word slides up from behind its own clip line.
export function MaskText({ children, delay = 0, stagger = 0.045, animateOnMount = false }) {
  const trigger = animateOnMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '-60px' } }
  const word = (content, i) => (
    <span key={i} className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
      <motion.span className="inline-block" variants={{ hide: { transform: 'translateY(110%)' }, show: { transform: 'translateY(0%)' } }}
        transition={{ duration: 0.9, ease: EASE_OUT, delay: delay + i * stagger }}>
        {content}
      </motion.span>
    </span>
  )
  if (typeof children !== 'string') return <motion.span className="block" initial="hide" {...trigger}>{word(children, 0)}</motion.span>
  const words = children.split(' ')
  return (
    <motion.span initial="hide" {...trigger} aria-label={children}>
      {words.map((w, i) => <span key={i} aria-hidden>{word(w, i)}{i < words.length - 1 ? ' ' : ''}</span>)}
    </motion.span>
  )
}

// Image that wipes in with clip-path while the photo settles from a slight zoom.
export function ClipImage({ src, alt = '', className = '', imgClassName = '', delay = 0 }) {
  return (
    <motion.div className={`overflow-hidden ${className}`}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }} whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 1.1, ease: EASE_OUT, delay }}>
      <motion.img src={src} alt={alt} loading="lazy" className={`size-full object-cover ${imgClassName}`}
        initial={{ transform: 'scale(1.2)' }} whileInView={{ transform: 'scale(1)' }} viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE_OUT, delay }} />
    </motion.div>
  )
}

// True only on mouse/trackpad devices without reduced motion: hover-driven motion is gated on this.
export function useFinePointer() {
  const reduce = useReducedMotion()
  const [fine] = useState(() => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  return fine && !reduce
}

export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const fine = useFinePointer()
  const spring = { stiffness: 220, damping: 16, mass: 0.4 }
  const x = useSpring(0, spring)
  const y = useSpring(0, spring)
  const move = (e) => {
    if (!fine) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  return (
    <motion.span ref={ref} style={{ x, y }} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0) }} className={`inline-block ${className}`}>
      {children}
    </motion.span>
  )
}

export function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.8, ease: EASE_OUT, onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value])
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>
}

export function Section({ id, eyebrow, title, intro, children, className = '' }) {
  return (
    <section id={id} className={`px-4 py-24 sm:px-8 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <Reveal y={12}><p className="mb-3 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-coral uppercase"><span className="h-px w-8 bg-current" />{eyebrow}</p></Reveal>
        <h2 className="max-w-3xl font-serif text-4xl leading-[1.05] font-medium text-balance md:text-6xl"><MaskText>{title}</MaskText></h2>
        {intro && <Reveal delay={0.2}><p className="mt-5 max-w-2xl text-lg text-muted">{intro}</p></Reveal>}
        <div className="mt-14">{children}</div>
      </div>
    </section>
  )
}

// Locks page scroll and closes on Escape while an overlay is open.
export function useOverlay(open, onClose, onKey) {
  const keyRef = useRef(onKey)
  keyRef.current = onKey
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const h = (e) => (e.key === 'Escape' ? onClose() : keyRef.current?.(e))
    window.addEventListener('keydown', h)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', h) }
  }, [open, onClose])
}

const SWIPE = 80 // px of horizontal drag that counts as a swipe

// layoutPrefix: when the grid tiles use layoutId `${layoutPrefix}${src}`, the image morphs from its tile.
export function Lightbox({ items, index, onClose, onIndex, layoutPrefix }) {
  const open = index !== null
  const go = (d) => onIndex((index + d + items.length) % items.length)
  useOverlay(open, onClose, (e) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) })
  const item = open ? items[index] : null
  // Only the photo that was tapped morphs from/to its tile; arrow/swipe navigation crossfades.
  // (Swapping layoutId elements mid-dialog leaves the exit animation hanging.)
  const startRef = useRef(null)
  if (!open) startRef.current = null
  else if (startRef.current === null) startRef.current = index
  const shared = layoutPrefix && open && index === startRef.current
  return (
    <AnimatePresence>
      {open && (
        <motion.div role="dialog" aria-modal="true" aria-label="Image viewer" className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-4" onClick={onClose}>
          <motion.div className="absolute inset-0 bg-ink/95 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} />
          <figure className="relative flex max-h-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence initial={false} mode="popLayout">
            <motion.img key={item.src} src={item.src} alt={item.cap || ''}
              layoutId={shared ? layoutPrefix + item.src : undefined}
              initial={shared ? false : { opacity: 0, transform: 'scale(0.96)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
              drag={items.length > 1 ? 'x' : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.5}
              onDragEnd={(_, info) => { if (info.offset.x < -SWIPE) go(1); else if (info.offset.x > SWIPE) go(-1) }}
              className="max-h-[70vh] w-auto cursor-grab touch-pan-y rounded-xl object-contain active:cursor-grabbing" draggable={false} />
            </AnimatePresence>
            <motion.figcaption initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-4 text-center text-sm text-paper/80">
              {item.cap} <span className="ml-2 text-paper/40 tabular-nums">{index + 1} / {items.length}</span>
            </motion.figcaption>
          </figure>
          {items.length > 1 && (
            <motion.div initial={{ opacity: 0, transform: 'translateY(16px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE_OUT }}
              className="no-scrollbar relative mt-5 flex max-w-full gap-2 overflow-x-auto px-2" onClick={(e) => e.stopPropagation()}>
              {items.map((it, i) => (
                <button key={it.src} onClick={() => onIndex(i)} aria-label={`Show image ${i + 1}`} aria-current={i === index}
                  className={`size-14 shrink-0 overflow-hidden rounded-lg transition-[opacity,transform] duration-200 ${i === index ? 'opacity-100 ring-2 ring-sun' : 'opacity-40 hover:opacity-80'}`}>
                  <img src={it.src} alt="" loading="lazy" className="size-full object-cover" />
                </button>
              ))}
            </motion.div>
          )}
          <button aria-label="Close" onClick={onClose} className="absolute top-4 right-4 rounded-full bg-paper/10 p-3 text-paper transition-colors hover:bg-paper/20"><X size={20} /></button>
          {items.length > 1 && <>
            <button aria-label="Previous image" onClick={(e) => { e.stopPropagation(); go(-1) }} className="absolute left-3 hidden rounded-full bg-paper/10 p-3 text-paper transition-colors hover:bg-paper/20 sm:block"><ChevronLeft size={22} /></button>
            <button aria-label="Next image" onClick={(e) => { e.stopPropagation(); go(1) }} className="absolute right-3 hidden rounded-full bg-paper/10 p-3 text-paper transition-colors hover:bg-paper/20 sm:block"><ChevronRight size={22} /></button>
          </>}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Chip({ active, children, count, ...props }) {
  return (
    <button {...props} aria-pressed={active}
      className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 active:scale-[0.97] ${active ? 'border-teal text-paper' : 'border-ink/15 text-ink hover:border-teal hover:text-teal'}`}>
      {active && <motion.span layoutId={`chip-${props['data-group'] || 'g'}`} className="absolute inset-0 -z-0 rounded-full bg-teal" transition={{ type: 'spring', duration: 0.45, bounce: 0.2 }} />}
      <span className="relative">{children}{count != null && <span className={`ml-1.5 text-xs ${active ? 'text-paper/70' : 'text-muted'}`}>{count}</span>}</span>
    </button>
  )
}
