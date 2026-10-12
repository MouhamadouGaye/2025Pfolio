// import type { VercelRequest, VercelResponse } from "@vercel/node";

// export default async function handler(req: VercelRequest, res: VercelResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { messages } = req.body ?? {};

//   if (!Array.isArray(messages)) {
//     return res.status(400).json({ error: "messages[] requis" });
//   }

//   const apiKey = process.env.OPENROUTER_KEY;
//   if (!apiKey) {
//     return res.status(500).json({ error: "Configuration serveur manquante" });
//   }
//   const FREE_MODELS = [
//     "qwen/qwen3.6-plus:free",
//     "meta-llama/llama-3.3-70b-instruct:free",
//     "openai/gpt-oss-120b:free",
//   ];

//   let lastError = "Tous les modèles sont indisponibles";

//   for (const model of FREE_MODELS) {
//     try {
//       const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${apiKey}`,
//           "Content-Type": "application/json",
//           "HTTP-Referer": req.headers.origin ?? "https://mgaye-ai.vercel.app",
//           "X-Title": "MGaye AI",
//         },
//         body: JSON.stringify({
//           model,
//           messages,
//           max_tokens: 1500,
//           temperature: 0.7,
//         }),
//       });

//       if (r.status === 429) continue;

//       if (!r.ok) {
//         lastError = `HTTP ${r.status}`;
//         continue;
//       }

//       const data = await r.json();
//       return res.status(200).json(data);
//     } catch (e) {
//       lastError = e instanceof Error ? e.message : "Erreur inconnue";
//     }
//   }

//   return res.status(502).json({ error: lastError });
// }
// api/chat.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleChatRequest } from "./_handler.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const origin = req.headers.origin ?? "https://mgaye-ai.vercel.app";
  const result = await handleChatRequest(req.body, origin);

  return res.status(result.status).json(result.data);
}
