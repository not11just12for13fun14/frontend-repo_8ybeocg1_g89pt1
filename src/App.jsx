import { useRef } from 'react'
import Hero from './components/Hero'
import StrategyWizard from './components/StrategyWizard'
import AdsAllocator from './components/AdsAllocator'
import Analytics from './components/Analytics'

function App() {
  const wizardRef = useRef(null)
  const onStart = () => wizardRef.current?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-blue-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.1),transparent_40%)]" />
      <div className="relative max-w-5xl mx-auto px-4 md:px-8">
        <Hero onStart={onStart} />
        <div ref={wizardRef} className="space-y-6 pb-16">
          <StrategyWizard />
          <AdsAllocator />
          <Analytics />
        </div>
      </div>
      <footer className="relative border-t border-blue-500/10 py-6 text-center text-blue-300/70 text-sm">
        PemasaranAI — Semua dalam Bahasa Indonesia • Mata uang: IDR • Mobile-first
      </footer>
    </div>
  )
}

export default App
