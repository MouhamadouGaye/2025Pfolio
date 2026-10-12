// import type { ChatMessage } from "../types";

// const KEY = "mgaye-ai-history";

// export function loadHistory(): ChatMessage[] {
//   try {
//     const raw = localStorage.getItem(KEY);
//     if (!raw) return [];
//     const parsed = JSON.parse(raw) as ChatMessage[];
//     return Array.isArray(parsed) ? parsed : [];
//   } catch {
//     return [];
//   }
// }

// export function saveHistory(messages: ChatMessage[]): void {
//   try {
//     localStorage.setItem(KEY, JSON.stringify(messages));
//   } catch (err) {
//     console.warn("Save failed:", err);
//   }
// }

// export function clearHistory(): void {
//   localStorage.removeItem(KEY);
// }
import type { ChatMessage, Thread } from "../types";

const THREADS_KEY = "mgaye-ai-threads-v2";
const ACTIVE_KEY = "mgaye-ai-active-thread-v2";

/** Données de démo affichées au premier lancement */
function seedDummyThreads(): Thread[] {
  const now = Date.now();
  const day = 86_400_000;

  return [
    {
      id: "seed-shopify",
      title: "Projet e-commerce Shopify",
      createdAt: now - day * 2,
      updatedAt: now - day * 2,
      messages: [
        {
          id: "m1",
          role: "user",
          content:
            "Je veux créer une boutique Shopify pour vendre des accessoires téléphone.",
          timestamp: now - day * 2,
        },
        {
          id: "m2",
          role: "assistant",
          content:
            "Excellente idée ! Voici un **plan express en 3 étapes** :\n\n1. **Shopify** en mode essai (1€/mois)\n2. **15 produits** max au départ\n3. **Livraison gratuite** dès 25€\n\nCommence par le thème *Dawn* — il est optimisé mobile.",
          timestamp: now - day * 2 + 5000,
          model: "qwen/qwen3.6-plus:free",
        },
      ],
    },
    {
      id: "seed-react",
      title: "Hooks React personnalisés",
      createdAt: now - day,
      updatedAt: now - day,
      messages: [
        {
          id: "m3",
          role: "user",
          content: "Comment créer un hook useLocalStorage ?",
          timestamp: now - day,
        },
        {
          id: "m4",
          role: "assistant",
          content:
            "```tsx\nexport function useLocalStorage<T>(key: string, initial: T) {\n  const [value, setValue] = useState<T>(() => {\n    const raw = localStorage.getItem(key);\n    return raw ? JSON.parse(raw) : initial;\n  });\n\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n\n  return [value, setValue] as const;\n}\n```",
          timestamp: now - day + 3000,
          model: "meta-llama/llama-3.3-70b-instruct:free",
        },
      ],
    },
    {
      id: "seed-idees",
      title: "Idées de side projects",
      createdAt: now - 3_600_000 * 5,
      updatedAt: now - 3_600_000 * 5,
      messages: [
        {
          id: "m5",
          role: "user",
          content: "Donne-moi 5 idées de side projects web rentables.",
          timestamp: now - 3_600_000 * 5,
        },
      ],
    },
  ];
}

export function loadThreads(): Thread[] {
  try {
    const raw = localStorage.getItem(THREADS_KEY);
    if (!raw) {
      const seeded = seedDummyThreads();
      saveThreads(seeded);
      return seeded;
    }
    const parsed = JSON.parse(raw) as Thread[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveThreads(threads: Thread[]): void {
  try {
    localStorage.setItem(THREADS_KEY, JSON.stringify(threads));
  } catch (err) {
    console.warn("saveThreads failed:", err);
  }
}

export function loadActiveThreadId(): string | null {
  return localStorage.getItem(ACTIVE_KEY);
}

export function saveActiveThreadId(id: string | null): void {
  if (id) localStorage.setItem(ACTIVE_KEY, id);
  else localStorage.removeItem(ACTIVE_KEY);
}

export function clearAllStorage(): void {
  localStorage.removeItem(THREADS_KEY);
  localStorage.removeItem(ACTIVE_KEY);
}

/* ————— Legacy — (pour export CSV) ————— */
export function flattenMessages(threads: Thread[]): ChatMessage[] {
  return threads.flatMap((t) => t.messages);
}
