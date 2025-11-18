import { useState } from 'react'

export default function AdsAllocator(){
  const [budget, setBudget] = useState(1000000)
  const [priorities, setPriorities] = useState(['meta'])
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const toggle = (p) => setPriorities(prev => prev.includes(p) ? prev.filter(x=>x!==p) : [...prev, p])

  const allocate = async () => {
    setLoading(true)
    try{
      const res = await fetch(`${backend}/api/ads/allocate`,{
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ total_budget_idr: Number(budget), priorities })
      })
      const data = await res.json()
      setResult(data)
    }catch(e){
      alert('Gagal alokasi: '+e.message)
    }finally{ setLoading(false) }
  }

  const fmt = (x)=> new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(x||0)

  return (
    <section className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-5">
      <h2 className="text-xl font-bold text-white mb-3">Alokasi Budget Iklan (AI)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-blue-200/80 mb-1">Total Budget (IDR)</label>
          <input type="number" value={budget} onChange={(e)=>setBudget(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900/70 border border-slate-700 text-white" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-blue-200/80 mb-2">Prioritas Platform</label>
          <div className="flex flex-wrap gap-2">
            {['meta','google','tiktok'].map(p => (
              <button key={p} onClick={()=>toggle(p)} className={`px-3 py-1.5 rounded-lg border capitalize ${priorities.includes(p) ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900/70 border-slate-700 text-blue-200/90'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button onClick={allocate} disabled={loading} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold disabled:opacity-60">{loading ? 'Menghitung...' : 'Hitung Alokasi'}</button>
      </div>

      {result && (
        <div className="mt-5 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-blue-200/90">
          <p className="mb-2">{result.note}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.entries(result.allocation).map(([k,v]) => (
              <div key={k} className="bg-slate-800/60 rounded-lg p-3">
                <div className="text-white font-semibold capitalize">{k}</div>
                <div className="text-lg">{fmt(v)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
