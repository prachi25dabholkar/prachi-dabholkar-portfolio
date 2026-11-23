import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'

const links = [['about', 'About'], ['experience', 'Experience'], ['work', 'Work'], ['skills', 'Skills'], ['recognition', 'Recognition'], ['field', 'In the Field'], ['contact', 'Contact']]

export default function Nav() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      if (window.scrollY < 200) setActive('')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'bg-paper/90 shadow-[0_1px_0_rgb(11_59_102/.08)] backdrop-blur-md' : ''}`}>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8" aria-label="Main">
        <a href="#top" className="flex items-center gap-2 font-serif text-lg font-semibold">
          <span className="grid size-8 place-items-center rounded-lg bg-teal text-sm text-paper">PD</span>
          <span className="hidden sm:inline">Prachi Dabholkar</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className={`relative block rounded-full px-3 py-1.5 text-sm transition-colors ${active === id ? 'text-teal' : 'text-muted hover:text-ink'}`}>
                {active === id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-teal/10" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />}
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button className="rounded-lg p-2 lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <motion.div className="h-0.5 origin-left bg-coral" style={{ scaleX: scrollYProgress }} />
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-paper px-4 lg:hidden">
            {links.map(([id, label]) => (
              <li key={id}><a href={`#${id}`} onClick={() => setOpen(false)} className="block py-3 font-serif text-xl">{label}</a></li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
