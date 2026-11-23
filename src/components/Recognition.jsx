import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Award, ArrowUpRight, Mic } from 'lucide-react'
import { talks, publications } from '../data'
import { Section, Reveal, Lightbox } from './ui'

export default function Recognition() {
  const track = useRef(null)
  const [lb, setLb] = useState(null)
  const photos = talks.filter((t) => t.image).map((t) => ({ src: t.image, cap: `${t.title}, ${t.year}` }))
  const scroll = (d) => track.current?.scrollBy({ left: d * track.current.clientWidth * 0.8, behavior: 'smooth' })

  return (
    <Section id="recognition" eyebrow="Recognition" title="Presentations, awards and publications.">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-serif text-2xl"><Mic className="text-coral" /> Conferences & awards</h3>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} aria-label="Scroll left" className="grid size-11 place-items-center rounded-full border border-ink/15 hover:border-teal hover:text-teal"><ArrowLeft size={18} /></button>
          <button onClick={() => scroll(1)} aria-label="Scroll right" className="grid size-11 place-items-center rounded-full border border-ink/15 hover:border-teal hover:text-teal"><ArrowRight size={18} /></button>
        </div>
      </div>
      <ul ref={track} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-8 sm:px-8">
        {talks.map((t) => {
          const pi = photos.findIndex((p) => p.src === t.image)
          return (
            <li key={t.title + t.year} className="w-72 shrink-0 snap-start sm:w-80">
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-paper ring-1 ring-ink/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-teal/10">
                {t.image ? (
                  <button onClick={() => setLb(pi)} aria-label={`View photo: ${t.title}`} className="aspect-[4/3] overflow-hidden bg-paper-2">
                    <img src={t.image} alt="" loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-105" />
                  </button>
                ) : (
                  <div className="grid aspect-[4/3] place-items-center bg-linear-to-br from-teal-2 to-sage"><Award size={64} strokeWidth={1.2} className="text-paper" /></div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-serif text-3xl text-teal-2">{t.year}</p>
                  <h4 className="mt-1 font-serif text-lg leading-snug">{t.title}</h4>
                  <p className="mt-2 flex-1 text-sm text-muted">{t.topic}</p>
                  {t.award && <p className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full bg-sun/25 px-3 py-1 text-xs font-semibold text-ink"><Award size={14} /> {t.award}</p>}
                </div>
              </article>
            </li>
          )
        })}
      </ul>

      <h3 className="mt-20 mb-6 font-serif text-2xl">Publications & manuscripts</h3>
      <ul className="divide-y divide-ink/10 border-y border-ink/10">
        {publications.map((p, i) => {
          const Tag = p.href ? 'a' : 'div'
          return (
            <li key={p.title}>
              <Reveal delay={i * 0.05}>
                <Tag {...(p.href && { href: p.href, target: '_blank', rel: 'noreferrer' })} className="group grid gap-2 py-6 sm:grid-cols-[9rem_1fr_auto] sm:gap-8">
                  <span className={`self-start rounded-full px-3 py-1 text-xs font-semibold sm:justify-self-start ${p.type === 'Published' ? 'bg-teal text-paper' : 'bg-paper-2 text-muted'}`}>{p.type}</span>
                  <span>
                    <span className="block font-serif text-lg leading-snug transition group-hover:text-teal">{p.title}</span>
                    <span className="mt-1 block text-sm text-muted">{p.cite} · <em>{p.venue}</em></span>
                  </span>
                  {p.href && <ArrowUpRight className="hidden text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-teal sm:block" />}
                </Tag>
              </Reveal>
            </li>
          )
        })}
      </ul>
      <Lightbox items={photos} index={lb} onClose={() => setLb(null)} onIndex={setLb} />
    </Section>
  )
}
