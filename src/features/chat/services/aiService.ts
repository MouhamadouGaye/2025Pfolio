// import type { ChatMessage, AIResponse } from "../types";

// // import { AIResponse, ChatMessage } from "../types";

// // const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// // const FREE_MODELS = [
// //   "qwen/qwen3.6-plus:free",
// //   "meta-llama/llama-3.3-70b-instruct:free",
// //   "openai/gpt-oss-120b:free",
// //   "mistralai/mistral-small-3.2-24b-instruct:free",
// // ] as const;

// // interface OpenRouterResponse {
// //   choices?: { message?: { content?: string } }[];
// //   model?: string;
// // }

// // export async function callAI(messages: ChatMessage[]): Promise<AIResponse> {
// //   const token = import.meta.env.VITE_OPENROUTER_KEY as string | undefined;
// //   if (!token) throw new Error("Clé OpenRouter manquante dans .env");

// //   const payload = messages
// //     .filter((m) => m.content.trim().length > 0)
// //     .map((m) => ({ role: m.role, content: m.content }));

// //   let lastError: Error | null = null;

// //   for (const model of FREE_MODELS) {
// //     try {
// //       const res = await fetch(OPENROUTER_URL, {
// //         method: "POST",
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "application/json",
// //           "HTTP-Referer": window.location.origin,
// //           "X-Title": "Neural AI Assistant",
// //         },
// //         body: JSON.stringify({
// //           model,
// //           messages: payload,
// //           max_tokens: 1500,
// //           temperature: 0.7,
// //         }),
// //       });

// //       if (res.status === 429) continue;

// //       if (!res.ok) {
// //         throw new Error(`HTTP ${res.status}`);
// //       }

// //       const data = (await res.json()) as OpenRouterResponse;
// //       const text = data.choices?.[0]?.message?.content ?? "";
// //       if (!text) throw new Error("Réponse vide");

// //       return { text, model: data.model ?? model };
// //     } catch (err) {
// //       lastError = err instanceof Error ? err : new Error(String(err));
// //     }
// //   }

// //   throw lastError ?? new Error("Tous les modèles sont indisponibles");
// // }
// // src/features/chat/services/aiService.ts

// export async function callAI(messages: ChatMessage[]): Promise<AIResponse> {
//   // Plus besoin de lire la clé ici, elle est sécurisée côté serveur.

//   const payloadMessages = messages
//     .filter((m) => m.content.trim().length > 0)
//     .map((m) => ({ role: m.role, content: m.content }));

//   try {
//     // 1. Appeler votre propre fonction serverless
//     const res = await fetch("/api/chat", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ messages: payloadMessages }),
//     });

//     if (!res.ok) {
//       const errorData = await res.json();
//       throw new Error(errorData.error || `Erreur serveur: ${res.status}`);
//     }

//     // 2. Récupérer la réponse
//     const data = await res.json();
//     const text = data.choices?.[0]?.message?.content ?? "";
//     const model = data.model ?? "inconnu";

//     if (!text) throw new Error("Réponse vide du serveur");

//     return { text, model };
//   } catch (error) {
//     console.error("Échec de l'appel à l'API:", error);
//     throw new Error(
//       error instanceof Error
//         ? error.message
//         : "Impossible de contacter le service AI.",
//     );
//   }
// }
// src/features/chat/services/aiService.ts
import type { ChatMessage, AIResponse } from "../types";

export async function callAI(messages: ChatMessage[]): Promise<AIResponse> {
  const payload = messages
    .filter((m) => m.content.trim().length > 0)
    .map((m) => ({ role: m.role, content: m.content }));

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: payload }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? `Erreur ${res.status}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content ?? "";
  if (!text) throw new Error("Réponse vide");

  return { text, model: data.model ?? "openrouter" };
}
