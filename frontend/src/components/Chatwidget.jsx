// frontend/src/components/ChatWidget.jsx
import { useState, useRef, useEffect } from 'react'

const BASE = import.meta.env.VITE_API_URL ?? ''

function getSessionId() {
  let sid = sessionStorage.getItem('rolify_sid')
  if (!sid) {
    sid = 'sess_' + Math.random().toString(36).slice(2, 10)
    sessionStorage.setItem('rolify_sid', sid)
  }
  return sid
}

export default function ChatWidget({ dark }) {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([
    { role: 'assistant', content: "Hi! I'm Rolify AI 👋 Ask me anything — CV tips, cover letters, interview prep." }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [unread, setUnread] = useState(0)
  const bottomRef = useRef(null)
  const sid = useRef(getSessionId())

  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
    }
  }, [msgs, open])

  async function send(text) {
    const msg = (text ?? input).trim()
    if (!msg || loading) return
    setInput('')
    setMsgs(prev => [...prev, { role: 'user', content: msg }])
    setLoading(true)
    try {
      const res = await fetch(`${BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, session_id: sid.current }),
      })
      const data = await res.json()
      const reply = data.reply ?? 'Sorry, something went wrong.'
      setMsgs(prev => [...prev, { role: 'assistant', content: reply }])
      if (!open) setUnread(n => n + 1)
    } catch {
      setMsgs(prev => [...prev, { role: 'assistant', content: 'Could not reach Rolify AI. Check the worker is running.' }])
    }
    setLoading(false)
  }

  async function clearChat() {
    await fetch(`${BASE}/api/chat/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sid.current }),
    }).catch(() => {})
    setMsgs([{ role: 'assistant', content: 'Chat cleared! What can I help you with?' }])
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-[22px] transition-all
          ${dark ? 'bg-[#7a50c0] hover:bg-[#8a60d0]' : 'bg-[#1f4a0e] hover:bg-[#2a5e14]'}`}>
        {open ? '✕' : '💬'}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div
          className={`fixed bottom-24 right-6 z-50 w-[340px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border
            ${dark ? 'bg-[#1e1c30] border-[rgba(160,100,255,0.18)]' : 'bg-white border-[rgba(0,0,0,0.1)]'}`}
          style={{ height: '460px' }}>

          <div className={`px-4 py-3 flex items-center justify-between border-b
            ${dark ? 'border-[rgba(160,100,255,0.13)]' : 'border-[rgba(0,0,0,0.07)]'}`}>
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[14px]
                ${dark ? 'bg-[rgba(120,60,200,0.25)]' : 'bg-[#d4edb8]'}`}>✦</div>
              <div>
                <p className={`text-[13px] font-semibold ${dark ? 'text-[#e0ccff]' : 'text-[#1a2e14]'}`}>Rolify AI</p>
                <p className={`text-[11px] ${dark ? 'text-[#7a6a98]' : 'text-[#8a9e82]'}`}>Career assistant · session memory</p>
              </div>
            </div>
            <button onClick={clearChat}
              className={`text-[10px] px-2 py-1 rounded-lg opacity-60 hover:opacity-100 transition-opacity
                ${dark ? 'text-[#9a80c8]' : 'text-[#6a7e62]'}`}>
              Clear
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2.5" style={{scrollbarWidth:'thin'}}>
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[82%] px-3 py-2 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap
                  ${m.role === 'user'
                    ? dark ? 'bg-[#7a50c0] text-white' : 'bg-[#1f4a0e] text-[#d4edb8]'
                    : dark ? 'bg-[rgba(255,255,255,0.07)] text-[#d0c0f0]' : 'bg-[#f4f4f4] text-[#1a2e14]'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className={`px-3 py-2 rounded-2xl text-[12px] italic
                  ${dark ? 'bg-[rgba(255,255,255,0.07)] text-[#7a6a98]' : 'bg-[#f4f4f4] text-[#8a9e82]'}`}>
                  Rolify is thinking…
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className={`px-3 py-2.5 border-t flex gap-2 items-end
            ${dark ? 'border-[rgba(160,100,255,0.13)]' : 'border-[rgba(0,0,0,0.07)]'}`}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              placeholder="Ask anything…"
              className={`flex-1 resize-none text-[13px] rounded-xl px-3 py-2 outline-none border
                ${dark
                  ? 'bg-[rgba(255,255,255,0.06)] border-[rgba(160,100,255,0.15)] text-[#e0ccff] placeholder-[#5a4a78]'
                  : 'bg-[#f8f8f8] border-[rgba(0,0,0,0.08)] text-[#1a2e14] placeholder-[#aab8a2]'}`}
              style={{ maxHeight: '80px' }}
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              className={`px-3 py-2 rounded-xl text-[13px] font-bold transition-all disabled:opacity-35
                ${dark ? 'bg-[#7a50c0] text-white' : 'bg-[#1f4a0e] text-[#d4edb8]'}`}>
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  )
}