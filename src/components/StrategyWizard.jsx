import { useState } from 'react'

export default function StrategyWizard() {
  const [businessType, setBusinessType] = useState('Kedai Kopi')
  const [location, setLocation] = useState('Jakarta')
  const [budget, setBudget] = useState(1000000)
  const [channels, setChannels] = useState(['Instagram', 'WhatsApp', 'Google'])
  const [voice, setVoice] = useState('santai')
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState(null)

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const toggleChannel = (c) => {
    setChannels((prev) => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])
  }

  const generate = async () => {
    setLoading(true)
    setPlan(null)
    try {
      const res = await fetch(`${backend}/api/strategy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_type: businessType,
          location,
          monthly_budget_idr: Number(budget),
          channels,
          brand_voice: voice,
        })
      })
      const data = await res.json()
      setPlan(data)
    } catch (e) {
      alert('Gagal membuat rencana: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="wizard" className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-5">
      <h2 className="text-xl font-bold text-white mb-3">Wizard Strategi AI</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-blue-200/80 mb-1">Jenis Usaha</label>
          <input value={businessType} onChange={(e)=>setBusinessType(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900/70 border border-slate-700 text-white" />
        </div>
        <div>
          <label className="block text-sm text-blue-200/80 mb-1">Lokasi</label>
          <input value={location} onChange={(e)=>setLocation(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900/70 border border-slate-700 text-white" />
        </div>
        <div>
          <label className="block text-sm text-blue-200/80 mb-1">Anggaran Bulanan (IDR)</label>
          <input type="number" value={budget} onChange={(e)=>setBudget(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900/70 border border-slate-700 text-white" />
        </div>
        <div>
          <label className="block text-sm text-blue-200/80 mb-1">Gaya Bahasa</label>
          <select value={voice} onChange={(e)=>setVoice(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900/70 border border-slate-700 text-white">
            <option value="santai">Santai</option>
            <option value="semi-formal">Semi-formal</option>
            <option value="formal">Formal</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-blue-200/80 mb-2">Channel</label>
          <div className="flex flex-wrap gap-2">
            {['Instagram','WhatsApp','Google','TikTok'].map(c => (
              <button key={c} onClick={()=>toggleChannel(c)} className={`px-3 py-1.5 rounded-lg border ${channels.includes(c) ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900/70 border-slate-700 text-blue-200/90'}`}>{c}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button onClick={generate} disabled={loading} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold disabled:opacity-60">
          {loading ? 'Membuat Rencana...' : 'Buat Rencana 3 Bulan'}
        </button>
      </div>

      {plan && (
        <div className="mt-6 bg-slate-900/50 border border-slate-700 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-white mb-2">Ringkasan</h3>
          <p className="text-blue-200/90 mb-3">{plan.summary}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="text-white font-semibold mb-1">Tujuan</h4>
              <ul className="list-disc list-inside text-blue-200/90 text-sm">
                {plan.goals.map((g,i)=>(<li key={i}>{g}</li>))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-white font-semibold mb-1">Aksi Mingguan (12 minggu)</h4>
              <div className="max-h-48 overflow-auto pr-2 text-sm text-blue-200/90 space-y-1">
                {Object.entries(plan.weekly_actions).map(([w, items]) => (
                  <div key={w}>
                    <span className="font-medium text-white">{w}:</span> {items.join(' • ')}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
