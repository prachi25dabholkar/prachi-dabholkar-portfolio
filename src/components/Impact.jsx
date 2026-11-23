import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { stats, dotStories } from '../data'
import { Counter, Reveal, EASE_OUT } from './ui'
import StoryChart from './StoryChart'

const COLS = 20
const ROWS = 17
const DOTS = 340 // one dot = 10 of the 3,400 surveyed households
const RIPPLE = 2.6 // radius in dots
const WAVE_MS = 14 // colour wave delay per dot of distance
const AUTOPLAY_MS = 6000
const RESUME_MS = 4000 // autoplay resumes this long after the pointer leaves
const LETTERS = ['a', 'b', 'c', 'd'] // palette order, see SERIES in StoryChart
const storyAt = new Map(dotStories.map((s, k) => [s.at[0] * COLS + s.at[1], k]))
const pos = (i) => [Math.floor(i / COLS), i % COLS]
const dist = (a, b) => { const [r1, c1] = pos(a), [r2, c2] = pos(b); return Math.hypot(r1 - r2, c1 - c2) }

// For a story: each dot's colour letter, and its wave delay from the story dot.
function lightFor(k) {
  if (k === null) return null
  const s = dotStories[k], origin = s.at[0] * COLS + s.at[1]
  const lit = new Array(DOTS).fill('')
  if (s.light === 'row') for (let c = 0; c < COLS; c++) lit[s.at[0] * COLS + c] = 'a'
  else if (s.light === 'quad') lit.forEach((_, i) => { const [r, c] = pos(i); lit[i] = LETTERS[(r >= ROWS / 2) * 2 + (c >= COLS / 2)] })
  else {
    const order = Array.from({ length: DOTS }, (_, i) => i).sort((a, b) => dist(a, origin) - dist(b, origin))
    let rank = 0
    s.parts.forEach((n, p) => { for (let j = 0; j < n; j++, rank++) lit[order[rank]] = LETTERS[p] })
  }
  return { lit, delay: (i) => Math.round(dist(i, origin) * WAVE_MS) }
}

