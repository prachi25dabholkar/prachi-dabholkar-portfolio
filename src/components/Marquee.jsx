import { Plus } from 'lucide-react'

const items = ['Health Equity', 'Mixed-Methods Research', 'ICMR', 'Western University', 'Geospatial Analysis', 'St. Francis Xavier University', 'Community Health', 'National Health Mission', 'Knowledge Translation', 'Rural Ontario Institute', 'Oral Health', 'Health Systems']

export default function Marquee() {
  // Rendered twice so the -50% translate loops seamlessly.
  const row = (hidden) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-6 px-6 font-serif text-2xl whitespace-nowrap md:text-3xl">
          {t}<Plus size={18} className="text-sun" />
        </li>
      ))}
    </ul>
  )
  return (
    <div className="marquee-wrap overflow-hidden border-y border-ink/10 bg-paper py-5 text-ink/80 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="marquee flex w-max">{row(false)}{row(true)}</div>
    </div>
  )
}
