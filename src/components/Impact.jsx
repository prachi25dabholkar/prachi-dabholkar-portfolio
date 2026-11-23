import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { stats } from '../data'
import { Counter, Reveal } from './ui'

const DOTS = 340 // one dot = 10 of the 3,400 surveyed households

export default function Impact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <section className="bg-teal px-4 py-20 text-paper sm:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <div>
          <Reveal>
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-sun uppercase">Impact at a glance</p>
            <h2 className="font-serif text-3xl leading-tight text-balance md:text-5xl">Behind every number is a household, a classroom, a clinic.</h2>
          </Reveal>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-serif text-4xl text-sun md:text-5xl"><Counter value={s.value} suffix={s.suffix} /></dd>
                <dd className="mt-1 font-medium">{s.label}</dd>
                <dd className="text-sm text-paper/60">{s.note}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
        <figure>
          <div ref={ref} aria-hidden className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1.5 sm:gap-2">
            {Array.from({ length: DOTS }, (_, i) => (
              <motion.span key={i} className="aspect-square rounded-full bg-paper"
                initial={{ opacity: 0.08, scale: 0.5 }}
                animate={inView ? { opacity: 0.85, scale: 1 } : {}}
                whileHover={{ scale: 1.8, backgroundColor: '#f2b544', opacity: 1 }}
                transition={{ delay: inView ? (i % 20) * 0.015 + Math.floor(i / 20) * 0.05 : 0, duration: 0.35 }}
              />
            ))}
          </div>
          <figcaption className="mt-4 text-sm text-paper/60">Each dot represents 10 of the 3,400 households surveyed in the ICMR burn-injury study.</figcaption>
        </figure>
      </div>
    </section>
  )
}
