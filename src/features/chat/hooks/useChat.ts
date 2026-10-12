// import { useCallback, useEffect, useRef, useState } from "react";
// import { callAI } from "../services/aiService";
// import {
//   findGreeting,
//   loadGreetings,
//   loadTopics,
// } from "../services/topicService";
// import {
//   clearHistory as clearStoredHistory,
//   loadHistory,
//   saveHistory,
// } from "../storage/historyStorage";
// import { downloadCSV, toCSV } from "../utils/csv";
// import type { ChatMessage, GreetingMap, Topic } from "../types";

// const MAX_CONTEXT = 20;

// export interface UseChatReturn {
//   messages: ChatMessage[];
//   topics: Topic[];
//   activeTopic: Topic | null;
//   isProcessing: boolean;
//   error: string | null;
//   freshId: string | null; // ← AJOUT
//   setActiveTopic: (t: Topic | null) => void;
//   sendMessage: (content: string) => Promise<void>;
//   clearAll: () => void;
//   exportCSV: () => void;
// }

// export function useChat(): UseChatReturn {
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [topics, setTopics] = useState<Topic[]>([]);
//   const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [freshId, setFreshId] = useState<string | null>(null); // ← AJOUT

//   const greetingsRef = useRef<GreetingMap>({});
//   const messagesRef = useRef<ChatMessage[]>([]);

//   useEffect(() => {
//     messagesRef.current = messages;
//   }, [messages]);

