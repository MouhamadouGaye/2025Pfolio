// api/_handler.ts
export interface ChatRequest {
  messages: { role: string; content: string }[];
}

export interface ChatResult {
  status: number;
  data: unknown;
}

const FREE_MODELS = [
  "qwen/qwen3.6-plus:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "openai/gpt-oss-120b:free",
];

export async function handleChatRequest(
  body: unknown,
  origin: string,
): Promise<ChatResult> {
  const { messages } = (body ?? {}) as ChatRequest;

  if (!Array.isArray(messages)) {
    return { status: 400, data: { error: "messages[] requis" } };
  }

  const apiKey = process.env.OPENROUTER_KEY;
  if (!apiKey) {
    return { status: 500, data: { error: "Configuration serveur manquante" } };
  }

  let lastError = "Tous les modèles sont indisponibles";

  for (const model of FREE_MODELS) {
    try {
      const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": origin,
          "X-Title": "MGaye AI",
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: 1500,
          temperature: 0.7,
        }),
      });

      if (r.status === 429) continue;
      if (!r.ok) {
        lastError = `HTTP ${r.status}`;
        continue;
      }

      const data = await r.json();
      return { status: 200, data };
    } catch (e) {
      lastError = e instanceof Error ? e.message : "Erreur inconnue";
    }
  }

  return { status: 502, data: { error: lastError } };
}
