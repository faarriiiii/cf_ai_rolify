import { TopBar } from '../App'
import { Card, CardTitle, Badge, ActionButton } from '../components/UI'

const JOBS = [
  { id:1, title:'SWE Intern – Summer 2025',  company:'Google DeepMind', location:'London',        match:95, deadline:'Apr 1'  },
  { id:2, title:'ML Research Intern',         company:'Meta AI',         location:'Remote',         match:91, deadline:'Mar 20'},
  { id:3, title:'Data Science Intern',        company:'Anthropic',       location:'San Francisco',  match:88, deadline:'Mar 28'},
  { id:4, title:'Quant Research Intern',      company:'Nansen',          location:'London',         match:79, deadline:'Apr 10'},
  { id:5, title:'Backend Engineer Intern',    company:'Stripe',          location:'Dublin',         match:74, deadline:'Apr 15'},
]

const TABS = ['All matches','Software','Data','Product','Finance']

export default function Jobs({ dark, toggleDark }) {
  return (
    <>
      <TopBar dark={dark} toggleDark={toggleDark} title="Job matching" subtitle="Scraped from LinkedIn, Glassdoor, Handshake & more" />
      <Card dark={dark}>
        {/* Tabs */}
        <div className={`flex border-b mb-5 ${dark ? 'border-[rgba(160,100,255,0.08)]' : 'border-[rgba(0,0,0,0.1)]'}`}>
          {TABS.map((t, i) => (
            <button key={t} className={`text-[13px] px-4 py-2 border-b-2 -mb-px transition-all
              ${i === 0
                ? dark ? 'text-[#c8a8f0] border-[#9a70d8] font-medium' : 'text-[#1f4a0e] border-[#4a8a1e] font-medium'
                : dark ? 'text-[#4a3868] border-transparent' : 'text-[#7a8e72] border-transparent'}`}>
              {t}
            </button>
          ))}
        </div>

        {JOBS.map(j => (
          <div key={j.id} className={`flex items-center gap-3 py-2.5 border-b last:border-0
            ${dark ? 'border-[rgba(160,100,255,0.08)]' : 'border-[rgba(0,0,0,0.07)]'}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-semibold shrink-0
              ${dark ? 'bg-[rgba(120,60,200,0.15)] text-[#c0a0f0]' : 'bg-[rgba(100,180,50,0.13)] text-[#5a9a20]'}`}>
              {j.company[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[13px] font-medium ${dark ? 'text-[#d8c0ff]' : 'text-[#1a2e14]'}`}>{j.title}</p>
              <p className={`text-[12px] ${dark ? 'text-[#4a3868]' : 'text-[#7a8e72]'}`}>
                {j.company} · {j.location} · Deadline: {j.deadline}
              </p>
            </div>
            <Badge dark={dark} variant={j.match >= 85 ? 'high' : 'med'}>{j.match}%</Badge>
            <ActionButton dark={dark}>Apply ↗</ActionButton>
          </div>
        ))}
      </Card>
    </>
  )
}
