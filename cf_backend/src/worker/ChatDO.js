// src/worker/ChatDO.js
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
};

const SYSTEM = `You are Rolify AI, a friendly career assistant for students applying to internships.
Help with: CV tips, cover letters, interview prep, job search strategy, salary advice.
Be concise and practical. Reference earlier messages when relevant — you have conversation memory.
Never make up specific job listings. If asked to write a cover letter without a CV or job description, ask for them first.`;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });
}

export class ChatDO {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.history = [];

    this.state.blockConcurrencyWhile(async () => {
      this.history = (await this.state.storage.get("history")) || [];
    });
  }

  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/history") {
      return json({ history: this.history });
    }

    if (url.pathname === "/reset" && request.method === "POST") {
      this.history = [];
      await this.state.storage.put("history", []);
      return json({ ok: true });
    }

    if (url.pathname === "/chat" && request.method === "POST") {
      const { message } = await request.json();
      if (!message?.trim()) return json({ error: "message required" }, 400);

      const trimmed = this.history.slice(-24);

      const res = await this.env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [
          { role: "system", content: SYSTEM },
          ...trimmed,
          { role: "user", content: message },
        ],
        max_tokens: 800,
      });

      const reply =
        res.response ??
        res.choices?.[0]?.message?.content ??
        "Sorry, I could not respond right now.";

      this.history = [
        ...trimmed,
        { role: "user", content: message },
        { role: "assistant", content: reply },
      ];
      await this.state.storage.put("history", this.history);

      return json({ reply, history: this.history });
    }

    return json({ error: "Not found" }, 404);
  }
}