import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { HeartPulse, Pill, Sprout, SmilePlus, Sparkles, Star, Stethoscope, Apple, Droplets, HandHeart } from 'lucide-react'

// A few soft icons, each used once, spaced well apart. [Icon, side, x % across the margin, top % (of a 125vh layer), drift s]
const icons = [
  [HeartPulse, 'L', 30, 8, 22], [Star, 'R', 60, 18, 14], [Pill, 'L', 60, 30, 20], [Stethoscope, 'R', 30, 40, 26],
  [Sprout, 'L', 25, 52, 24], [Apple, 'R', 65, 62, 21], [SmilePlus, 'L', 55, 74, 19], [Droplets, 'R', 35, 84, 23],
  [Sparkles, 'L', 35, 94, 12], [HandHeart, 'R', 55, 104, 25],
]
const TWINKLE = new Set([Sparkles, Star])
const SIZE = 18

// Decorative doodles in the side margins (outside the 72rem content column), never over content.
// mix-blend-difference inverts them: soft navy on light sections, gold on dark ones.
// xl+ only, where the margins are wide enough. z-40: below the nav and overlays.
export default function Doodles() {
  const { scrollYProgress } = useScroll()
  const still = useReducedMotion()
  const transform = useTransform(scrollYProgress, (v) => `translateY(${still ? 0 : -v * 80}px)`)
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 hidden overflow-hidden text-[#ecc48c] mix-blend-difference xl:block">
      <motion.div className="absolute inset-x-0 top-0 h-[125vh]" style={{ transform }}>
        {['L', 'R'].map((side) => (
          <div key={side} className={`absolute inset-y-0 ${side === 'L' ? 'left-0' : 'right-0'} w-[calc(50%-36rem)]`}>
            {icons.filter((it) => it[1] === side).map(([Icon, , x, top, dur], i) => (
              <span key={i} className={`doodle absolute ${TWINKLE.has(Icon) ? 'twinkle' : ''}`}
                // left stays inside the margin, with room for the drift
                style={{ left: `calc((100% - ${SIZE + 20}px) * ${x / 100})`, top: `${top / 1.1}%`, opacity: 0.4, animationDuration: `${dur}s`, animationDelay: `-${(i * 4.3) % dur}s` }}>
                <Icon size={SIZE} strokeWidth={1.5} />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
