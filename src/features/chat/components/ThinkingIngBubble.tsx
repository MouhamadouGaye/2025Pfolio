import { Bot, Loader2 } from "lucide-react";
import type { FC } from "react";

export const ThinkingBubble: FC = () => (
  <div className="msg msg--ai">
    <div className="msg__avatar">
      <Bot size={16} />
    </div>
    <div className="msg__body">
      <div className="msg__meta">
        <span className="msg__author">MGaye AI</span>
      </div>
      <div className="msg__content msg__content--thinking">
        <Loader2 size={16} className="spin" />
        <span>Réflexion en cours…</span>
      </div>
    </div>
  </div>
);
