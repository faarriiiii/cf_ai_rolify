import { useState } from 'react'
import { TopBar } from '../App'
import { Card, CardTitle, GenButton, ActionButton, Divider } from '../components/UI'
import { generateCoverLetter } from '../utils/api'

const RECENT = [
  { role:'SWE Intern · Palantir',  date:'2 days ago' },
  { role:'PM Intern · Monzo',      date:'4 days ago' },
  { role:'Data Intern · Revolut',  date:'1 week ago' },
]

export default function CoverLetter({ dark, toggleDark }) {
  const [form, setForm]       = useState({ job_title:'', company:'', job_description:'', cv_text:'' })
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const handleGenerate = async () => {
    if (!form.job_title || !form.job_description) {
      setError('Please fill in the role and job description.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const data = await generateCoverLetter(form)
      setResult(data.cover_letter)
    } catch {
      setError('Could not generate. Make sure the backend is running and API key is set.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = `w-full rounded-lg text-[13px] px-3 py-2 border transition-all outline-none
    ${dark
      ? 'bg-[rgba(14,10,28,0.65)] border-[rgba(160,100,255,0.12)] text-[#d0b8f8] placeholder:text-[#3a2858]'
      : 'bg-[rgba(255,255,255,0.6)] border-[rgba(0,0,0,0.15)] text-[#1a2e14] placeholder:text-[#aab8a2]'}`

  return (
    <>
      <TopBar dark={dark} toggleDark={toggleDark} title="Cover letter generator" subtitle="Tailored in seconds using your CV and job description" />
      <div className="grid grid-cols-2 gap-5">

        <Card dark={dark}>
          <CardTitle dark={dark}>Generate a cover letter</CardTitle>

          <div className="mb-3">
            <label className={`block text-[12px] mb-1.5 ${dark ? 'text-[#4a3868]' : 'text-[#7a8e72]'}`}>Role</label>
            <input className={inputClass} placeholder="e.g. SWE Intern"
              value={form.job_title} onChange={e => setForm(f => ({...f, job_title: e.target.value}))} />
          </div>

          <div className="mb-3">
            <label className={`block text-[12px] mb-1.5 ${dark ? 'text-[#4a3868]' : 'text-[#7a8e72]'}`}>Company</label>
            <input className={inputClass} placeholder="e.g. Google DeepMind"
              value={form.company} onChange={e => setForm(f => ({...f, company: e.target.value}))} />
          </div>

          <div className="mb-3">
            <label className={`block text-[12px] mb-1.5 ${dark ? 'text-[#4a3868]' : 'text-[#7a8e72]'}`}>Job description</label>
            <textarea className={`${inputClass} h-24 resize-none`} placeholder="Paste the job description here..."
              value={form.job_description} onChange={e => setForm(f => ({...f, job_description: e.target.value}))} />
          </div>

          <div className="mb-4">
            <label className={`block text-[12px] mb-1.5 ${dark ? 'text-[#4a3868]' : 'text-[#7a8e72]'}`}>Your CV text (paste or type)</label>
            <textarea className={`${inputClass} h-20 resize-none`} placeholder="Paste your CV content here for best results..."
              value={form.cv_text} onChange={e => setForm(f => ({...f, cv_text: e.target.value}))} />
          </div>

          {error && <p className="text-[12px] text-red-500 mb-3">{error}</p>}

          <GenButton dark={dark} onClick={handleGenerate}>
            {loading ? '⏳ Generating...' : '✦ Generate cover letter ↗'}
          </GenButton>

          {/* Result */}
          {result && (
            <>
              <Divider dark={dark} />
              <p className={`text-[12px] font-medium mb-2 ${dark ? 'text-[#4a3868]' : 'text-[#7a8e72]'}`}>Generated cover letter</p>
              <div className={`text-[13px] leading-relaxed whitespace-pre-wrap rounded-lg p-3 border
                ${dark
                  ? 'bg-[rgba(20,14,36,0.6)] border-[rgba(160,100,255,0.1)] text-[#c8b0e8]'
                  : 'bg-[rgba(240,247,230,0.6)] border-[rgba(80,140,40,0.15)] text-[#2a3e20]'}`}>
                {result}
              </div>
              <div className="mt-2 flex gap-2">
                <ActionButton dark={dark} onClick={() => navigator.clipboard.writeText(result)}>Copy</ActionButton>
              </div>
            </>
          )}
        </Card>

        <Card dark={dark}>
          <CardTitle dark={dark}>Recent cover letters</CardTitle>
          {RECENT.map((r, i) => (
            <div key={i} className={`flex items-center justify-between py-2.5 border-b last:border-0
              ${dark ? 'border-[rgba(160,100,255,0.08)]' : 'border-[rgba(0,0,0,0.07)]'}`}>
              <div>
                <p className={`text-[13px] ${dark ? 'text-[#c8a8f0]' : 'text-[#1a2e14]'}`}>{r.role}</p>
                <p className={`text-[11px] ${dark ? 'text-[#4a3868]' : 'text-[#7a8e72]'}`}>Generated {r.date}</p>
              </div>
              <ActionButton dark={dark}>View</ActionButton>
            </div>
          ))}
        </Card>
      </div>
    </>
  )
}