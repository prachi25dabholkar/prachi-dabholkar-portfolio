import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, MapPin, Award } from 'lucide-react'
import { profile } from '../data'
import { MaskText, Magnetic, EASE_OUT } from './ui'

const fadeUp = (delay) => ({
  initial: { opacity: 0, transform: 'translateY(14px)' },
  animate: { opacity: 1, transform: 'translateY(0px)' },
  transition: { duration: 0.7, delay, ease: EASE_OUT },
})

export default function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 90])
  const fade = useTransform(scrollY, [0, 500], [1, 0.3])
  return (
    <section id="top" className="relative overflow-hidden px-4 pt-28 pb-24 sm:px-8 md:pt-36">
      {/* drifting aurora glows (CSS keyframes, paused for reduced motion) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="aurora absolute -top-40 -left-32 size-[34rem] rounded-full bg-teal-2/20 blur-3xl" />
        <span className="aurora aurora-2 absolute top-20 right-[-10rem] size-[30rem] rounded-full bg-sage/25 blur-3xl" />
        <span className="aurora aurora-3 absolute bottom-[-12rem] left-1/3 size-[26rem] rounded-full bg-sun/20 blur-3xl" />
      </div>
      <div className="grain pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-[1.25fr_1fr]">
        <motion.div style={{ opacity: fade }}>
          <motion.p {...fadeUp(0)} className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-paper/70 px-3 py-1.5 text-xs font-medium text-teal backdrop-blur">
            <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-coral opacity-60" /><span className="relative inline-flex size-2 rounded-full bg-coral" /></span>
            {profile.role}
          </motion.p>
          <h1 className="font-serif text-5xl leading-[0.98] font-medium tracking-tight sm:text-7xl lg:text-8xl">
            <span className="block"><MaskText animateOnMount delay={0.1} stagger={0.08}>Evidence that</MaskText></span>
            <span className="block">
              <MaskText animateOnMount delay={0.26} stagger={0.08}>reaches</MaskText>{' '}
              <span className="text-teal italic"><MaskText animateOnMount delay={0.36}>people.</MaskText></span>
            </span>
          </h1>
          <motion.p {...fadeUp(0.6)} className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            I&rsquo;m <strong className="font-semibold text-ink">{profile.name}</strong>. {profile.tagline}
          </motion.p>
          <motion.div {...fadeUp(0.75)} className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3.5 font-medium text-paper shadow-lg shadow-teal/20 transition-colors hover:bg-teal-2">
                Explore my work <ArrowDown size={18} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="inline-block rounded-full border border-ink/15 bg-paper/60 px-6 py-3.5 font-medium backdrop-blur transition-colors hover:border-teal hover:text-teal">Get in touch</a>
            </Magnetic>
            <span className="ml-1 inline-flex items-center gap-1.5 text-sm text-muted"><MapPin size={16} /> {profile.location}</span>
          </motion.div>
        </motion.div>

        <motion.div style={{ y }} className="relative mx-auto w-full max-w-sm">
          <motion.div
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }} animate={{ clipPath: 'inset(0% 0% 0% 0%)' }} transition={{ duration: 1.3, delay: 0.25, ease: EASE_OUT }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] rounded-tr-[6rem] bg-paper-2 shadow-2xl shadow-teal/20">
            <motion.img src={profile.portrait} alt="Prachi Dabholkar presenting research at London Health Research Day" className="size-full object-cover object-top"
              initial={{ transform: 'scale(1.25)' }} animate={{ transform: 'scale(1)' }} transition={{ duration: 1.8, delay: 0.25, ease: EASE_OUT }} />
            <div className="absolute inset-0 bg-linear-to-t from-ink/40 via-transparent" />
          </motion.div>
          <motion.div initial={{ opacity: 0, transform: 'translateX(-20px) scale(0.95)' }} animate={{ opacity: 1, transform: 'translateX(0px) scale(1)' }}
            transition={{ delay: 1.1, type: 'spring', duration: 0.6, bounce: 0.25 }}
            className="float absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl bg-paper/90 p-4 shadow-xl backdrop-blur sm:-left-10">
            <span className="grid size-11 place-items-center rounded-xl bg-sun/30 text-ink"><Award size={22} /></span>
            <span className="text-sm leading-tight"><strong className="block">Best Paper</strong><span className="text-muted">EMS Research Day 2026</span></span>
          </motion.div>
          <motion.div initial={{ opacity: 0, transform: 'translateY(-12px) scale(0.95)' }} animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
            transition={{ delay: 1.25, type: 'spring', duration: 0.6, bounce: 0.25 }}
            className="float float-2 absolute -top-4 -right-2 rounded-2xl bg-teal px-4 py-3 text-paper shadow-xl sm:-right-8">
            <span className="block font-serif text-2xl leading-none">BDS &rarr; MPH</span>
            <span className="text-xs text-paper/70">clinic to community</span>
          </motion.div>
        </motion.div>
      </div>
      <motion.a href="#about" aria-label="Scroll to About" {...fadeUp(1.4)}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-[0.2em] text-muted uppercase md:flex">
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-ink/15"><span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-coral" /></span>
      </motion.a>
    </section>
  )
}
