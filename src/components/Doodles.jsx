import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { HeartPulse, Stethoscope, Pill, Syringe, Microscope, Dna, Thermometer, Bandage, TestTube, Activity, Plus, Brain, Apple, HandHeart, Droplet, ShieldPlus, Hospital, Sparkle } from 'lucide-react'

// [Icon, left %, top % (of a 125vh layer), size px, drift duration s, colour, desktop-only]
const far = [
  [Plus, 6, 12, 14, 16, 'text-teal-2'], [Sparkle, 22, 30, 12, 9, 'text-sun', true], [Dna, 41, 8, 20, 24, 'text-sage', true],
  [Plus, 63, 22, 12, 18, 'text-sun'], [Sparkle, 80, 10, 14, 11, 'text-teal-2'], [Droplet, 93, 38, 16, 20, 'text-teal-2', true],
  [Sparkle, 12, 58, 10, 8, 'text-sun'], [Plus, 34, 74, 14, 17, 'text-sage', true], [Sparkle, 56, 52, 12, 10, 'text-teal-2'],
  [Apple, 72, 82, 18, 22, 'text-sage', true], [Plus, 88, 66, 12, 15, 'text-sun'], [Sparkle, 48, 94, 10, 9, 'text-sun', true],
]
const near = [
  [HeartPulse, 4, 28, 26, 20, 'text-teal-2'], [Stethoscope, 90, 18, 28, 26, 'text-teal'], [Pill, 18, 88, 22, 18, 'text-sage'],
  [Microscope, 70, 45, 26, 28, 'text-teal', true], [Syringe, 30, 46, 22, 22, 'text-teal-2', true], [Thermometer, 94, 80, 22, 19, 'text-teal-2'],
  [Bandage, 52, 16, 22, 21, 'text-sage', true], [TestTube, 8, 70, 22, 24, 'text-teal', true], [Activity, 60, 70, 26, 18, 'text-sage'],
  [Brain, 82, 96, 24, 27, 'text-teal', true], [HandHeart, 38, 98, 24, 23, 'text-teal-2'], [ShieldPlus, 76, 4, 22, 25, 'text-sage', true],
  [Hospital, 24, 10, 22, 26, 'text-teal', true],
]

function Layer({ items, opacity, offset, progress, still }) {
  const transform = useTransform(progress, (v) => `translateY(${still ? 0 : -v * offset}px)`)
  return (
    <motion.div className="absolute inset-x-0 top-0 h-[125vh]" style={{ transform }}>
      {items.map(([Icon, left, top, size, dur, color, desktopOnly], i) => (
        <span key={i} className={`doodle absolute ${color} ${desktopOnly ? 'hidden md:block' : ''} ${Icon === Sparkle ? 'twinkle' : ''}`}
          style={{ left: `${left}%`, top: `${top}%`, opacity, animationDuration: `${dur}s`, animationDelay: `-${(i * 3.7) % dur}s` }}>
          <Icon size={size} strokeWidth={1.5} />
        </span>
      ))}
    </motion.div>
  )
}

// Decorative healthcare "constellation" behind the page; two depth layers parallax at different speeds.
export default function Doodles() {
  const { scrollYProgress } = useScroll()
  const still = useReducedMotion()
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <Layer items={far} opacity={0.45} offset={60} progress={scrollYProgress} still={still} />
      <Layer items={near} opacity={0.24} offset={160} progress={scrollYProgress} still={still} />
    </div>
  )
}
