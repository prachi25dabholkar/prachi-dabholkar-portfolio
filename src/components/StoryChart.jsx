import { motion } from 'motion/react'
import { ArrowRight, X } from 'lucide-react'
import { EASE_OUT } from './ui'

// Subtle chart palette on the navy surface, fixed order: sand, dusty blue, muted rose (+ grey-blue 4th).
// Validated all-pairs: normal-vision ΔE ≥ 15, contrast ≥ 3:1; CVD ΔE 6.6 is in the legal-with-secondary-encoding band,
// so every chart keeps direct labels or a legend.
// Must match the .dot[data-lit] colours in index.css so dots and charts share a legend.
export const SERIES = ['#e8cc8f', '#6c9ad6', '#d696b4', '#a9b8cc']
const fmt = (v, suffix = '') => `${v.toLocaleString()}${suffix}`

// Single-series line over time. x is proportional to the year (gaps stay honest); first and last points
// are labelled directly; every point has a native tooltip.
function Line({ points, suffix = '', label }) {
  const W = 240, H = 120, P = { l: 6, r: 44, t: 18, b: 20 }
  const xs = points.map(([x]) => x), ys = points.map(([, y]) => y)
  const [x0, x1] = [Math.min(...xs), Math.max(...xs)]
  const [y0, y1] = [Math.min(...ys) - 5, Math.max(...ys) + 5]
  const sx = (x) => P.l + ((x - x0) / (x1 - x0)) * (W - P.l - P.r)
  const sy = (y) => P.t + (1 - (y - y0) / (y1 - y0)) * (H - P.t - P.b)
  const d = points.map(([x, y], i) => `${i ? 'L' : 'M'}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`).join(' ')
  const ends = [points[0], points.at(-1)]
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`${label}: ${points.map(([x, y]) => `${x}, ${y}${suffix}`).join('; ')}`}>
      <line x1={P.l} x2={W - P.r} y1={H - P.b} y2={H - P.b} className="stroke-paper/20" strokeWidth="1" />
      <motion.path d={d} fill="none" stroke={SERIES[0]} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: EASE_OUT }} />
      {points.map(([x, y], i) => (
        <motion.circle key={x} cx={sx(x)} cy={sy(y)} r="4" fill={SERIES[0]} className="stroke-teal" strokeWidth="2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.12 }}>
          <title>{`${x}-${String(x + 1).slice(2)}: ${y}${suffix}`}</title>
        </motion.circle>
      ))}
      {ends.map(([x, y], i) => (
        <text key={x} x={sx(x) + (i ? 8 : 0)} y={sy(y) + (i ? 4 : -9)} className="fill-paper text-[11px] font-medium">{y}{suffix}</text>
      ))}
      {ends.map(([x], i) => <text key={`y${x}`} x={sx(x)} y={H - 4} textAnchor={i ? 'end' : 'start'} className="fill-paper/60 text-[10px]">{x}-{String(x + 1).slice(2)}</text>)}
    </svg>
  )
}

// Horizontal bars, one colour per category, values labelled directly.
function Bars({ items, suffix }) {
  const max = Math.max(...items.map(([, v]) => v))
  return (
    <div className="space-y-2.5" role="img" aria-label={items.map(([l, v]) => `${l}: ${fmt(v, suffix)}`).join(', ')}>
      {items.map(([label, v], i) => (
        <div key={label} className="grid grid-cols-[6.5rem_1fr_auto] items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 text-paper/80"><i className="size-2 shrink-0 rounded-full" style={{ background: SERIES[i] }} />{label}</span>
          <span className="h-2.5 rounded-full bg-paper/10">
            <motion.span className="block h-full origin-left rounded-full" style={{ width: `${(v / max) * 100}%`, background: SERIES[i] }}
              initial={{ transform: 'scaleX(0)' }} animate={{ transform: 'scaleX(1)' }} transition={{ duration: 0.7, ease: EASE_OUT, delay: i * 0.1 }} />
          </span>
          <span className="tabular-nums text-paper">{fmt(v, suffix)}</span>
        </div>
      ))}
    </div>
  )
}

