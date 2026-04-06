import { useState, useEffect } from 'react'
import { TopBar } from '../App'
import { Card, CardTitle, MetricCard, Badge, ActionButton, GenButton, Divider, StatusDot } from '../components/UI'
import { getApplications, addApplication, updateStatus, deleteApplication } from '../utils/api'

const STATUS_LABEL = { interview:'Interview', applied:'Applied', review:'Under review', rejected:'Rejected', offer:'Offer!' }
const STATUSES = ['applied','review','interview','offer','rejected']

const MOCK = [
  { id:1, role:'SWE Intern',   company:'Palantir · London',  status:'interview', applied_date:'Feb 14' },
  { id:2, role:'PM Intern',    company:'Monzo · London',     status:'applied',   applied_date:'Feb 20' },
  { id:3, role:'Data Intern',  company:'Revolut · Remote',   status:'review',    applied_date:'Feb 28' },
  { id:4, role:'Quant Intern', company:'Jane Street',        status:'rejected',  applied_date:'Jan 30' },
]

export default function Tracker({ dark, toggleDark }) {
  const [apps, setApps]     = useState(MOCK)
  const [showForm, setForm] = useState(false)
  const [newApp, setNewApp] = useState({ role:'', company:'', status:'applied', applied_date:'' })

  useEffect(() => {
    getApplications()
      .then((data) => { if (data.applications?.length) setApps(data.applications) })
      .catch(() => {}) // fallback to mock data if backend not running
  }, [])

  const handleAdd = async () => {
    try {
      await addApplication(newApp)
      const data = await getApplications()
      setApps(data.applications)
    } catch {
      setApps(a => [...a, { ...newApp, id: Date.now() }])
    }
    setNewApp({ role:'', company:'', status:'applied', applied_date:'' })
    setForm(false)
  }

  const handleStatus = async (id, status) => {
    try {
      await updateStatus(id, status)
    } catch {}
    setApps(a => a.map(x => x.id === id ? {...x, status} : x))
  }

  const handleDelete = async (id) => {
    try { await deleteApplication(id) } catch {}
    setApps(a => a.filter(x => x.id !== id))
  }

  const counts = {
    applied:   apps.filter(a => a.status === 'applied').length,
    review:    apps.filter(a => a.status === 'review').length,
    interview: apps.filter(a => a.status === 'interview').length,
    offer:     apps.filter(a => a.status === 'offer').length,
  }

  const inputClass = `w-full rounded-lg text-[13px] px-3 py-2 border outline-none transition-all
    ${dark
      ? 'bg-[rgba(14,10,28,0.65)] border-[rgba(160,100,255,0.12)] text-[#d0b8f8] placeholder:text-[#3a2858]'
      : 'bg-[rgba(255,255,255,0.6)] border-[rgba(0,0,0,0.15)] text-[#1a2e14]'}`

  return (
    <>
      <TopBar dark={dark} toggleDark={toggleDark} title="Application tracker" subtitle="All your applications in one place" />

      <div className="grid grid-cols-4 gap-3 mb-5">
        <MetricCard dark={dark} label="Applied"      value={apps.length} />
        <MetricCard dark={dark} label="Under review" value={counts.review} />
        <MetricCard dark={dark} label="Interviews"   value={counts.interview} />
        <MetricCard dark={dark} label="Offers"       value={counts.offer} />
      </div>

      <Card dark={dark}>
        <div className="flex items-center justify-between mb-4">
          <CardTitle dark={dark}>Applications</CardTitle>
          <ActionButton dark={dark} onClick={() => setForm(f => !f)}>+ Add new</ActionButton>
        </div>

        {/* Add form */}
        {showForm && (
          <div className={`rounded-xl p-4 mb-4 border ${dark ? 'bg-[rgba(20,14,36,0.6)] border-[rgba(160,100,255,0.12)]' : 'bg-[rgba(240,247,230,0.5)] border-[rgba(80,140,40,0.15)]'}`}>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input className={inputClass} placeholder="Role (e.g. SWE Intern)"
                value={newApp.role} onChange={e => setNewApp(a => ({...a, role:e.target.value}))} />
              <input className={inputClass} placeholder="Company"
                value={newApp.company} onChange={e => setNewApp(a => ({...a, company:e.target.value}))} />
              <input className={inputClass} placeholder="Date applied (e.g. Mar 10)"
                value={newApp.applied_date} onChange={e => setNewApp(a => ({...a, applied_date:e.target.value}))} />
              <select className={inputClass} value={newApp.status} onChange={e => setNewApp(a => ({...a, status:e.target.value}))}>
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <GenButton dark={dark} onClick={handleAdd}>+ Save application</GenButton>
          </div>
        )}

        {apps.map((a, i) => (
          <div key={a.id || i} className={`flex items-center justify-between py-2.5 border-b last:border-0
            ${dark ? 'border-[rgba(160,100,255,0.08)]' : 'border-[rgba(0,0,0,0.07)]'}`}>
            <div className="flex items-center gap-2.5">
              <StatusDot dark={dark} status={a.status} />
              <div>
                <p className={`text-[13px] ${dark ? 'text-[#c8a8f0]' : 'text-[#1a2e14]'}`}>{a.role}</p>
                <p className={`text-[11px] ${dark ? 'text-[#4a3868]' : 'text-[#7a8e72]'}`}>
                  {a.company}{a.applied_date ? ` · Applied ${a.applied_date}` : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge dark={dark} variant={a.status}>{STATUS_LABEL[a.status] || a.status}</Badge>
              <select
                className={`text-[11px] px-1.5 py-0.5 rounded border outline-none cursor-pointer
                  ${dark ? 'bg-transparent border-[rgba(160,100,255,0.15)] text-[#6a5a88]' : 'bg-transparent border-[rgba(0,0,0,0.12)] text-[#7a8e72]'}`}
                value={a.status}
                onChange={e => handleStatus(a.id, e.target.value)}>
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <button onClick={() => handleDelete(a.id)}
                className={`text-[11px] px-1.5 py-0.5 rounded transition-all ${dark ? 'text-[#3a2858] hover:text-[#c0a0f0]' : 'text-[#ccc] hover:text-red-400'}`}>
                ✕
              </button>
            </div>
          </div>
        ))}

        <Divider dark={dark} />
        <GenButton dark={dark}>✦ Get application insights ↗</GenButton>
      </Card>
    </>
  )
}