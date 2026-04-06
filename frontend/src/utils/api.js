// frontend/src/utils/api.js
// Points to the Cloudflare Worker. Set VITE_API_URL in .env.local for local dev.
// e.g.  VITE_API_URL=http://localhost:8787
const BASE = import.meta.env.VITE_API_URL ?? "";

async function post(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

async function patch(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

async function del(path) {
  const res = await fetch(`${BASE}${path}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

// CV — accepts a File object or plain text
export function analyseCV(fileOrText) {
  if (typeof fileOrText === "string") {
    return post("/api/cv/analyse", { cv_text: fileOrText });
  }
  const form = new FormData();
  form.append("file", fileOrText);
  return fetch(`${BASE}/api/cv/analyse`, { method: "POST", body: form }).then((r) => r.json());
}

// Cover letter
export const generateCoverLetter = (data) => post("/api/coverletter/generate", data);

// Jobs
export const matchJobs = (cv_text) => post("/api/jobs/match", { cv_text });
export const getJobs = (category = "all") => get(`/api/jobs?category=${category}`);

// Tracker
export const getApplications  = ()               => get("/api/tracker");
export const addApplication    = (data)           => post("/api/tracker", data);
export const updateStatus      = (id, status)     => patch(`/api/tracker/${id}/status`, { status });
export const deleteApplication = (id)             => del(`/api/tracker/${id}`);

// Chat
export const sendChat    = (message, session_id) => post("/api/chat", { message, session_id });
export const getChatHistory = (session_id)       => get(`/api/chat/history?session_id=${session_id}`);
export const resetChat   = (session_id)          => post("/api/chat/reset", { session_id });