// Segmented ring; segments are percentages. A 2-unit gap separates fills.
function Ring({ items, center, label, children }) {
  let start = 0
  return (
    <div className="flex items-center gap-4" role="img" aria-label={label}>
      <svg viewBox="0 0 64 64" className="size-20 shrink-0">
        <circle cx="32" cy="32" r="26" fill="none" strokeWidth="7" className="stroke-paper/10" />
        {items.map(([name, pct], i) => {
          const rot = -90 + start * 3.6
          start += pct
          return <motion.circle key={name} cx="32" cy="32" r="26" fill="none" strokeWidth="7" stroke={SERIES[i]} transform={`rotate(${rot} 32 32)`}
            initial={{ pathLength: 0 }} animate={{ pathLength: Math.max(pct / 100 - 0.02, 0.001) }} transition={{ duration: 0.9, ease: EASE_OUT, delay: i * 0.25 }} />
        })}
        <text x="32" y="36" textAnchor="middle" className="fill-paper font-serif text-[13px]">{center}</text>
      </svg>
      {children}
    </div>
  )
}

const Legend = ({ items, suffix = '%' }) => (
  <ul className="space-y-1 text-xs">
    {items.map(([name, v], i) => <li key={name} className="flex items-center gap-1.5 text-paper/80"><i className="size-2 rounded-full" style={{ background: SERIES[i] }} />{name}<span className="ml-auto pl-3 tabular-nums text-paper">{v}{suffix}</span></li>)}
  </ul>
)

export default function StoryChart({ chart }) {
  switch (chart.kind) {
    case 'bars': return <Bars {...chart} />
    case 'line': return (
      <div>
        <p className="mb-1 flex items-center gap-1.5 text-xs text-paper/80"><i className="size-2 rounded-full" style={{ background: SERIES[0] }} />{chart.label}</p>
        <Line {...chart} />
      </div>
    )
    case 'donut': return (
      <Ring items={chart.items} center={`${chart.items[0][1]}%`} label={chart.items.map(([n, v]) => `${n} ${v}%`).join(', ')}>
        <Legend items={chart.items} />
      </Ring>
    )
    case 'timer': return (
      <Ring items={[['Cooling', 100]]} center={`${chart.minutes}′`} label={`${chart.minutes} minutes of cool running water. Avoid ${chart.avoid.join(', ')}`}>
        <div>
          <p className="text-xs text-paper/80">minutes of cool running water</p>
          <p className="mt-1.5 flex flex-wrap gap-1">
            {chart.avoid.map((a) => <span key={a} className="inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] text-paper/80 line-through ring-1 ring-[#d696b4]/60"><X size={10} className="text-[#d696b4]" aria-hidden />{a}</span>)}
          </p>
        </div>
      </Ring>
    )
    case 'stat': return (
      <motion.p initial={{ opacity: 0, transform: 'scale(0.95)' }} animate={{ opacity: 1, transform: 'scale(1)' }} transition={{ duration: 0.5, ease: EASE_OUT }}>
        <span className="block font-serif text-5xl leading-none text-sun">{chart.value}</span>
        <span className="mt-2 block text-xs text-paper/80">{chart.label}</span>
      </motion.p>
    )
    case 'chips': return (
      <ul className="grid grid-cols-2 gap-1.5 text-xs">
        {chart.items.map((c, i) => (
          <motion.li key={c} className="rounded-lg px-2.5 py-2 font-medium text-ink" style={{ background: SERIES[i] }}
            initial={{ opacity: 0, transform: 'scale(0.9)' }} animate={{ opacity: 1, transform: 'scale(1)' }} transition={{ duration: 0.35, ease: EASE_OUT, delay: i * 0.08 }}>{c}</motion.li>
        ))}
      </ul>
    )
    default: return (
      <ol className="flex flex-wrap items-center gap-1.5 text-xs" aria-label={chart.steps.join(' then ')}>
        {chart.steps.map((s, i) => (
          <motion.li key={s} className="flex items-center gap-1.5" initial={{ opacity: 0, transform: 'translateY(6px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.15 }}>
            <span className="rounded-full px-3 py-1 font-semibold text-ink" style={{ background: SERIES[i] }}>{s}</span>
            {i < chart.steps.length - 1 && <ArrowRight size={14} className="text-paper/50" aria-hidden />}
          </motion.li>
        ))}
      </ol>
    )
  }
}
