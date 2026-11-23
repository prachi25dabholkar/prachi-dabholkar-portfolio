import { useCallback, useState } from 'react'
import { motion, AnimatePresence, useSpring } from 'motion/react'
import { ArrowUpRight, X, Map, Network, ChartBar } from 'lucide-react'
import { projects } from '../data'
import { Section, Chip, Lightbox, useOverlay, useFinePointer, EASE_OUT } from './ui'

const cats = ['All', ...new Set(projects.map((p) => p.category))]
const count = (c) => (c === 'All' ? projects.length : projects.filter((p) => p.category === c).length)
const fallbackIcon = { 'Health Systems': Network, Epidemiology: ChartBar, Geospatial: Map }
const TILT = 6 // max degrees of card tilt

function Cover({ p }) {
  if (p.cover) return <img src={p.cover} alt="" loading="lazy" className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105" />
  const Icon = fallbackIcon[p.category] || Network
  return (
    <div className="relative grid size-full place-items-center bg-linear-to-br from-teal to-teal-2">
      <Icon size={72} strokeWidth={1} className="text-paper/30 transition-transform duration-700 group-hover:scale-110" />
    </div>
  )
}

function Card({ p, big, index, onOpen }) {
  const fine = useFinePointer()
  const rx = useSpring(0, { stiffness: 180, damping: 18 })
  const ry = useSpring(0, { stiffness: 180, damping: 18 })
  const move = (e) => {
    if (!fine) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * TILT * 2)
    rx.set((0.5 - py) * TILT * 2)
    e.currentTarget.style.setProperty('--mx', `${px * 100}%`)
    e.currentTarget.style.setProperty('--my', `${py * 100}%`)
  }
  const leave = () => { rx.set(0); ry.set(0) }
  return (
    <motion.div className={big ? 'md:col-span-2 md:row-span-2' : ''} style={{ perspective: 1000 }}
      initial={{ opacity: 0, transform: 'translateY(24px)' }} whileInView={{ opacity: 1, transform: 'translateY(0px)' }} viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay: (index % 3) * 0.06 }}>
      <motion.button onClick={onOpen} onPointerMove={move} onPointerLeave={leave} style={{ rotateX: rx, rotateY: ry }}
        className="group relative flex size-full flex-col overflow-hidden rounded-3xl bg-paper text-left shadow-sm ring-1 ring-ink/5 transition-shadow duration-300 hover:shadow-2xl hover:shadow-teal/15">
        <div className={`relative overflow-hidden ${big ? 'aspect-[16/10] md:aspect-auto md:flex-1' : 'aspect-[16/10]'}`}>
          <Cover p={p} />
          <span className="absolute top-4 left-4 rounded-full bg-paper/90 px-3 py-1 text-xs font-medium backdrop-blur">{p.category}</span>
          <span className="absolute top-4 right-4 grid size-10 translate-y-1 place-items-center rounded-full bg-paper text-ink opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight size={18} /></span>
        </div>
        <div className="p-6">
          <p className="text-xs font-medium tracking-wide text-coral uppercase">{p.org} · {p.year}</p>
          <h3 className={`mt-2 font-serif leading-tight ${big ? 'text-3xl' : 'text-xl'}`}>{p.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted">{p.summary}</p>
        </div>
        {/* cursor spotlight */}
        <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(255 255 255 / .18), transparent 60%)' }} />
      </motion.button>
    </motion.div>
  )
}

