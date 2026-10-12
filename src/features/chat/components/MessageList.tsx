import { useEffect, useRef, type FC } from "react";
import { MessageBubble } from "./MessageBubble";
import type { ChatMessage } from "../types";
import { ThinkingBubble } from "./ThinkingIngBubble";

interface Props {
  messages: ChatMessage[];
  isProcessing: boolean;
}

export const MessageList: FC<Props> = ({ messages, isProcessing }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isProcessing]);

  if (messages.length === 0 && !isProcessing) {
    return (
      <div className="chat-empty">
        <h2>Bienvenue</h2>
        <p>Choisis un sujet à gauche ou pose directement ta question.</p>
      </div>
    );
  }

  return (
    <div className="chat-messages">
      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} />
      ))}
      {isProcessing && <ThinkingBubble />}
      <div ref={endRef} />
    </div>
  );
};
