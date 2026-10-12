import type { ChatMessage } from "../types";

const KEY = "mgaye-ai-history";

export function loadHistory(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatMessage[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveHistory(messages: ChatMessage[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(messages));
  } catch (err) {
    console.warn("Save failed:", err);
  }
}

export function clearHistory(): void {
  localStorage.removeItem(KEY);
}
