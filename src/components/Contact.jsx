import { useState } from 'react'
import { Mail, Linkedin, Phone, Copy, Check, ArrowUpRight, Download } from 'lucide-react'
import { profile } from '../data'
import { Reveal, MaskText } from './ui'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 2000) }
    catch { window.location.href = `mailto:${profile.email}` }
  }
  return (
    <section id="contact" className="relative overflow-hidden bg-teal px-4 py-24 text-paper sm:px-8 md:py-32">
      <div className="grain pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal y={12}><p className="mb-3 text-xs font-semibold tracking-[0.2em] text-sun uppercase">Contact</p></Reveal>
        <h2 className="max-w-4xl font-serif text-5xl leading-[1.02] text-balance md:text-7xl">
          <MaskText stagger={0.06}>{'Let’s build healthier, fairer systems'}</MaskText>{' '}
          <em className="text-sun"><MaskText delay={0.35}>together.</MaskText></em>
        </h2>
        <Reveal delay={0.3}><p className="mt-6 max-w-xl text-lg text-paper/70">Open to research, program evaluation, knowledge translation and community health roles across Canada.</p></Reveal>
        <Reveal delay={0.15} className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-paper p-5 text-ink">
            <a href={`mailto:${profile.email}`} className="flex min-w-0 items-center gap-3">
              <Mail className="shrink-0 text-coral" /><span className="font-medium break-all">{profile.email}</span>
            </a>
            <button onClick={copy} aria-label="Copy email address" className="shrink-0 rounded-full p-2 hover:bg-paper-2">
              {copied ? <Check size={18} className="text-teal" /> : <Copy size={18} />}
            </button>
          </div>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-2xl border border-paper/20 p-5 transition hover:bg-paper/10">
            <span className="flex items-center gap-3 font-medium"><Linkedin className="text-sun" /> LinkedIn</span>
            <ArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-3 rounded-2xl border border-paper/20 p-5 font-medium transition hover:bg-paper/10">
            <Phone className="text-sun" /> {profile.phone}
          </a>
        </Reveal>
        {profile.cv && (
          <Reveal delay={0.25} className="mt-6">
            <a href={profile.cv} download className="group inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3.5 font-semibold text-ink transition-colors hover:bg-paper">
              <Download size={18} className="transition-transform duration-200 group-hover:translate-y-0.5" /> Download CV <span className="font-normal text-ink/60">PDF</span>
            </a>
          </Reveal>
        )}
        <span className="sr-only" aria-live="polite">{copied ? 'Email copied' : ''}</span>
        <footer className="mt-24 flex flex-col justify-between gap-2 border-t border-paper/15 pt-6 text-sm text-paper/50 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} {profile.name}</span>
          <span>Public health · Health equity · Community research</span>
        </footer>
      </div>
    </section>
  )
}
