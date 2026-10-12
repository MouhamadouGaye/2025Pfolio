// import type { ChatMessage } from "../types";

// export interface StreamCallbacks {
//   onModel?: (model: string) => void;
//   onChunk: (delta: string) => void;
// }

// /**
//  * Envoie les messages au serverless /api/chat et lit la réponse en streaming.
//  * Chaque chunk de texte est transmis via onChunk().
//  */
// export async function callAIStream(
//   messages: ChatMessage[],
//   callbacks: StreamCallbacks,
//   signal?: AbortSignal,
// ): Promise<void> {
//   const payload = messages
//     .filter((m) => m.content.trim().length > 0)
//     .map((m) => ({ role: m.role, content: m.content }));

//   const res = await fetch("/api/chat", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ messages: payload }),
//     signal,
//   });

//   if (!res.ok) {
//     const err = await res.json().catch(() => ({}));
//     throw new Error(err.error ?? `Erreur ${res.status}`);
//   }

//   if (!res.body) {
//     throw new Error("Le serveur n'a pas renvoyé de stream");
//   }

//   const reader = res.body.getReader();
//   const decoder = new TextDecoder();
//   let buffer = "";

//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) break;

//     buffer += decoder.decode(value, { stream: true });

//     // Les événements SSE sont séparés par \n\n ; on traite ligne par ligne
//     const lines = buffer.split("\n");
//     buffer = lines.pop() ?? "";

//     for (const line of lines) {
//       if (!line.startsWith("data: ")) continue;
//       const data = line.slice(6).trim();
//       if (!data || data === "[DONE]") continue;

//       try {
//         const parsed = JSON.parse(data);

//         if (parsed.__meta) {
//           callbacks.onModel?.(parsed.model);
//           continue;
//         }

//         const delta = parsed.choices?.[0]?.delta?.content;
//         if (typeof delta === "string" && delta.length > 0) {
//           callbacks.onChunk(delta);
//         }
//       } catch {
//         // chunk partiel / malformé → on ignore
//       }
//     }
//   }
// }

// /* ————— Fallback non-streaming (optionnel, pour tests) ————— */
// export async function callAI(
//   messages: ChatMessage[],
// ): Promise<{ text: string; model: string }> {
//   let full = "";
//   let model = "openrouter";

//   await callAIStream(messages, {
//     onModel: (m) => {
//       model = m;
//     },
//     onChunk: (delta) => {
//       full += delta;
//     },
//   });

//   return { text: full, model };
// }
import type { ChatMessage } from "../types";

export interface StreamCallbacks {
  onModel?: (model: string) => void;
  onChunk: (delta: string) => void;
}

export async function callAIStream(
  messages: ChatMessage[],
  callbacks: StreamCallbacks,
  signal?: AbortSignal,
): Promise<void> {
  const payload = messages
    .filter((m) => m.content.trim().length > 0)
    .map((m) => ({ role: m.role, content: m.content }));

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: payload }),
    signal,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? `Erreur ${res.status}`);
  }

  if (!res.body) {
    throw new Error("Le serveur n'a pas renvoyé de stream");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  // ⬇️ try/catch ajouté autour de la boucle
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6).trim();
        if (!data || data === "[DONE]") continue;

        try {
          const parsed = JSON.parse(data);

          if (parsed.__meta) {
            callbacks.onModel?.(parsed.model);
            continue;
          }

          const delta = parsed.choices?.[0]?.delta?.content;
          if (typeof delta === "string" && delta.length > 0) {
            callbacks.onChunk(delta);
          }
        } catch {
          /* chunk partiel — on ignore */
        }
      }
    }
  } catch (err) {
    // ⬇️ Avale l'AbortError : c'est une action volontaire de l'utilisateur
    if (err instanceof DOMException && err.name === "AbortError") {
      return;
    }
    throw err;
  }
}

export async function callAI(
  messages: ChatMessage[],
): Promise<{ text: string; model: string }> {
  let full = "";
  let model = "openrouter";

  await callAIStream(messages, {
    onModel: (m) => {
      model = m;
    },
    onChunk: (delta) => {
      full += delta;
    },
  });

  return { text: full, model };
}
