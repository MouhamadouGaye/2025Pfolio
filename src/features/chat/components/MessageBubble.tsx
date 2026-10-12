// src/features/chat/components/MessageBubble.tsx
import { Bot, User } from "lucide-react";
import { memo, useEffect, useRef, useState, type FC } from "react";
import type { ChatMessage } from "../types";

interface Props {
  message: ChatMessage;
  animate?: boolean;
}

const CHARS_PER_TICK = 2; // vitesse : 2 caractères toutes les 15 ms
const TICK_MS = 15;

export const MessageBubble: FC<Props> = memo(({ message, animate = false }) => {
  const isUser = message.role === "user";
  const hasAnimated = useRef(false);

  const [displayed, setDisplayed] = useState(animate ? "" : message.content);

  useEffect(() => {
    // Ne jamais animer : les messages utilisateur, les messages déjà animés,
    // ou les messages chargés depuis localStorage.
    if (!animate || isUser || hasAnimated.current) {
      setDisplayed(message.content);
      return;
    }

    hasAnimated.current = true;
    let index = 0;
    const full = message.content;

    const interval = setInterval(() => {
      index += CHARS_PER_TICK;
      setDisplayed(full.slice(0, index));
      if (index >= full.length) {
        clearInterval(interval);
        setDisplayed(full);
      }
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [animate, isUser, message.content]);

  const isTyping = animate && displayed.length < message.content.length;

  return (
    <div className={`msg ${isUser ? "msg--user" : "msg--ai"}`}>
      <div className="msg__avatar">
        {isUser ? <User size={15} /> : <Bot size={15} />}
      </div>

      <div className="msg__body">
        <div
          className={`msg__content ${
            message.isError ? "msg__content--error" : ""
          }`}
        >
          {displayed}
          {isTyping && <span className="msg__cursor" />}
        </div>

        {message.model && <div className="msg__model">via {message.model}</div>}
      </div>
    </div>
  );
});

MessageBubble.displayName = "MessageBubble";
