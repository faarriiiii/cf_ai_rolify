import { TopBar } from '../App'
import { Card, CardTitle, MetricCard, Badge, ActionButton, StatusDot } from '../components/UI'

const TOP_JOBS = [
  { id:1, role:'SWE Intern',        company:'Google DeepMind · London',    match:95, variant:'high' },
  { id:2, role:'ML Research Intern', company:'Meta AI · Remote',           match:91, variant:'high' },
  { id:3, role:'Data Science Intern',company:'Anthropic · San Francisco',  match:88, variant:'high' },
  { id:4, role:'Backend Intern',     company:'Stripe · Dublin',            match:74, variant:'med'  },
]

const APPLICATIONS = [
  { role:'SWE Intern',   company:'Palantir · London', status:'interview' },
  { role:'PM Intern',    company:'Monzo · London',    status:'applied'   },
  { role:'Data Intern',  company:'Revolut · Remote',  status:'review'    },
  { role:'Quant Intern', company:'Jane Street',       status:'rejected'  },
]

const STATUS_LABEL = { interview:'Interview', applied:'Applied', review:'Under review', rejected:'Rejected' }

export default function Dashboard({ dark, toggleDark }) {
  return (
    <>
      <TopBar dark={dark} toggleDark={toggleDark}
        title={dark ? 'Good evening, Fari 🌙' : 'Good morning, Fari ☀️'}
        subtitle="You have 3 new matches today" />

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-3 mb-7">
        <MetricCard dark={dark} label="CV score"         value={<>78<span className="text-[14px] opacity-40">/100</span></>} sub="↑ +6 since last upload" />
        <MetricCard dark={dark} label="Applications sent" value="12"  sub="4 active, 8 closed" />
        <MetricCard dark={dark} label="Interviews"        value="2"   sub="Next: Mon 10am" />
        <MetricCard dark={dark} label="Match rate"        value={<>64<span className="text-[14px] opacity-40">%</span></>} sub="Above avg for your field" />
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Top matches */}
        <Card dark={dark}>
          <CardTitle dark={dark}>Top matches for you</CardTitle>
          {TOP_JOBS.map(j => (
            <div key={j.id} className={`flex items-center gap-3 py-2.5 border-b last:border-0
              ${dark ? 'border-[rgba(160,100,255,0.08)]' : 'border-[rgba(0,0,0,0.07)]'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-semibold shrink-0
                ${dark ? 'bg-[rgba(120,60,200,0.15)] text-[#c0a0f0]' : 'bg-[rgba(100,180,50,0.13)] text-[#5a9a20]'}`}>
                {j.company[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[13px] font-medium ${dark ? 'text-[#d8c0ff]' : 'text-[#1a2e14]'}`}>{j.role}</p>
                <p className={`text-[12px] ${dark ? 'text-[#4a3868]' : 'text-[#7a8e72]'}`}>{j.company}</p>
              </div>
              <Badge dark={dark} variant={j.variant}>{j.match}% match</Badge>
              <ActionButton dark={dark}>Apply ↗</ActionButton>
            </div>
          ))}
        </Card>

        {/* Tracker snapshot */}
        <Card dark={dark}>
          <CardTitle dark={dark}>Application tracker</CardTitle>
          {APPLICATIONS.map((a, i) => (
            <div key={i} className={`flex items-center justify-between py-2.5 border-b last:border-0
              ${dark ? 'border-[rgba(160,100,255,0.08)]' : 'border-[rgba(0,0,0,0.07)]'}`}>
              <div className="flex items-center gap-2.5">
                <StatusDot dark={dark} status={a.status} />
                <div>
                  <p className={`text-[13px] ${dark ? 'text-[#c8a8f0]' : 'text-[#1a2e14]'}`}>{a.role}</p>
                  <p className={`text-[11px] ${dark ? 'text-[#4a3868]' : 'text-[#7a8e72]'}`}>{a.company}</p>
                </div>
              </div>
              <Badge dark={dark} variant={a.status}>{STATUS_LABEL[a.status]}</Badge>
            </div>
          ))}
        </Card>
      </div>
    </>
  )
}
