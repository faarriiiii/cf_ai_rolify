import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home({ dark, toggleDark }) {
  const navigate = useNavigate()

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-700
      ${dark
        ? 'bg-[linear-gradient(145deg,#1a1828_0%,#1e1c2e_25%,#1c1a2c_55%,#201830_80%,#1a1826_100%)]'
        : 'bg-[linear-gradient(135deg,#f0f7e6_0%,#e8f4f0_30%,#fdf6e8_65%,#f5efe8_100%)]'}`}>

      {/* Background blobs — lighter purple-indigo tones */}
      <div className={`absolute rounded-full blur-[85px] w-[500px] h-[500px] -top-28 -left-24 transition-all duration-700
        ${dark ? 'bg-[#3d2f6e] opacity-80' : 'bg-[#c8e6b0] opacity-55'}
        animate-[drift_16s_ease-in-out_infinite_alternate]`} />
      <div className={`absolute rounded-full blur-[85px] w-[340px] h-[340px] top-[20%] -right-20 transition-all duration-700
        ${dark ? 'bg-[#2a2460] opacity-75' : 'bg-[#a8d8c8] opacity-50'}
        animate-[drift_14s_ease-in-out_infinite_alternate]`} style={{animationDelay:'-5s'}} />
      <div className={`absolute rounded-full blur-[85px] w-[280px] h-[280px] bottom-[10%] left-[10%] transition-all duration-700
        ${dark ? 'bg-[#4a2278] opacity-65' : 'bg-[#f9dfa0] opacity-50'}
        animate-[drift_18s_ease-in-out_infinite_alternate]`} style={{animationDelay:'-9s'}} />
      <div className={`absolute rounded-full blur-[85px] w-[200px] h-[200px] bottom-[5%] right-[15%] transition-all duration-700
        ${dark ? 'bg-[#2e2058] opacity-70' : 'bg-[#f0c8a8] opacity-50'}
        animate-[drift_12s_ease-in-out_infinite_alternate]`} style={{animationDelay:'-3s'}} />

      {/* NAV */}
      <nav className="relative z-10 flex items-center justify-between px-16 py-6">
        <div>
          <span className={`font-serif text-[22px] font-semibold tracking-tight ${dark ? 'text-[#c8a8f0]' : 'text-[#1f4a0e]'}`}>
            Rolify
          </span>
          <span className={`ml-2 text-[10px] font-medium px-2 py-0.5 rounded-full
            ${dark ? 'text-[#9a70d8] bg-[rgba(140,80,220,0.18)]' : 'text-[#3B6D11] bg-[#d4edb8]'}`}>
            beta
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className={`text-[13.5px] cursor-pointer ${dark ? 'text-[#9a8ab8]' : 'text-[#5a6e52]'}`}>Features</span>
          <span className={`text-[13.5px] cursor-pointer ${dark ? 'text-[#9a8ab8]' : 'text-[#5a6e52]'}`}>How it works</span>
          <span className={`text-[13.5px] cursor-pointer ${dark ? 'text-[#9a8ab8]' : 'text-[#5a6e52]'}`}>About</span>
          <button onClick={toggleDark}
            className={`text-[12px] font-medium px-3.5 py-1.5 rounded-full border transition-all
              ${dark
                ? 'bg-[rgba(26,22,42,0.9)] border-[rgba(160,100,255,0.18)] text-[#c8a8f0]'
                : 'bg-[rgba(255,255,255,0.7)] border-[rgba(0,0,0,0.12)] text-[#3a5a28]'}`}>
            {dark ? '☀️ Light mode' : '🌙 Dark mode'}
          </button>
          <button onClick={() => navigate('/dashboard')}
            className={`text-[13px] font-medium px-5 py-2 rounded-full border-none transition-all
              ${dark ? 'bg-[#c8a8f0] text-[#1a1428]' : 'bg-[#1f4a0e] text-[#d4edb8]'}`}>
            Get started →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className="relative z-[2] text-center px-16 pt-20 pb-14">
        <p className={`text-[12px] font-medium tracking-[1.5px] uppercase mb-5 ${dark ? 'text-[#9a70d8]' : 'text-[#4a8a1e]'}`}>
          AI-powered internship applications
        </p>
        <h1 className={`font-serif text-[58px] font-semibold leading-[1.12] mb-2 max-w-[780px] mx-auto
          ${dark ? 'text-[#e0ccff]' : 'text-[#1a2e14]'}`}>
          Find your role —{' '}
          <em className={dark ? 'text-[#c8a8f0]' : 'text-[#4a8a1e]'}>before</em>
          <br />the deadline does
        </h1>
        <p className={`font-serif text-[17px] italic font-medium mb-5 ${dark ? 'text-[#a088c8]' : 'text-[#6a9a4e]'}`}>
          Rolify — Helping you land the role you deserve
        </p>
        <p className={`text-[17px] leading-[1.7] max-w-[520px] mx-auto mb-9 font-light
          ${dark ? 'text-[#7a6a98]' : 'text-[#6a7e62]'}`}>
          Rolify analyses your CV, matches you to the right internships, and writes tailored cover letters in seconds.
        </p>
        <div className="flex items-center justify-center gap-3.5">
          <button onClick={() => navigate('/dashboard')}
            className={`text-[14px] font-medium px-8 py-3 rounded-full border-none transition-all
              ${dark ? 'bg-[#c8a8f0] text-[#1a1428]' : 'bg-[#1f4a0e] text-[#d4edb8]'}`}>
            Start for free →
          </button>
          <button
            className={`text-[14px] font-medium px-6 py-3 rounded-full border-[1.5px] transition-all
              ${dark
                ? 'text-[#c8a8f0] bg-[rgba(140,80,220,0.14)] border-[rgba(160,100,255,0.35)]'
                : 'text-[#1f4a0e] bg-[rgba(180,230,120,0.25)] border-[#4a8a1e]'}`}>
            See how it works
          </button>
        </div>
      </div>

      {/* SOCIAL PROOF */}
      <div className="relative z-[2] text-center px-16 pb-12">
        <p className={`text-[12px] mb-3.5 ${dark ? 'text-[#6a5e88]' : 'text-[#8a9e82]'}`}>
          Built for students targeting
        </p>
        <div className="flex items-center justify-center gap-7">
          {['GOOGLE','META','ANTHROPIC','STRIPE','DEEPMIND'].map(co => (
            <span key={co} className={`text-[12px] font-medium tracking-[0.5px]
              ${dark ? 'text-[#7a6a98]' : 'text-[#a0b090]'}`}>{co}</span>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className="relative z-[2] px-16 pb-16">
        <p className={`text-center text-[12px] font-medium tracking-[1.5px] uppercase mb-3
          ${dark ? 'text-[#9a70d8]' : 'text-[#4a8a1e]'}`}>
          What Rolify does
        </p>
        <h2 className={`text-center font-serif text-[32px] font-medium mb-11
          ${dark ? 'text-[#e0ccff]' : 'text-[#1a2e14]'}`}>
          Everything you need, nothing you don't
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon:'◻', title:'CV analyser',         desc:'Upload your CV and get an instant score with actionable suggestions to boost ATS matching.' },
            { icon:'✦', title:'Cover letter AI',     desc:'Paste any job description and get a tailored cover letter in seconds — not a template, a real one.' },
            { icon:'⊞', title:'Job matching',        desc:'Rolify finds internships that actually fit your skills and experience, ranked by match score.' },
            { icon:'◎', title:'Application tracker', desc:'Track every application in one place — from sent, to interview, to offer.' },
          ].map(f => (
            <div key={f.title} className={`rounded-2xl p-6 backdrop-blur-md border transition-all
              ${dark
                ? 'bg-[rgba(26,22,48,0.75)] border-[rgba(160,100,255,0.12)]'
                : 'bg-[rgba(255,255,255,0.68)] border-[rgba(255,255,255,0.85)]'}`}>
              <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-[16px] mb-3.5
                ${dark ? 'bg-[rgba(120,60,200,0.22)]' : 'bg-[#d4edb8]'}`}>
                {f.icon}
              </div>
              <p className={`text-[14px] font-medium mb-2 ${dark ? 'text-[#c8a8f0]' : 'text-[#1a2e14]'}`}>{f.title}</p>
              <p className={`text-[13px] leading-relaxed ${dark ? 'text-[#7a6a98]' : 'text-[#7a8e72]'}`}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WHY ROLIFY */}
      <div className="relative z-[2] px-16 pb-16">
        <div className={`rounded-2xl p-12 backdrop-blur-md border grid grid-cols-2 gap-12 items-center transition-all
          ${dark
            ? 'bg-[rgba(26,22,48,0.68)] border-[rgba(160,100,255,0.12)]'
            : 'bg-[rgba(255,255,255,0.55)] border-[rgba(255,255,255,0.8)]'}`}>
          <div>
            <p className={`text-[12px] font-medium tracking-[1.5px] uppercase mb-3
              ${dark ? 'text-[#9a70d8]' : 'text-[#4a8a1e]'}`}>Why Rolify</p>
            <h2 className={`font-serif text-[28px] font-medium leading-[1.3] mb-4
              ${dark ? 'text-[#e0ccff]' : 'text-[#1a2e14]'}`}>
              Not just another AI tool that spits out generic text
            </h2>
            <p className={`text-[14px] leading-[1.75] ${dark ? 'text-[#7a6a98]' : 'text-[#6a7e62]'}`}>
              Most AI tools give you the same cover letter with your name swapped in. Rolify reads your actual CV, understands what makes you different, and matches that to what each company is really looking for.
            </p>
          </div>
          <ul className="flex flex-col gap-3.5">
            {[
              { title:'CV-aware generation',  desc:'every cover letter is built from your real experience, not a blank prompt' },
              { title:'ATS scoring',          desc:"know before you apply whether your CV will even get past the filter" },
              { title:'Built for students',   desc:'understands projects, degrees, and limited experience' },
              { title:'One dashboard',        desc:'no more spreadsheets, sticky notes, or forgotten deadlines' },
            ].map(item => (
              <li key={item.title} className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] shrink-0 mt-0.5
                  ${dark ? 'bg-[rgba(120,60,200,0.25)] text-[#c0a0f0]' : 'bg-[#d4edb8] text-[#1f4a0e]'}`}>✓</div>
                <p className={`text-[13.5px] leading-[1.5] ${dark ? 'text-[#9a8ab8]' : 'text-[#3a4e30]'}`}>
                  <span className={`font-medium ${dark ? 'text-[#c8a8f0]' : 'text-[#1a2e14]'}`}>{item.title}</span>
                  {' '}— {item.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA STRIP */}
      <div className="relative z-[2] px-16 pb-20">
        <div className={`rounded-2xl p-14 text-center transition-all
          ${dark
            ? 'bg-[rgba(38,28,72,0.88)] border border-[rgba(160,100,255,0.18)]'
            : 'bg-[#1a2e14]'}`}>
          <h2 className={`font-serif text-[36px] font-medium mb-2
            ${dark ? 'text-[#e0ccff]' : 'text-[#d4edb8]'}`}>
            Your role is out there.
          </h2>
          <p className={`font-serif text-[16px] italic mb-3
            ${dark ? 'text-[#a088c8]' : 'text-[#7a9a6a]'}`}>
            Rolify — Helping you land the role you deserve
          </p>
          <p className={`text-[15px] mb-7 ${dark ? 'text-[#7a6a98]' : 'text-[#5a7a52]'}`}>
            Join students who are applying smarter, not harder.
          </p>
          <button onClick={() => navigate('/dashboard')}
            className={`text-[14px] font-medium px-8 py-3.5 rounded-full border-none cursor-pointer transition-all
              ${dark ? 'bg-[#c8a8f0] text-[#1a1428]' : 'bg-[#d4edb8] text-[#1a2e14]'}`}>
            Get started for free →
          </button>
        </div>
      </div>
    </div>
  )
}
