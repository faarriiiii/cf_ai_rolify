// src/worker/index.js
import { ChatDO } from "./ChatDO.js";
export { ChatDO };

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

function safeJSON(raw, fallback) {
  try {
    // Strip markdown fences
    let clean = raw.replace(/```json\s*/gi, "").replace(/```/g, "").trim();
    // Find the outermost { } or [ ] block
    const objMatch = clean.match(/\{[\s\S]*\}/);
    const arrMatch = clean.match(/\[[\s\S]*\]/);
    // Pick whichever comes first
    let match = null;
    if (objMatch && arrMatch) {
      match = objMatch.index <= arrMatch.index ? objMatch[0] : arrMatch[0];
    } else {
      match = (objMatch || arrMatch)?.[0];
    }
    return JSON.parse(match ?? clean);
  } catch {
    return fallback;
  }
}

async function llm(env, userMsg, systemMsg = "", max_tokens = 1200) {
  const messages = systemMsg
    ? [{ role: "system", content: systemMsg }, { role: "user", content: userMsg }]
    : [{ role: "user", content: userMsg }];
  
  console.log("Calling AI with message length:", userMsg.length);
  
  const res = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
    messages,
    max_tokens,
    temperature: 0,
  });
  
  console.log("AI response:", JSON.stringify(res).slice(0, 200));
  
  return res.response ?? res.choices?.[0]?.message?.content ?? "";
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (method === "OPTIONS") return new Response(null, { headers: CORS });

    try {

      // ── CV Analyse ──────────────────────────────────────────────
      if (path === "/api/cv/analyse" && method === "POST") {
        let cv_text = "";

        const contentType = request.headers.get("content-type") ?? "";
        if (contentType.includes("multipart/form-data")) {
          const formData = await request.formData();
          const file = formData.get("file");
          if (!file) return json({ error: "No file uploaded" }, 400);
          // Extract readable text from PDF bytes (strip binary, keep ASCII words)
          const buffer = await file.arrayBuffer();
          const bytes = new Uint8Array(buffer);
          let raw = "";
          for (let i = 0; i < bytes.length; i++) {
            if (bytes[i] >= 32 && bytes[i] < 127) raw += String.fromCharCode(bytes[i]);
            else raw += " ";
          }
          // Pull out words 3+ chars long to get readable CV content
          cv_text = raw.match(/[A-Za-z][A-Za-z0-9.@+\-]{2,}/g)?.join(" ") ?? "";
        } else {
          const body = await request.json();
          cv_text = body.cv_text ?? "";
        }

        if (!cv_text.trim()) return json({ error: "cv_text required" }, 400);

        const raw = await llm(
          env,
          `Analyse this CV and return a JSON object. CV text:\n${cv_text}`,
          `You are a CV analyser. Output ONLY a raw JSON object, no markdown fences, no explanation, no preamble. The JSON must have: overall_score (int 0-100), scores (object with clarity, impact, keywords, structure, ats_fit each as int 0-100), skills (string array), suggestions (array of 3 strings). Start your response with { and end with }.`
        );
        const parsed = safeJSON(raw, {
          overall_score: 0,
          scores: { clarity: 0, impact: 0, keywords: 0, structure: 0, ats_fit: 0 },
          skills: [],
          suggestions: ["Could not analyse CV. Please try again."],
        });
        return json(parsed);
      }

      // ── Cover Letter ─────────────────────────────────────────────
      if (path === "/api/coverletter/generate" && method === "POST") {
        const { cv_text, job_title, company, job_description } = await request.json();
        if (!cv_text?.trim() || !job_description?.trim())
          return json({ error: "cv_text and job_description required" }, 400);

        const text = await llm(
          env,
          `Write a complete, professional, personalised cover letter. No placeholders.\n\nRole: ${job_title ?? "the role"} at ${company ?? "the company"}\nJob description:\n${job_description}\n\nApplicant CV:\n${cv_text}\n\nCover letter:`,
          "",
          1400
        );
        return json({ text });
      }

      // ── Jobs ─────────────────────────────────────────────────────
      if (path === "/api/jobs/match" && method === "POST") {
        const { cv_text } = await request.json();
        if (!cv_text?.trim()) return json({ error: "cv_text required" }, 400);

        const raw = await llm(
          env,
          `Based on this CV, suggest 5 real internship roles. Return ONLY a JSON array, no markdown.\nEach item: {title, company, match_score (int 0-100), reason, location}.\n\nCV:\n${cv_text}`,
          "",
          900
        );
        const arr = safeJSON(raw, []);
        return json({ jobs: Array.isArray(arr) ? arr : arr.jobs ?? [] });
      }

      // GET /api/jobs — return empty list (frontend compat)
      if (path === "/api/jobs" && method === "GET") {
        return json({ jobs: [] });
      }

      // ── Tracker (D1) ─────────────────────────────────────────────
      if (path === "/api/tracker") {
        if (method === "GET") {
          const { results } = await env.ROLIFY_DB.prepare(
            "SELECT * FROM applications ORDER BY id DESC"
          ).all();
          return json({ applications: results ?? [] });
        }
        if (method === "POST") {
          const body = await request.json();
          if (!body.role?.trim() || !body.company?.trim())
            return json({ error: "role and company required" }, 400);
          await env.ROLIFY_DB.prepare(
            "INSERT INTO applications (role, company, status, applied_date, notes) VALUES (?,?,?,?,?)"
          )
            .bind(body.role, body.company, body.status ?? "applied", body.applied_date ?? null, body.notes ?? null)
            .run();
          return json({ message: "Application added!" });
        }
      }

      const patchMatch = path.match(/^\/api\/tracker\/(\d+)\/status$/);
      if (patchMatch && method === "PATCH") {
        const { status } = await request.json().catch(() => ({ status: url.searchParams.get("status") }));
        const valid = ["applied", "under review", "interview", "offer", "rejected"];
        if (!valid.includes(status)) return json({ error: "Invalid status" }, 400);
        await env.ROLIFY_DB.prepare("UPDATE applications SET status=? WHERE id=?")
          .bind(status, patchMatch[1])
          .run();
        return json({ message: "Updated!" });
      }

      const deleteMatch = path.match(/^\/api\/tracker\/(\d+)$/);
      if (deleteMatch && method === "DELETE") {
        await env.ROLIFY_DB.prepare("DELETE FROM applications WHERE id=?")
          .bind(deleteMatch[1])
          .run();
        return json({ message: "Deleted!" });
      }

      // ── Chat (Durable Object) ─────────────────────────────────────
      if (path === "/api/chat" && method === "POST") {
        const body = await request.json();
        const message = body.message ?? "";
        const sessionId = body.sessionId ?? body.session_id ?? "default";
        if (!message.trim()) return json({ error: "message required" }, 400);

        const id = env.CHAT_DO.idFromName(sessionId);
        const stub = env.CHAT_DO.get(id);
        return stub.fetch(
          new Request("https://internal/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
          })
        );
      }

      if (path === "/api/chat/reset" && method === "POST") {
        const body = await request.json().catch(() => ({}));
        const sessionId = body.sessionId ?? body.session_id ?? "default";
        const id = env.CHAT_DO.idFromName(sessionId);
        const stub = env.CHAT_DO.get(id);
        return stub.fetch(new Request("https://internal/reset", { method: "POST" }));
      }

      if (path === "/api/chat/history" && method === "GET") {
        const sessionId = url.searchParams.get("session_id") ?? "default";
        const id = env.CHAT_DO.idFromName(sessionId);
        const stub = env.CHAT_DO.get(id);
        return stub.fetch(new Request("https://internal/history"));
      }

      return json({ message: "cf_ai_rolify API 🚀" });

    } catch (e) {
      console.error("Worker error:", e);
      return json({ error: "Internal server error" }, 500);
    }
  },
};