export default function Impact() {
  const ref = useRef(null)
  const tip = useRef(null)
  const touched = useRef([])
  const hovered = useRef(-1)
  const resume = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { margin: '-100px' })
  const [story, setStory] = useState(null)
  const [auto, setAuto] = useState(true)
  const light = useMemo(() => lightFor(story), [story])
  const playing = auto && inView && !reduce

  // Autoplay: stories cycle (with their charts) until someone takes over.
  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => setStory((s) => (s === null ? 0 : (s + 1) % dotStories.length)), story === null ? 1400 : AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [playing, story])
  useEffect(() => () => clearTimeout(resume.current), [])
  // Reduced motion: no autoplay, but still show a story instead of an empty card.
  useEffect(() => { if (reduce && inView && story === null) setStory(0) }, [reduce, inView, story])

  const takeOver = (k) => { clearTimeout(resume.current); setAuto(false); if (k !== undefined) setStory(k) }

  // Ripple + label: direct style writes, so hovering never re-renders 340 dots.
  const hover = (i) => {
    if (i === hovered.current) return
    hovered.current = i
    touched.current.forEach((el) => { el.style.transform = '' })
    touched.current = []
    const t = tip.current
    if (i < 0) { t.style.opacity = '0'; return }
    const dots = ref.current.children
    const el = dots[i]
    const x = el.offsetLeft + el.offsetWidth / 2, y = el.offsetTop // read layout before any style writes (no forced reflow)
    if (!reduce) {
      for (let j = 0; j < DOTS; j++) {
        const d = dist(i, j)
        if (d > RIPPLE) continue
        dots[j].style.transform = `scale(${d === 0 ? 1.7 : 1 + 0.5 * (1 - d / RIPPLE) ** 1.5})`
        touched.current.push(dots[j])
      }
    }
    t.textContent = storyAt.has(i) ? dotStories[storyAt.get(i)].title : `Households ${(i * 10 + 1).toLocaleString()}–${(i * 10 + 10).toLocaleString()} of 3,400`
    t.style.transform = `translate(${x}px, ${y}px) translate(-50%, calc(-100% - 10px))`
    t.style.opacity = '1'
  }
  const indexOf = (e) => { const i = e.target.dataset?.i; return i === undefined ? null : Number(i) }
  const onMove = (e) => {
    if (e.pointerType === 'touch') return
    const i = indexOf(e)
    if (i === null) return
    hover(i)
    if (storyAt.has(i)) { if (storyAt.get(i) !== story || auto) takeOver(storyAt.get(i)) } else if (auto) takeOver()
  }
  const onTap = (e) => {
    const i = indexOf(e)
    if (i === null) return
    hover(i)
    if (storyAt.has(i)) takeOver(storyAt.get(i))
  }
  const leave = () => {
    hover(-1)
    clearTimeout(resume.current)
    resume.current = setTimeout(() => setAuto(true), RESUME_MS)
  }
  const s = story === null ? null : dotStories[story]

  return (
    <section className="bg-teal px-4 py-20 text-paper sm:px-8 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-sun uppercase">Impact at a glance</p>
            <h2 className="font-serif text-3xl leading-tight text-balance md:text-5xl">Behind every number is a household, a classroom, a clinic.</h2>
          </Reveal>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
            {stats.map((st, i) => (
              <Reveal key={st.label} delay={i * 0.08}>
                <dt className="sr-only">{st.label}</dt>
                <dd className="font-serif text-4xl text-sun md:text-5xl"><Counter value={st.value} suffix={st.suffix} /></dd>
                <dd className="mt-1 font-medium">{st.label}</dd>
                <dd className="text-sm text-paper/60">{st.note}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
        <figure onPointerLeave={leave}>
          <div className="relative">
            <div ref={ref} aria-hidden onPointerMove={onMove} onClick={onTap}
              className={`dots grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1.5 sm:gap-2 ${inView || story !== null ? 'in' : ''} ${s ? 'has-story' : ''}`}>
              {Array.from({ length: DOTS }, (_, i) => (
                <span key={i} data-i={i} className="dot" data-story={storyAt.has(i) || undefined} data-active={(storyAt.get(i) === story && story !== null) || undefined}
                  data-lit={light?.lit[i] || undefined}
                  style={{ '--d': `${(i % COLS) * 15 + Math.floor(i / COLS) * 50}ms`, '--w': light ? `${light.delay(i)}ms` : '0ms' }} />
              ))}
            </div>
            <div ref={tip} aria-hidden className="pointer-events-none absolute top-0 left-0 z-10 rounded-full bg-paper px-3 py-1 text-xs font-medium whitespace-nowrap text-ink opacity-0 shadow-lg transition-opacity duration-150" />
          </div>
          <figcaption className="mt-4 flex flex-wrap items-center gap-x-2 text-xs text-paper/60">
            <span>Each dot = 10 of the 3,400 households surveyed.</span>
            <span className="inline-flex items-center gap-1.5 text-paper/80"><i className="size-2.5 rounded-full bg-[radial-gradient(circle,var(--color-paper)_0_26%,var(--color-teal)_30%)] shadow-[inset_0_0_0_1.5px_var(--color-paper)]" /> Ringed dots hold a story: hover or tap one.</span>
          </figcaption>

          {/* Story pager: progress for autoplay, and keyboard / screen-reader access to every story */}
          <div className="mt-4 flex gap-1" role="group" aria-label="Data stories">
            {dotStories.map((st, k) => (
              <button key={st.title} onClick={() => takeOver(k)} onFocus={() => takeOver(k)} aria-label={`Story ${k + 1}: ${st.title}`} aria-current={k === story}
                className="group h-6 flex-1 py-2.5">
                <span className="block h-1 overflow-hidden rounded-full bg-paper/15 transition-colors group-hover:bg-paper/30">
                  {k === story && <span key={`${story}-${playing}`} className={`block h-full origin-left rounded-full bg-sun ${playing ? 'pager-fill' : ''}`} />}
                </span>
              </button>
            ))}
          </div>

          <div className="@container mt-2 min-h-56" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              {s && (
                <motion.div key={story} className="grid gap-5 rounded-2xl bg-paper/[0.07] p-5 ring-1 ring-paper/10 @lg:grid-cols-[1fr_15rem] @lg:items-center"
                  initial={{ opacity: 0, transform: 'translateY(8px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.15em] text-paper/50 uppercase">Story {story + 1} of {dotStories.length}</p>
                    <p className="mt-1 font-serif text-xl text-sun">{s.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-paper/80">{s.text}</p>
                    <p className="mt-2 text-[11px] tracking-wide text-paper/50 uppercase">Source: {s.source}</p>
                  </div>
                  <StoryChart chart={s.chart} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </figure>
      </div>
    </section>
  )
}