function CaseStudy({ p, onClose }) {
  const [lb, setLb] = useState(null)
  useOverlay(lb === null, onClose)
  const items = p.gallery.map((src) => ({ src, cap: p.title }))
  return (
    <motion.div role="dialog" aria-modal="true" aria-label={p.title} className="fixed inset-0 z-50 overflow-y-auto bg-ink/60 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={onClose}>
      <motion.article initial={{ opacity: 0, transform: 'translateY(48px) scale(0.98)' }} animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
        exit={{ opacity: 0, transform: 'translateY(32px) scale(0.98)' }} transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
        onClick={(e) => e.stopPropagation()} className="relative mx-auto my-6 max-w-4xl overflow-hidden rounded-3xl bg-paper sm:my-12">
        <button autoFocus aria-label="Close case study" onClick={onClose} className="absolute top-4 right-4 z-10 rounded-full bg-paper/90 p-2.5 shadow transition-colors hover:bg-paper"><X size={20} /></button>
        <div className="group relative h-64 overflow-hidden sm:h-80">
          <motion.div className="size-full" initial={{ transform: 'scale(1.12)' }} animate={{ transform: 'scale(1)' }} transition={{ duration: 1.2, ease: EASE_OUT }}><Cover p={p} /></motion.div>
          <div className="absolute inset-0 bg-linear-to-t from-ink/80 to-transparent" />
          <div className="absolute right-6 bottom-6 left-6 text-paper">
            <p className="text-xs font-medium tracking-wide text-sun uppercase">{p.org} · {p.year}</p>
            <h3 className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">{p.title}</h3>
          </div>
        </div>
        <div className="p-6 sm:p-10">
          <p className="font-serif text-xl text-teal italic">{p.hook}</p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {p.metrics.map(([v, l], i) => (
              <motion.div key={l} className="rounded-2xl bg-paper-2 p-4 text-center"
                initial={{ opacity: 0, transform: 'translateY(12px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ delay: 0.2 + i * 0.06, duration: 0.5, ease: EASE_OUT }}>
                <p className="font-serif text-2xl text-teal sm:text-3xl">{v}</p><p className="text-xs text-muted">{l}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 space-y-4 leading-relaxed text-ink/80">{p.story.map((s) => <p key={s}>{s}</p>)}</div>
          {p.quote && <blockquote className="mt-8 border-l-2 border-coral pl-5 font-serif text-xl italic">&ldquo;{p.quote}&rdquo;</blockquote>}
          {items.length > 0 && (
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {items.map((it, i) => (
                <button key={it.src} onClick={() => setLb(i)} className="group aspect-[4/3] overflow-hidden rounded-xl bg-paper-2" aria-label={`Open image ${i + 1}`}>
                  <img src={it.src} alt="" loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </button>
              ))}
            </div>
          )}
          {p.link && (
            <a href={p.link.href} target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 font-medium text-paper transition-colors hover:bg-teal-2">
              {p.link.label} <ArrowUpRight size={18} />
            </a>
          )}
        </div>
      </motion.article>
      <div onClick={(e) => e.stopPropagation()}><Lightbox items={items} index={lb} onClose={() => setLb(null)} onIndex={setLb} /></div>
    </motion.div>
  )
}

export default function Projects() {
  const [cat, setCat] = useState('All')
  const [active, setActive] = useState(null)
  const close = useCallback(() => setActive(null), [])
  const list = projects.filter((p) => cat === 'All' || p.category === cat)
  return (
    <Section id="work" eyebrow="Selected work" title="Case studies in research, mapping and community health."
      intro="From 3,400-household surveys to disease atlases and health-system policy. Open any project for the full story.">
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {cats.map((c) => <Chip key={c} data-group="work" count={count(c)} active={cat === c} onClick={() => setCat(c)}>{c}</Chip>)}
      </div>
      {/* Crossfade the whole grid per filter: no per-card layout measuring, so filtering stays smooth. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={cat} className="grid gap-5 md:grid-cols-3" exit={{ opacity: 0, transition: { duration: 0.15 } }}>
          {list.map((p, i) => <Card key={p.id} p={p} index={i} big={i === 0 && list.length > 2} onOpen={() => setActive(p)} />)}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>{active && <CaseStudy key={active.id} p={active} onClose={close} />}</AnimatePresence>
    </Section>
  )
}
