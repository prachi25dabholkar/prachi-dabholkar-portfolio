import { GraduationCap, Sprout } from 'lucide-react'
import { profile, education, leadership, certifications } from '../data'
import { Section, Reveal, ClipImage } from './ui'

const collage = [
  ['/images/hero.webp', 'Leading a community health education session', 'col-span-2 row-span-2'],
  ['/images/clinic-1.webp', 'Oral screening at a dental camp', ''],
  ['/images/nhm-2.webp', 'Key-informant interview in the community', ''],
]

export default function About() {
  return (
    <Section id="about" eyebrow="About" title={<>A dentist who saw that the clinic <em className="text-teal">wasn&rsquo;t enough</em>.</>}>
      <div className="grid gap-14 md:grid-cols-[1fr_1.1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-muted">
          {profile.about.map((p, i) => <Reveal key={i} delay={i * 0.08}><p className={i === 0 ? 'text-ink' : ''}>{p}</p></Reveal>)}
          <Reveal delay={0.25}>
            <blockquote className="mt-8 border-l-2 border-coral pl-5 font-serif text-2xl leading-snug text-ink italic">
              &ldquo;Not everyone could come to me, so I learned to take health to them.&rdquo;
            </blockquote>
          </Reveal>
        </div>
        <div className="grid auto-rows-[9rem] grid-cols-3 gap-3 sm:auto-rows-[11rem]">
          {collage.map(([src, alt, cls], i) => (
            <div key={src} className={`group overflow-hidden rounded-2xl ${cls}`}>
              <div className="size-full transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105">
                <ClipImage src={src} alt={alt} className="size-full" delay={i * 0.15} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h3 className="mb-6 flex items-center gap-2 font-serif text-2xl"><GraduationCap className="text-coral" /> Education</h3>
          <ol className="space-y-4">
            {education.map((e, i) => (
              <li key={e.degree}>
                <Reveal delay={i * 0.08} className="group flex items-center gap-5 rounded-2xl border border-ink/10 bg-paper p-4 transition-[border-color,box-shadow] hover:border-teal/40 hover:shadow-lg hover:shadow-teal/5">
                  <img src={e.image} alt="" loading="lazy" className="size-20 shrink-0 rounded-xl object-cover sm:size-24" />
                  <div>
                    <p className="text-xs font-medium tracking-wide text-coral uppercase">{e.period}</p>
                    <p className="mt-1 font-serif text-xl">{e.degree}</p>
                    <p className="text-sm text-muted">{e.school}{e.note && <span className="ml-2 rounded-full bg-sage/25 px-2 py-0.5 text-xs text-teal">{e.note}</span>}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="mb-6 flex items-center gap-2 font-serif text-2xl"><Sprout className="text-coral" /> Leadership</h3>
          <div className="space-y-4">
            {leadership.map((l, i) => (
              <Reveal key={l.title} delay={i * 0.08}>
                <div className="rounded-2xl bg-paper-2 p-5">
                  <p className="text-xs font-medium tracking-wide text-coral uppercase">{l.period}</p>
                  <p className="mt-1 font-serif text-xl">{l.title}</p>
                  <p className="text-sm font-medium text-teal">{l.org}</p>
                  <p className="mt-2 text-sm text-muted">{l.text}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-dashed border-ink/20 p-5">
                <p className="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">Certifications</p>
                {certifications.map((c) => <p key={c.title} className="text-sm"><span className="font-medium">{c.title}</span> <span className="text-muted">· {c.org}, {c.year}</span></p>)}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  )
}
