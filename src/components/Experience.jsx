import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll } from 'motion/react'
import { Plus } from 'lucide-react'
import { experience } from '../data'
import { Section, Chip } from './ui'

const regions = ['All', 'Canada', 'India']

export default function Experience() {
  const [region, setRegion] = useState('All')
  const [open, setOpen] = useState(0)
  const list = experience.filter((e) => region === 'All' || e.region === region)
  const track = useRef(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start 75%', 'end 60%'] })

  return (
    <Section id="experience" className="bg-paper-2/60" eyebrow="Experience" title="From field operations to health-system research."
      intro="Eight roles across two countries, each one moving closer to the systems that shape population health. Tap a role to see what I did.">
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by country">
        {regions.map((r) => <Chip key={r} data-group="exp" active={region === r} onClick={() => { setRegion(r); setOpen(0) }}>{r}</Chip>)}
      </div>
      <motion.ol ref={track} layout="position" className="relative pl-6 sm:pl-10">
        <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-ink/15" />
        <motion.span aria-hidden className="absolute inset-y-0 left-0 w-0.5 origin-top bg-linear-to-b from-coral to-teal-2" style={{ scaleY: scrollYProgress }} />
        <AnimatePresence mode="popLayout">
          {list.map((e, i) => {
            const isOpen = open === i
            return (
              <motion.li layout="position" key={e.role + e.org} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.35, delay: i * 0.03 }} className="relative mb-4">
                <span className={`absolute top-6 -left-[31px] size-3 rounded-full ring-4 ring-paper transition-colors sm:-left-[47px] ${isOpen ? 'bg-coral' : 'bg-sage'}`} />
                <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}
                  className={`w-full rounded-2xl border p-5 text-left transition-[background-color,border-color,box-shadow] duration-300 sm:p-6 ${isOpen ? 'border-teal/30 bg-paper shadow-xl shadow-teal/5' : 'border-transparent hover:bg-paper/70'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium tracking-wide text-coral uppercase">{e.period} · {e.region}</p>
                      <h3 className="mt-1 font-serif text-2xl">{e.role}</h3>
                      <p className="text-muted">{e.org}</p>
                    </div>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-ink/15"><Plus size={18} /></motion.span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
                        <ul className="mt-5 space-y-2.5">
                          {e.points.map((p) => <li key={p} className="flex gap-3 text-ink/80"><span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-teal" />{p}</li>)}
                        </ul>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {e.tags.map((t) => <span key={t} className="rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal">{t}</span>)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </motion.ol>
    </Section>
  )
}
