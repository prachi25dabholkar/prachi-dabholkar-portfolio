import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Microscope, ChartLine, Map, Megaphone, Wrench } from 'lucide-react'
import { skills } from '../data'
import { Section } from './ui'

const icons = { Microscope, ChartLine, Map, Megaphone, Wrench }

export default function Skills() {
  const [tab, setTab] = useState(0)
  const s = skills[tab]
  return (
    <Section id="skills" className="bg-ink text-paper" eyebrow="Toolkit" title={<span className="text-paper">Methods that move from <em className="text-sun">question</em> to <em className="text-sun">action</em>.</span>}>
      <div className="grid gap-8 md:grid-cols-[18rem_1fr]">
        <div role="tablist" aria-label="Skill areas" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-col md:px-0">
          {skills.map((g, i) => {
            const Icon = icons[g.icon]
            const on = tab === i
            return (
              <button key={g.group} role="tab" aria-selected={on} onClick={() => setTab(i)}
                className={`relative flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition ${on ? 'text-ink' : 'text-paper/70 hover:text-paper'}`}>
                {on && <motion.span layoutId="skill-tab" className="absolute inset-0 rounded-2xl bg-sun" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />}
                <Icon size={20} className="relative" />
                <span className="relative font-medium whitespace-nowrap">{g.group}</span>
              </button>
            )
          })}
        </div>
        <div role="tabpanel" className="min-h-64 rounded-3xl border border-paper/10 bg-paper/5 p-6 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
              <h3 className="font-serif text-3xl">{s.group}</h3>
              <ul className="mt-8 flex flex-wrap gap-3">
                {s.items.map((it, i) => (
                  <motion.li key={it} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
                    className="rounded-full border border-paper/20 px-4 py-2 text-paper/90 transition hover:border-sun hover:bg-sun hover:text-ink">
                    {it}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}