//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         const [t, g] = await Promise.all([loadTopics(), loadGreetings()]);
//         if (!mounted) return;
//         setTopics(t);
//         greetingsRef.current = g;
//       } catch (err) {
//         if (mounted) {
//           setError(err instanceof Error ? err.message : "Erreur de chargement");
//         }
//       }
//     })();
//     const saved = loadHistory();
//     if (saved.length) setMessages(saved);
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   useEffect(() => {
//     if (messages.length) saveHistory(messages);
//   }, [messages]);

//   const append = useCallback((msg: ChatMessage) => {
//     setMessages((prev) => [...prev, msg]);
//   }, []);

//   // Helper : marque un message comme "frais" (à animer en typewriter)
//   // et le démargque après la durée de l'animation + une petite marge.
//   const markFresh = useCallback((id: string, contentLength: number) => {
//     setFreshId(id);
//     const duration = Math.min(contentLength * 12 + 1500, 20000);
//     setTimeout(() => {
//       setFreshId((prev) => (prev === id ? null : prev));
//     }, duration);
//   }, []);

//   const sendMessage = useCallback(
//     async (content: string): Promise<void> => {
//       const text = content.trim();
//       if (!text || isProcessing) return;

//       setError(null);
//       setIsProcessing(true);

//       const userMessage: ChatMessage = {
//         id: crypto.randomUUID(),
//         role: "user",
//         content: text,
//         timestamp: Date.now(),
//       };
//       append(userMessage);

//       try {
//         // ---- 1. Salutation détectée dans greetings.csv ----
//         if (text.length < 40) {
//           const greeting = findGreeting(text, greetingsRef.current);
//           if (greeting) {
//             const id = crypto.randomUUID();
//             append({
//               id,
//               role: "assistant",
//               content: greeting,
//               timestamp: Date.now(),
//             });
//             markFresh(id, greeting.length); // ← animation aussi pour les salutations
//             return;
//           }
//         }

//         // ---- 2. Construction du contexte ----
//         const systemPrompt =
//           activeTopic?.prompt_system ??
//           "Tu es un assistant IA utile, précis et concis. Réponds en français.";

//         const context: ChatMessage[] = [
//           {
//             id: "sys",
//             role: "system",
//             content: systemPrompt,
//             timestamp: Date.now(),
//           },
//           ...messagesRef.current.slice(-MAX_CONTEXT),
//           userMessage,
//         ];

//         // ---- 3. Appel au serverless /api/chat ----
//         const { text: reply, model } = await callAI(context);

//         // ---- 4. Ajout de la réponse avec animation ----
//         const id = crypto.randomUUID();
//         append({
//           id,
//           role: "assistant",
//           content: reply,
//           timestamp: Date.now(),
//           model,
//         });
//         markFresh(id, reply.length); // ← déclenche le typewriter
//       } catch (err) {
//         const msg = err instanceof Error ? err.message : "Erreur inconnue";
//         setError(msg);
//         append({
//           id: crypto.randomUUID(),
//           role: "assistant",
//           content: `Une erreur est survenue : ${msg}`,
//           timestamp: Date.now(),
//           isError: true,
//         });
//         // Pas de markFresh sur les erreurs → affichage instantané
//       } finally {
//         setIsProcessing(false);
//       }
//     },
//     [activeTopic, append, isProcessing, markFresh],
//   );

//   const clearAll = useCallback((): void => {
//     setMessages([]);
//     clearStoredHistory();
//     setError(null);
//     setFreshId(null);
//   }, []);

//   const exportCSV = useCallback((): void => {
//     if (messagesRef.current.length === 0) return;
//     const rows = messagesRef.current.map((m) => ({
//       id: m.id,
//       role: m.role,
//       content: m.content,
//       timestamp: new Date(m.timestamp).toISOString(),
//       model: m.model ?? "",
//     }));
//     downloadCSV(
//       `mgaye-ai-${Date.now()}.csv`,
//       toCSV(rows, ["id", "role", "content", "timestamp", "model"]),
//     );
//   }, []);

//   return {
//     messages,
//     topics,
//     activeTopic,
//     isProcessing,
//     error,
//     freshId, // ← AJOUT
//     setActiveTopic,
//     sendMessage,
//     clearAll,
//     exportCSV,
//   };
// }
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { callAIStream } from "../services/aiService";
import {
  findGreeting,
  loadGreetings,
  loadTopics,
} from "../services/topicService";
import {
  clearAllStorage,
  loadActiveThreadId,
  loadThreads,
  saveActiveThreadId,
  saveThreads,
} from "../storage/historyStorage";
import { downloadCSV, toCSV } from "../utils/csv";
import type { ChatMessage, GreetingMap, Thread, Topic } from "../types";

const MAX_CONTEXT = 20;

export interface UseChatReturn {
  // Threads
  threads: Thread[];
  activeThreadId: string | null;
  createNewThread: () => void;
  switchThread: (id: string) => void;
  deleteThread: (id: string) => void;

  // Chat courant
  messages: ChatMessage[];
  topics: Topic[];
  activeTopic: Topic | null;
  isProcessing: boolean;
  error: string | null;
  freshId: string | null;

  setActiveTopic: (t: Topic | null) => void;
  sendMessage: (content: string) => Promise<void>;
  clearAll: () => void;
  exportCSV: () => void;
}

function makeTitleFromMessage(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > 40 ? clean.slice(0, 40) + "…" : clean || "Nouveau chat";
}

export function useChat(): UseChatReturn {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [freshId, setFreshId] = useState<string | null>(null);

  const greetingsRef = useRef<GreetingMap>({});
  const activeIdRef = useRef<string | null>(null);
  const threadsRef = useRef<Thread[]>([]);

  useEffect(() => {
    threadsRef.current = threads;
  }, [threads]);
  useEffect(() => {
    activeIdRef.current = activeThreadId;
  }, [activeThreadId]);

  /* ---------- Chargement initial ---------- */
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const [t, g] = await Promise.all([loadTopics(), loadGreetings()]);
        if (!mounted) return;
        setTopics(t);
        greetingsRef.current = g;
      } catch (err) {
        if (mounted)
          setError(err instanceof Error ? err.message : "Erreur de chargement");
      }
    })();

    const loaded = loadThreads();
    const storedActive = loadActiveThreadId();
    if (!mounted) return;

    setThreads(loaded);
    // Choisit le thread actif : celui stocké, sinon le plus récent, sinon aucun
    const initialActive =
      storedActive && loaded.some((t) => t.id === storedActive)
        ? storedActive
        : (loaded.sort((a, b) => b.updatedAt - a.updatedAt)[0]?.id ?? null);
    setActiveThreadId(initialActive);

    return () => {
      mounted = false;
    };
  }, []);

  /* ---------- Persistance ---------- */
  useEffect(() => {
    if (threads.length) saveThreads(threads);
  }, [threads]);

  useEffect(() => {
    saveActiveThreadId(activeThreadId);
  }, [activeThreadId]);

  /* ---------- Dérivés ---------- */
  const messages = useMemo(() => {
    const t = threads.find((x) => x.id === activeThreadId);
    return t?.messages ?? [];
  }, [threads, activeThreadId]);

  /* ---------- Actions threads ---------- */
  const createNewThread = useCallback((): void => {
    const newThread: Thread = {
      id: crypto.randomUUID(),
      title: "Nouveau chat",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [],
    };
    setThreads((prev) => [newThread, ...prev]);
    setActiveThreadId(newThread.id);
    setError(null);
  }, []);

  const switchThread = useCallback((id: string): void => {
    setActiveThreadId(id);
    setError(null);
  }, []);

  const deleteThread = useCallback((id: string): void => {
    setThreads((prev) => {
      const next = prev.filter((t) => t.id !== id);
      // Si on supprime le thread actif → bascule sur le plus récent
      if (id === activeIdRef.current) {
        const fallback =
          next.sort((a, b) => b.updatedAt - a.updatedAt)[0]?.id ?? null;
        setActiveThreadId(fallback);
      }
      return next;
    });
  }, []);

  /* ---------- Helpers de mise à jour ---------- */
  const patchActiveThread = useCallback((fn: (t: Thread) => Thread) => {
    const id = activeIdRef.current;
    if (!id) return;
    setThreads((prev) => prev.map((t) => (t.id === id ? fn(t) : t)));
  }, []);

  const appendToActive = useCallback(
    (msg: ChatMessage) => {
      patchActiveThread((t) => ({
        ...t,
        messages: [...t.messages, msg],
        updatedAt: Date.now(),
      }));
    },
    [patchActiveThread],
  );

  const patchMessage = useCallback(
    (msgId: string, fn: (m: ChatMessage) => ChatMessage) => {
      patchActiveThread((t) => ({
        ...t,
        messages: t.messages.map((m) => (m.id === msgId ? fn(m) : m)),
        updatedAt: Date.now(),
      }));
    },
    [patchActiveThread],
  );

  const setThreadTitleIfNeeded = useCallback(
    (title: string) => {
      patchActiveThread((t) =>
        t.title === "Nouveau chat" ? { ...t, title } : t,
      );
    },
    [patchActiveThread],
  );

  /* ---------- Envoi de message ---------- */
  // const sendMessage = useCallback(
  //   async (content: string): Promise<void> => {
  //     const text = content.trim();
  //     if (!text || isProcessing) return;

  //     // Si aucun thread actif → en créer un à la volée
  //     if (!activeIdRef.current) {
  //       const newThread: Thread = {
  //         id: crypto.randomUUID(),
  //         title: "Nouveau chat",
  //         createdAt: Date.now(),
  //         updatedAt: Date.now(),
  //         messages: [],
  //       };
  //       setThreads((prev) => [newThread, ...prev]);
  //       setActiveThreadId(newThread.id);
  //       activeIdRef.current = newThread.id;
  //     }

  //     setError(null);
  //     setIsProcessing(true);

  //     const userMessage: ChatMessage = {
  //       id: crypto.randomUUID(),
  //       role: "user",
  //       content: text,
  //       timestamp: Date.now(),
  //     };
  //     appendToActive(userMessage);
  //     setThreadTitleIfNeeded(makeTitleFromMessage(text));

  //     try {
  //       // 1. Salutation détectée
  //       if (text.length < 40) {
  //         const greeting = findGreeting(text, greetingsRef.current);
  //         if (greeting) {
  //           appendToActive({
  //             id: crypto.randomUUID(),
  //             role: "assistant",
  //             content: greeting,
  //             timestamp: Date.now(),
  //           });
  //           return;
  //         }
  //       }

  //       // 2. Contexte
  //       const systemPrompt =
  //         activeTopic?.prompt_system ??
  //         "Tu es un assistant IA utile, précis et concis. Réponds en français.";

  //       const currentMessages =
  //         threadsRef.current.find((t) => t.id === activeIdRef.current)
  //           ?.messages ?? [];

  //       const context: ChatMessage[] = [
  //         {
  //           id: "sys",
  //           role: "system",
  //           content: systemPrompt,
  //           timestamp: Date.now(),
  //         },
  //         ...currentMessages.slice(-MAX_CONTEXT),
  //         userMessage,
  //       ];

  //       // 3. Message vide à remplir en streaming
  //       const assistantId = crypto.randomUUID();
  //       appendToActive({
  //         id: assistantId,
  //         role: "assistant",
  //         content: "",
  //         timestamp: Date.now(),
  //       });

  //       // 4. Streaming
  //       await callAIStream(context, {
  //         onModel: (model) =>
  //           patchMessage(assistantId, (m) => ({ ...m, model })),
  //         onChunk: (delta) =>
  //           patchMessage(assistantId, (m) => ({
  //             ...m,
  //             content: m.content + delta,
  //           })),
  //       });

  //       setFreshId(assistantId);
  //       setTimeout(
  //         () => setFreshId((prev) => (prev === assistantId ? null : prev)),
  //         800,
  //       );
  //     } catch (err) {
  //       const msg = err instanceof Error ? err.message : "Erreur inconnue";
  //       setError(msg);
  //       appendToActive({
  //         id: crypto.randomUUID(),
  //         role: "assistant",
  //         content: `Une erreur est survenue : ${msg}`,
  //         timestamp: Date.now(),
  //         isError: true,
  //       });
  //     } finally {
  //       setIsProcessing(false);
  //     }
  //   },
  //   [
  //     activeTopic,
  //     appendToActive,
  //     patchMessage,
  //     setThreadTitleIfNeeded,
  //     isProcessing,
  //   ],
  // );
  /* ---------- Envoi de message ---------- */
  const sendMessage = useCallback(
    async (content: string): Promise<void> => {
      const text = content.trim();
      if (!text || isProcessing) return;

      // Thread à la volée si aucun actif
      if (!activeIdRef.current) {
        const newThread: Thread = {
          id: crypto.randomUUID(),
          title: "Nouveau chat",
          createdAt: Date.now(),
          updatedAt: Date.now(),
          messages: [],
        };
        setThreads((prev) => [newThread, ...prev]);
        setActiveThreadId(newThread.id);
        activeIdRef.current = newThread.id;
      }

      setError(null);
      setIsProcessing(true);

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: text,
        timestamp: Date.now(),
      };
      appendToActive(userMessage);
      setThreadTitleIfNeeded(makeTitleFromMessage(text));

      // ─── État du streaming ─────────────────────────────
      // La bulle assistant n'est créée qu'au 1er chunk reçu
      let assistantId: string | null = null;
      let accumulated = "";
      let pendingModel = "";
      let gotAnyChunk = false;

      const ensureAssistant = (): string => {
        if (assistantId) return assistantId;
        assistantId = crypto.randomUUID();
        appendToActive({
          id: assistantId,
          role: "assistant",
          content: accumulated,
          timestamp: Date.now(),
          model: pendingModel || undefined,
        });
        // Dès qu'on a un chunk → on retire le ThinkingBubble
        setIsProcessing(false);
        return assistantId;
      };

      try {
        // 1. Salutation
        if (text.length < 40) {
          const greeting = findGreeting(text, greetingsRef.current);
          if (greeting) {
            appendToActive({
              id: crypto.randomUUID(),
              role: "assistant",
              content: greeting,
              timestamp: Date.now(),
            });
            setIsProcessing(false);
            return;
          }
        }

        // 2. Contexte
        const systemPrompt =
          activeTopic?.prompt_system ??
          "Tu es un assistant IA utile, précis et concis. Réponds en français.";

        const currentMessages =
          threadsRef.current.find((t) => t.id === activeIdRef.current)
            ?.messages ?? [];

        const context: ChatMessage[] = [
          {
            id: "sys",
            role: "system",
            content: systemPrompt,
            timestamp: Date.now(),
          },
          ...currentMessages.slice(-MAX_CONTEXT),
          userMessage,
        ];

        // 3. Streaming — la bulle naît au 1er chunk
        await callAIStream(context, {
          onModel: (model) => {
            pendingModel = model;
            if (assistantId) {
              patchMessage(assistantId, (m) => ({ ...m, model }));
            }
          },
          onChunk: (delta) => {
            gotAnyChunk = true;
            accumulated += delta;

            if (!assistantId) {
              ensureAssistant();
            } else {
              patchMessage(assistantId, (m) => ({
                ...m,
                content: accumulated,
              }));
            }
          },
        });

        // 4. Fin du stream — gestion des cas anormaux
        if (!gotAnyChunk) {
          appendToActive({
            id: crypto.randomUUID(),
            role: "assistant",
            content:
              "Aucun contenu reçu du serveur. Vérifie ta clé API ou réessaie.",
            timestamp: Date.now(),
            isError: true,
          });
        } else if (assistantId) {
          setFreshId(assistantId);
          setTimeout(
            () => setFreshId((prev) => (prev === assistantId ? null : prev)),
            800,
          );
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Erreur inconnue";
        setError(msg);
        appendToActive({
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Une erreur est survenue : ${msg}`,
          timestamp: Date.now(),
          isError: true,
        });
      } finally {
        setIsProcessing(false);
      }
    },
    [
      activeTopic,
      appendToActive,
      patchMessage,
      setThreadTitleIfNeeded,
      isProcessing,
    ],
  );
  const clearAll = useCallback((): void => {
    setThreads([]);
    setActiveThreadId(null);
    setError(null);
    setFreshId(null);
    clearAllStorage();
  }, []);

  const exportCSV = useCallback((): void => {
    const rows = threadsRef.current.flatMap((t) =>
      t.messages.map((m) => ({
        thread_id: t.id,
        thread_title: t.title,
        id: m.id,
        role: m.role,
        content: m.content,
        timestamp: new Date(m.timestamp).toISOString(),
        model: m.model ?? "",
      })),
    );
    if (rows.length === 0) return;
    downloadCSV(
      `mgaye-ai-${Date.now()}.csv`,
      toCSV(rows, [
        "thread_id",
        "thread_title",
        "id",
        "role",
        "content",
        "timestamp",
        "model",
      ]),
    );
  }, []);

  return {
    threads,
    activeThreadId,
    createNewThread,
    switchThread,
    deleteThread,
    messages,
    topics,
    activeTopic,
    isProcessing,
    error,
    freshId,
    setActiveTopic,
    sendMessage,
    clearAll,
    exportCSV,
  };
}
