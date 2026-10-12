import { Bot, User } from "lucide-react";
import { memo, type FC } from "react";
import type { ChatMessage } from "../types";

interface Props {
  message: ChatMessage;
}

const formatTime = (ts: number): string =>
  new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export const MessageBubble: FC<Props> = memo(({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`msg ${isUser ? "msg--user" : "msg--ai"}`}>
      <div className="msg__avatar">
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      <div className="msg__body">
        <div className="msg__meta">
          <span className="msg__author">{isUser ? "Toi" : "MGaye AI"}</span>
          <time>{formatTime(message.timestamp)}</time>
        </div>

        <div
          className={`msg__content ${message.isError ? "msg__content--error" : ""}`}
        >
          {message.content}
        </div>

        {message.model && <div className="msg__model">via {message.model}</div>}
      </div>
    </div>
  );
});

MessageBubble.displayName = "MessageBubble";
