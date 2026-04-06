import { useState } from 'react'
import { TopBar } from '../App'
import { Card, CardTitle, GenButton, Divider } from '../components/UI'
import { analyseCV } from '../utils/api'

export default function Resume({ dark, toggleDark }) {
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const data = await analyseCV(file)
      setResult(data)
    } catch (err) {
      setError('Could not analyse CV. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const scores = result?.scores || { clarity:85, impact:72, keywords:68, structure:90, ats_fit:61 }
  const skills  = result?.skills || ['Python','React','Machine learning','SQL','Git','REST APIs']

  return (
    <>
      <TopBar dark={dark} toggleDark={toggleDark} title="Resume analyser" subtitle="Upload your CV for an AI-powered breakdown" />
      <div className="grid grid-cols-2 gap-5">

        {/* Upload */}
        <Card dark={dark}>
          <CardTitle dark={dark}>Upload CV</CardTitle>
          <label className={`block border border-dashed rounded-xl p-5 text-center cursor-pointer transition-all
            ${dark
              ? 'border-[rgba(140,80,220,0.2)] bg-[rgba(14,10,28,0.4)] hover:bg-[rgba(120,60,200,0.1)] hover:border-[rgba(140,80,220,0.4)]'
              : 'border-[rgba(80,140,40,0.3)] bg-[rgba(255,255,255,0.4)] hover:bg-[rgba(200,230,160,0.2)] hover:border-[rgba(80,140,40,0.5)]'}`}>
            <input type="file" accept=".pdf" className="hidden" onChange={handleUpload} />
            <div className="text-[28px] mb-2">⊟</div>
            <p className={`text-[13px] ${dark ? 'text-[#7a9a6a]' : 'text-[#5a6e52]'}`}>
              {loading ? 'Analysing your CV...' : 'Drop your PDF or click to browse'}
            </p>
            <p className={`text-[11px] mt-1 ${dark ? 'text-[#3a2858]' : 'text-[#8a9e82]'}`}>PDF only · max 5MB</p>
          </label>

          {error && <p className="mt-3 text-[12px] text-red-500">{error}</p>}

          {/* Skills */}
          <div className="mt-5">
            <p className={`text-[12px] font-medium mb-2.5 ${dark ? 'text-[#4a3868]' : 'text-[#7a8e72]'}`}>Detected skills</p>
            <div className="flex flex-wrap gap-1.5">
              {skills.map(s => (
                <span key={s} className={`text-[11px] px-2.5 py-1 rounded-full
                  ${dark ? 'bg-[rgba(120,60,200,0.18)] text-[#c0a0f0]' : 'bg-[#d4edb8] text-[#1f4a0e]'}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Scores */}
        <Card dark={dark}>
          <CardTitle dark={dark}>Score breakdown</CardTitle>
          {result && (
            <div className={`text-[22px] font-medium mb-4 ${dark ? 'text-[#e0ccff]' : 'text-[#1a2e14]'}`}>
              {result.overall_score}<span className="text-[14px] opacity-40">/100</span>
            </div>
          )}
          {Object.entries(scores).map(([key, val]) => (
            <div key={key} className="flex items-center gap-3 mb-2.5">
              <span className={`text-[12px] w-[90px] shrink-0 capitalize ${dark ? 'text-[#4a3868]' : 'text-[#7a8e72]'}`}>
                {key.replace('_',' ')}
              </span>
              <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${dark ? 'bg-[rgba(255,255,255,0.07)]' : 'bg-[rgba(0,0,0,0.08)]'}`}>
                <div className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${val}%`,
                    background: dark ? 'linear-gradient(90deg,#7040c0,#9a70d8)' : 'linear-gradient(90deg,#6ab832,#4a9a22)'
                  }} />
              </div>
              <span className={`text-[12px] font-medium w-7 text-right ${dark ? 'text-[#c0a0f0]' : 'text-[#27500A]'}`}>{val}</span>
            </div>
          ))}

          {result?.suggestions && (
            <>
              <Divider dark={dark} />
              <p className={`text-[12px] font-medium mb-2 ${dark ? 'text-[#4a3868]' : 'text-[#7a8e72]'}`}>Suggestions</p>
              {result.suggestions.map((s, i) => (
                <p key={i} className={`text-[12px] mb-1.5 ${dark ? 'text-[#8a70b0]' : 'text-[#5a6e52]'}`}>• {s}</p>
              ))}
            </>
          )}

          <Divider dark={dark} />
          <GenButton dark={dark}>✦ Get improvement suggestions ↗</GenButton>
        </Card>
      </div>
    </>
  )
}