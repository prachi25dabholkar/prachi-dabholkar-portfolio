import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import {
  Sparkles, Star, Cross, Droplets, Leaf, Sprout, Carrot, Apple, Eye, Ear, Bone, Footprints,
  HeartPulse, Stethoscope, Pill, Syringe, Microscope, Dna, Thermometer, Bandage, TestTube, Brain,
  HandHeart, SmilePlus, Baby, Ambulance, PillBottle, ScanHeart,
} from 'lucide-react'

// Every icon appears once. [Icon, left %, top % (of a 125vh layer), size px, drift duration s, desktop-only]
const far = [
  [Sparkles, 6, 12, 16, 9], [Star, 22, 30, 14, 11, true], [Cross, 41, 6, 14, 18, true], [Droplets, 63, 22, 16, 20],
  [Leaf, 80, 10, 16, 17], [Sprout, 93, 38, 18, 22, true], [Carrot, 12, 58, 16, 19], [Apple, 34, 74, 18, 21, true],
  [Eye, 56, 52, 16, 16], [Ear, 72, 84, 16, 23, true], [Bone, 88, 64, 18, 18], [Footprints, 48, 92, 18, 24, true],
]
const near = [
  [HeartPulse, 4, 28, 26, 20], [Stethoscope, 90, 18, 28, 26], [Pill, 18, 88, 22, 18], [Microscope, 70, 45, 26, 28, true],
  [Syringe, 30, 44, 22, 22, true], [Thermometer, 94, 80, 22, 19], [Bandage, 52, 14, 22, 21, true], [TestTube, 8, 70, 22, 24, true],
  [Brain, 82, 96, 24, 27, true], [HandHeart, 38, 98, 24, 23], [SmilePlus, 60, 70, 24, 18], [Baby, 76, 4, 22, 25, true],
  [Ambulance, 24, 10, 24, 26, true], [PillBottle, 44, 60, 20, 20, true], [ScanHeart, 96, 52, 22, 24], [Dna, 16, 40, 22, 25, true],
]
const TWINKLE = new Set([Sparkles, Star])

function Layer({ items, opacity, offset, progress, still }) {
  const transform = useTransform(progress, (v) => `translateY(${still ? 0 : -v * offset}px)`)
  return (
    <motion.div className="absolute inset-x-0 top-0 h-[125vh]" style={{ transform }}>
      {items.map(([Icon, left, top, size, dur, desktopOnly], i) => (
        <span key={i} className={`doodle absolute ${desktopOnly ? 'hidden md:block' : ''} ${TWINKLE.has(Icon) ? 'twinkle' : ''}`}
          style={{ left: `${left}%`, top: `${top}%`, opacity, animationDuration: `${dur}s`, animationDelay: `-${(i * 3.7) % dur}s` }}>
          <Icon size={size} strokeWidth={1.5} />
        </span>
      ))}
    </motion.div>
  )
}

// Decorative healthcare "constellation" floating over the page. mix-blend-difference inverts it per pixel:
// the peach stroke reads navy over light sections and gold over the dark ones.
// z-40: above page content, below the nav (z-50) and overlays (z-50/60).
export default function Doodles() {
  const { scrollYProgress } = useScroll()
  const still = useReducedMotion()
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden text-[#ecc48c] mix-blend-difference">
      <Layer items={far} opacity={0.65} offset={60} progress={scrollYProgress} still={still} />
      <Layer items={near} opacity={0.42} offset={160} progress={scrollYProgress} still={still} />
    </div>
  )
}
