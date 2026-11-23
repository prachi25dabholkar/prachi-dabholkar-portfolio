import { MotionConfig } from 'motion/react'
import { Analytics } from '@vercel/analytics/react'
import Nav from './components/Nav'
import Doodles from './components/Doodles'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Impact from './components/Impact'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Recognition from './components/Recognition'
import Gallery from './components/Gallery'
import Contact from './components/Contact'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#about" className="sr-only z-[70] rounded bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3">Skip to content</a>
      <Doodles />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Impact />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Recognition />
        <Gallery />
      </main>
      <Contact />
      <Analytics />
    </MotionConfig>
  )
}
