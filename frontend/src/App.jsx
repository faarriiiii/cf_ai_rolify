import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Resume from './pages/Resume'
import Jobs from './pages/Jobs'
import CoverLetter from './pages/CoverLetter'
import Tracker from './pages/Tracker'

const NAV = [
  { path: '/dashboard',   label: 'Dashboard',       icon: '◈' },
  { path: '/resume',      label: 'Resume analyser', icon: '◻' },
  { path: '/jobs',        label: 'Job matching',    icon: '⊞' },
  { path: '/coverletter', label: 'Cover letters',   icon: '✦' },
  { path: '/tracker',     label: 'Tracker',         icon: '◎' },
]

function Sidebar({ dark }) {
  return (
    <aside className={`fixed top-0 left-0 h-full w-[220px] z-10 flex flex-col backdrop-blur-xl
      ${dark
        ? 'bg-[rgba(26,22,42,0.88)] border-r border-[rgba(160,100,255,0.12)]'
        : 'bg-[rgba(255,255,255,0.72)] border-r border-[rgba(255,255,255,0.6)]'}`}>
      <div className={`px-5 pb-5 pt-6 border-b ${dark ? 'border-[rgba(160,100,255,0.12)]' : 'border-[rgba(0,0,0,0.08)]'}`}>
        <span className={`font-serif text-[22px] font-semibold tracking-tight ${dark ? 'text-[#c8a8f0]' : 'text-[#1f4a0e]'}`}>Rolify</span>
        <span className={`ml-2 text-[10px] font-medium px-2 py-0.5 rounded-full ${dark ? 'text-[#9a70d8] bg-[rgba(140,80,220,0.18)]' : 'text-[#3B6D11] bg-[#d4edb8]'}`}>beta</span>
      </div>
      <nav className="flex flex-col gap-1 mt-3 flex-1">
        {NAV.map(({ path, label, icon }) => (
          <NavLink key={path} to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-2.5 text-[13.5px] border-l-2 transition-all
              ${isActive
                ? dark ? 'bg-[rgba(140,80,220,0.14)] text-[#c8a8f0] border-[#9a70d8]' : 'bg-[rgba(180,220,130,0.28)] text-[#1f4a0e] border-[#4a8a1e] font-medium'
                : dark ? 'text-[#8a7aaa] border-transparent hover:bg-[rgba(140,80,220,0.1)] hover:text-[#c8a8f0]' : 'text-[#5a6e52] border-transparent hover:bg-[rgba(180,220,130,0.18)] hover:text-[#1f4a0e]'
              }`}>
            <span className="w-[18px] text-center text-[15px]">{icon}</span>{label}
          </NavLink>
        ))}
      </nav>
      <div className={`px-5 py-4 border-t ${dark ? 'border-[rgba(160,100,255,0.1)]' : 'border-[rgba(0,0,0,0.08)]'}`}>
        <p className={`text-[11px] ${dark ? 'text-[#6a5e88]' : 'text-[#8a9e82]'}`}>2 of 5 applications used</p>
        <div className={`mt-1.5 h-1 rounded-full ${dark ? 'bg-[rgba(255,255,255,0.1)]' : 'bg-[rgba(0,0,0,0.08)]'}`}>
          <div className={`h-full w-[40%] rounded-full ${dark ? 'bg-[#7a50c0]' : 'bg-[#6ab832]'}`} />
        </div>
      </div>
    </aside>
  )
}

export function TopBar({ dark, toggleDark, title, subtitle }) {
  return (
    <div className="flex items-center justify-between mb-7">
      <div>
        <h1 className={`font-serif text-[26px] font-medium ${dark ? 'text-[#e0ccff]' : 'text-[#1a2e14]'}`}>{title}</h1>
        {subtitle && <p className={`text-[13px] mt-0.5 ${dark ? 'text-[#8a7aaa]' : 'text-[#6a7e62]'}`}>{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <button onClick={toggleDark}
          className={`text-[12px] font-medium px-3.5 py-1.5 rounded-full border transition-all
            ${dark ? 'bg-[rgba(26,22,42,0.9)] border-[rgba(160,100,255,0.18)] text-[#c8a8f0]' : 'bg-[rgba(255,255,255,0.7)] border-[rgba(0,0,0,0.12)] text-[#3a5a28]'}`}>
          {dark ? '☀️ Light mode' : '🌙 Dark mode'}
        </button>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border
          ${dark ? 'bg-[rgba(26,22,42,0.9)] border-[rgba(160,100,255,0.12)]' : 'bg-[rgba(255,255,255,0.8)] border-[rgba(255,255,255,0.9)]'}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium ${dark ? 'bg-[rgba(120,60,200,0.25)] text-[#c0a0f0]' : 'bg-[#d4edb8] text-[#1f4a0e]'}`}>FM</div>
          <span className={`text-[13px] font-medium ${dark ? 'text-[#d0b8f8]' : 'text-[#1a2e14]'}`}>Fariha Mostafa</span>
        </div>
      </div>
    </div>
  )
}

function AppShell() {
  const [dark, setDark] = useState(false)
  const toggle = () => setDark(d => !d)
  return (
    <div className={dark ? 'dark' : ''}>
      <div className={`app-bg min-h-screen relative`}>
        {/* Lighter, visible cool-toned blobs */}
        <div className={`blob w-[500px] h-[500px] -top-24 -left-16 opacity-60 ${dark ? 'bg-[#3d2f6e]' : 'bg-[#c8e6b0]'}`} style={{animationDelay:'0s'}} />
        <div className={`blob w-[360px] h-[360px] top-[25%] -right-14 opacity-55 ${dark ? 'bg-[#2a2460]' : 'bg-[#a8d8c8]'}`} style={{animationDelay:'-5s'}} />
        <div className={`blob w-[300px] h-[300px] bottom-10 left-[15%] opacity-50 ${dark ? 'bg-[#4a2278]' : 'bg-[#f9dfa0]'}`} style={{animationDelay:'-9s'}} />
        <div className={`blob w-[240px] h-[240px] -bottom-14 right-[20%] opacity-50 ${dark ? 'bg-[#2e2058]' : 'bg-[#f0c8a8]'}`} style={{animationDelay:'-3s'}} />
        {dark && <div className="blob w-[200px] h-[200px] top-[55%] left-[40%] opacity-45 bg-[#381850]" style={{animationDelay:'-7s'}} />}
        <Sidebar dark={dark} />
        <main className="ml-[220px] p-8 min-h-screen relative z-[1]">
          <Routes>
            <Route path="/dashboard"   element={<Dashboard   dark={dark} toggleDark={toggle} />} />
            <Route path="/resume"      element={<Resume       dark={dark} toggleDark={toggle} />} />
            <Route path="/jobs"        element={<Jobs         dark={dark} toggleDark={toggle} />} />
            <Route path="/coverletter" element={<CoverLetter  dark={dark} toggleDark={toggle} />} />
            <Route path="/tracker"     element={<Tracker      dark={dark} toggleDark={toggle} />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  const [dark, setDark] = useState(false)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home dark={dark} toggleDark={() => setDark(d => !d)} />} />
        <Route path="/*" element={<AppShell />} />
      </Routes>
    </BrowserRouter>
  )
}
