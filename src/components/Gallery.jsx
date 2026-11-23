import { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Expand } from 'lucide-react'
import { fieldGallery } from '../data'
import { Section, Chip, Lightbox, EASE_OUT } from './ui'

const tags = ['All', ...new Set(fieldGallery.map((g) => g.tag))]
const count = (t) => (t === 'All' ? fieldGallery.length : fieldGallery.filter((g) => g.tag === t).length)
const spanCls = { big: 'col-span-2 row-span-2', tall: 'row-span-2', wide: 'col-span-2' }
const PREFIX = 'field-'

function Tile({ g, i, onOpen }) {
  return (
    <motion.li className={spanCls[g.span] || ''}
      initial={{ opacity: 0, transform: 'translateY(28px) scale(0.97)' }} whileInView={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
      viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, ease: EASE_OUT, delay: (i % 4) * 0.06 }}>
      <button onClick={onOpen} aria-label={`View photo: ${g.cap}`}
        className="group relative block size-full overflow-hidden rounded-2xl bg-paper-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal">
        {/* hover zoom lives on the wrapper so it never fights the shared-layout transform on the img */}
        <div className="size-full transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]">
          <motion.img layoutId={PREFIX + g.src} src={g.src} alt="" loading="lazy" className="size-full object-cover" />
        </div>
        <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/85 via-ink/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
        <span className="pointer-events-none absolute right-4 bottom-4 left-4 flex translate-y-3 items-end justify-between gap-3 text-left opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <span>
            <span className="mb-1.5 inline-block rounded-full bg-sun px-2 py-0.5 text-[10px] font-bold tracking-wider text-ink uppercase">{g.tag}</span>
            <span className={`block font-medium text-paper ${g.span === 'big' ? 'text-lg' : 'text-sm'}`}>{g.cap}</span>
          </span>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-paper/20 text-paper backdrop-blur"><Expand size={16} /></span>
        </span>
      </button>
    </motion.li>
  )
}

export default function Gallery() {
  const [tag, setTag] = useState('All')
  const [lb, setLb] = useState(null)
  const close = useCallback(() => setLb(null), [])
  const list = fieldGallery.filter((g) => tag === 'All' || g.tag === tag)
  return (
    <Section id="field" className="bg-paper-2/60" eyebrow="In the field" title="Public health happens where people live."
      intro="Moments from household surveys, health camps, classrooms and conference halls. Tap any photo to explore, or swipe through on mobile.">
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter photos">
        {tags.map((t) => <Chip key={t} data-group="field" count={count(t)} active={tag === t} onClick={() => setTag(t)}>{t}</Chip>)}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.ul key={tag} exit={{ opacity: 0, transition: { duration: 0.15 } }}
          className="grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] md:grid-cols-4 md:gap-4">
          {list.map((g, i) => <Tile key={g.src} g={g} i={i} onOpen={() => setLb(i)} />)}
        </motion.ul>
      </AnimatePresence>
      <Lightbox items={list} index={lb} onClose={close} onIndex={setLb} layoutPrefix={PREFIX} />
    </Section>
  )
}
