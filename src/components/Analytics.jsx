import { useEffect, useState } from 'react'

export default function Analytics(){
  const [data, setData] = useState(null)
  const [days, setDays] = useState(14)
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    const res = await fetch(`${backend}/api/analytics/summary?days=${days}`)
    const json = await res.json()
    setData(json)
  }

  useEffect(()=>{ load() },[days])

  const fmt = (x)=> new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(x||0)

  return (
    <section id="demo" className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white mb-3">Dasbor Kesehatan Bisnis</h2>
        <select value={days} onChange={e=>setDays(Number(e.target.value))} className="px-2 py-1 rounded bg-slate-900/70 border border-slate-700 text-white">
          {[7,14,30].map(d=> <option key={d} value={d}>{d} hari</option>)}
        </select>
      </div>

      {!data ? (
        <p className="text-blue-200/80">Memuat...</p>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <KPI label="Traffic" value={data.kpis.page_views} />
            <KPI label="Pembelian" value={data.kpis.purchases} />
            <KPI label="Belanja Iklan" value={fmt(data.kpis.spend_idr)} />
            <KPI label="Pendapatan" value={fmt(data.kpis.revenue_idr)} />
          </div>

          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-2">Channel Terbaik</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {data.best_channels.map((c) => (
                <div key={c.channel} className="bg-slate-800/60 rounded-lg p-3 text-blue-200/90">
                  <div className="text-white font-semibold">{c.channel}</div>
                  <div>ROAS: {c.roas}x</div>
                  <div>Belanja: {fmt(c.spend)}</div>
                  <div>Pendapatan: {fmt(c.revenue)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-2">Rekomendasi</h3>
            <ul className="list-disc list-inside text-blue-200/90">
              {data.recommendations.map((r,i)=>(<li key={i}>{r}</li>))}
            </ul>
          </div>
        </div>
      )}
    </section>
  )
}

function KPI({label, value}){
  return (
    <div className="bg-slate-800/60 rounded-lg p-3">
      <div className="text-blue-300 text-sm">{label}</div>
      <div className="text-white text-2xl font-bold">{value}</div>
    </div>
  )
}
