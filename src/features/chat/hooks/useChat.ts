import { useCallback, useEffect, useRef, useState } from "react";
import { callAI } from "../services/aiService";
import {
  findGreeting,
  loadGreetings,
  loadTopics,
} from "../services/topicService";
import {
  clearHistory as clearStoredHistory,
  loadHistory,
  saveHistory,
} from "../storage/historyStorage";
import { downloadCSV, toCSV } from "../utils/csv";
import type { ChatMessage, GreetingMap, Topic } from "../types";

const MAX_CONTEXT = 20;

export interface UseChatReturn {
  messages: ChatMessage[];
  topics: Topic[];
  activeTopic: Topic | null;
  isProcessing: boolean;
  error: string | null;
  setActiveTopic: (t: Topic | null) => void;
  sendMessage: (content: string) => Promise<void>;
  clearAll: () => void;
  exportCSV: () => void;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const greetingsRef = useRef<GreetingMap>({});
  const messagesRef = useRef<ChatMessage[]>([]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [t, g] = await Promise.all([loadTopics(), loadGreetings()]);
        if (!mounted) return;
        setTopics(t);
        greetingsRef.current = g;
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Erreur de chargement");
        }
      }
    })();
    const saved = loadHistory();
    if (saved.length) setMessages(saved);
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (messages.length) saveHistory(messages);
  }, [messages]);

  const append = useCallback((msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const sendMessage = useCallback(
    async (content: string): Promise<void> => {
      const text = content.trim();
      if (!text || isProcessing) return;

      setError(null);
      setIsProcessing(true);

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: text,
        timestamp: Date.now(),
      };
      append(userMessage);

      try {
        if (text.length < 40) {
          const greeting = findGreeting(text, greetingsRef.current);
          if (greeting) {
            append({
              id: crypto.randomUUID(),
              role: "assistant",
              content: greeting,
              timestamp: Date.now(),
            });
            return;
          }
        }

        const systemPrompt =
          activeTopic?.prompt_system ??
          "Tu es un assistant IA utile, précis et concis. Réponds en français.";

        const context: ChatMessage[] = [
          {
            id: "sys",
            role: "system",
            content: systemPrompt,
            timestamp: Date.now(),
          },
          ...messagesRef.current.slice(-MAX_CONTEXT),
          userMessage,
        ];

        const { text: reply, model } = await callAI(context);

        append({
          id: crypto.randomUUID(),
          role: "assistant",
          content: reply,
          timestamp: Date.now(),
          model,
        });
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Erreur inconnue";
        setError(msg);
        append({
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
    [activeTopic, append, isProcessing],
  );

  const clearAll = useCallback((): void => {
    setMessages([]);
    clearStoredHistory();
    setError(null);
  }, []);

  const exportCSV = useCallback((): void => {
    if (messagesRef.current.length === 0) return;
    const rows = messagesRef.current.map((m) => ({
      id: m.id,
      role: m.role,
      content: m.content,
      timestamp: new Date(m.timestamp).toISOString(),
      model: m.model ?? "",
    }));
    downloadCSV(
      `mgaye-ai-${Date.now()}.csv`,
      toCSV(rows, ["id", "role", "content", "timestamp", "model"]),
    );
  }, []);

  return {
    messages,
    topics,
    activeTopic,
    isProcessing,
    error,
    setActiveTopic,
    sendMessage,
    clearAll,
    exportCSV,
  };
}
