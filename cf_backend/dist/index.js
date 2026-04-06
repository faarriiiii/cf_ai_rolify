var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/worker/ChatDO.js
var ChatDO = class {
  static {
    __name(this, "ChatDO");
  }
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.history = [];
    this.state.blockConcurrencyWhile(async () => {
      this.history = await this.state.storage.get("history") || [];
    });
  }
  async add(role, content) {
    this.history.push({ role, content });
    if (this.history.length > 24) this.history = this.history.slice(-24);
    await this.state.storage.put("history", this.history);
  }
  async reset() {
    this.history = [];
    await this.state.storage.put("history", []);
  }
  async getHistory() {
    return this.history;
  }
};

// src/worker/index.js
var durableObjects = {
  CHAT_DO: ChatDO
};
var index_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/chat") return handleChat(request, env, ctx);
    if (url.pathname === "/api/chat/reset") return handleReset(request, env);
    return new Response("Not found", { status: 404 });
  }
};
async function handleChat(request, env, ctx) {
  const { message, sessionId } = await request.json();
  const id = env.CHAT_DO.idFromName(sessionId);
  const stub = env.CHAT_DO.get(id);
  await stub.add("user", message);
  const history = await stub.getHistory();
  const reply = history.map((h) => `${h.role}: ${h.content}`).join("\n");
  await stub.add("assistant", reply);
  return new Response(JSON.stringify({ reply }), { headers: { "Content-Type": "application/json" } });
}
__name(handleChat, "handleChat");
async function handleReset(_req, env) {
  const id = env.CHAT_DO.idFromName("global");
  const stub = env.CHAT_DO.get(id);
  await stub.reset();
  return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
}
__name(handleReset, "handleReset");
export {
  index_default as default,
  durableObjects
};
//# sourceMappingURL=index.js.map
