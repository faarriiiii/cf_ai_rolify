// Shared UI components used across all pages

export function Card({ dark, children, className = '' }) {
  return (
    <div className={`rounded-[14px] p-5 backdrop-blur-md border transition-all
      ${dark
        ? 'bg-[rgba(12,8,22,0.78)] border-[rgba(160,100,255,0.09)] shadow-[0_4px_40px_rgba(80,20,160,0.18)]'
        : 'bg-[rgba(255,255,255,0.72)] border-[rgba(255,255,255,0.85)] shadow-[0_2px_20px_rgba(80,140,40,0.06)]'}
      ${className}`}>
      {children}
    </div>
  )
}

export function CardTitle({ dark, children }) {
  return (
    <h2 className={`text-[14px] font-medium mb-4 ${dark ? 'text-[#c8a8f0]' : 'text-[#1a2e14]'}`}>
      {children}
    </h2>
  )
}

export function MetricCard({ dark, label, value, sub }) {
  return (
    <div className={`rounded-xl p-4 backdrop-blur-md border transition-all
      ${dark
        ? 'bg-[rgba(14,10,28,0.75)] border-[rgba(160,100,255,0.1)]'
        : 'bg-[rgba(255,255,255,0.75)] border-[rgba(255,255,255,0.85)]'}`}>
      <p className={`text-[12px] mb-1.5 ${dark ? 'text-[#4a3868]' : 'text-[#7a8e72]'}`}>{label}</p>
      <p className={`text-[24px] font-medium ${dark ? 'text-[#e0ccff]' : 'text-[#1a2e14]'}`}>{value}</p>
      {sub && <p className={`text-[11px] mt-1 ${dark ? 'text-[#9a70d8]' : 'text-[#4a8a1e]'}`}>{sub}</p>}
    </div>
  )
}

export function Badge({ dark, variant = 'high', children }) {
  const styles = {
    high: dark
      ? 'bg-[rgba(120,60,200,0.18)] text-[#c0a0f0]'
      : 'bg-[#d4edb8] text-[#1f4a0e]',
    med: dark
      ? 'bg-[rgba(255,255,255,0.06)] text-[#6a5a88]'
      : 'bg-[#f0ece4] text-[#5a5040]',
    interview: dark ? 'bg-[rgba(120,60,200,0.18)] text-[#c0a0f0]' : 'bg-[#d4edb8] text-[#1f4a0e]',
    applied:   dark ? 'bg-[rgba(60,80,200,0.2)] text-[#90a8f0]'   : 'bg-[#daedf8] text-[#1a5a8a]',
    review:    dark ? 'bg-[rgba(180,100,20,0.18)] text-[#d0a060]'  : 'bg-[#faeacc] text-[#7a4a08]',
    rejected:  dark ? 'bg-[rgba(255,255,255,0.06)] text-[#4a3868]' : 'bg-[#f0ece4] text-[#5a5040]',
  }
  return (
    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${styles[variant] || styles.high}`}>
      {children}
    </span>
  )
}

export function ActionButton({ dark, onClick, children }) {
  return (
    <button onClick={onClick}
      className={`text-[11px] font-medium px-2.5 py-1 rounded-md border transition-all
        ${dark
          ? 'border-[rgba(140,80,220,0.25)] text-[#9a70d8] hover:bg-[rgba(120,60,200,0.15)]'
          : 'border-[rgba(80,140,40,0.3)] text-[#3B6D11] hover:bg-[#d4edb8]'}`}>
      {children}
    </button>
  )
}

export function GenButton({ dark, onClick, children }) {
  return (
    <button onClick={onClick}
      className={`inline-flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-2 rounded-lg border transition-all
        ${dark
          ? 'text-[#c8a8f0] bg-[rgba(120,60,200,0.15)] border-[rgba(140,80,220,0.25)] hover:bg-[rgba(120,60,200,0.28)]'
          : 'text-[#1f4a0e] bg-[#d4edb8] border-[rgba(80,140,40,0.3)] hover:bg-[#c2e0a0]'}`}>
      {children}
    </button>
  )
}

export function Divider({ dark }) {
  return <div className={`border-t mt-4 pt-3.5 ${dark ? 'border-[rgba(160,100,255,0.08)]' : 'border-[rgba(0,0,0,0.08)]'}`} />
}

export function StatusDot({ status, dark }) {
  const colors = {
    interview: dark ? 'bg-[#9a70d8]' : 'bg-[#4a9a22]',
    applied:   dark ? 'bg-[#7080d8]' : 'bg-[#3a8acc]',
    review:    dark ? 'bg-[#c090e0]' : 'bg-[#d4900a]',
    rejected:  dark ? 'bg-[#3a2858]' : 'bg-[#a0a090]',
  }
  return <span className={`w-2 h-2 rounded-full flex-shrink-0 ${colors[status] || colors.applied}`} />
}
