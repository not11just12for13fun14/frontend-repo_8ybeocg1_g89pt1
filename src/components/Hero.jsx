import { Megaphone, LineChart, Sparkles } from 'lucide-react'

export default function Hero({ onStart }) {
  return (
    <section className="pt-10 pb-6 md:pt-20 md:pb-12">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full text-xs mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PemasaranAI • "Menyederhanakan Sukses"</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Marketing, Iklan, dan Analitik — Semua dalam Satu Dashboard
        </h1>
        <p className="text-blue-200/90 mt-4 max-w-2xl mx-auto">
          Rencanakan, jalankan, dan optimalkan pemasaran Anda dalam hitungan menit. Bahasa Indonesia, WA-first, dan anggaran UKM.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button onClick={onStart} className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-600/30">
            Mulai Gratis
          </button>
          <a href="#demo" className="px-5 py-2.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-white font-semibold">Lihat Demo</a>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <Feature icon={<Megaphone className="w-4 h-4" />} title="Strategi AI" desc="Konten & rencana 3 bulan otomatis" />
          <Feature icon={<LineChart className="w-4 h-4" />} title="Iklan Pintar" desc="Alokasi budget otomatis lintas platform" />
          <Feature icon={<Sparkles className="w-4 h-4" />} title="Prediksi Penjualan" desc="Dasbor kesehatan bisnis yang mudah" />
        </div>
      </div>
    </section>
  )
}

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
      <div className="flex items-center gap-2 text-blue-300 mb-1">{icon}<span className="text-sm font-semibold">{title}</span></div>
      <p className="text-blue-200/80 text-sm">{desc}</p>
    </div>
  )
}
