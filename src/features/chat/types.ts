export type MessageRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  model?: string;
  isError?: boolean;
}

export interface Thread {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
}

export interface Topic {
  id: string;
  category: string;
  title: string;
  description: string;
  prompt_system: string;
  icon: string;
  color: string;
}

export interface GreetingMap {
  [trigger: string]: string;
}

export interface AIResponse {
  text: string;
  model: string;
}

export type CSVRow = Record<string, string>;
