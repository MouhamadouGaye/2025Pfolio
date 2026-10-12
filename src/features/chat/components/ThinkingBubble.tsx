// import { Bot, Loader2 } from "lucide-react";
// import type { FC } from "react";

// export const ThinkingBubble: FC = () => (
//   <div className="msg msg--ai">
//     <div className="msg__avatar">
//       <Bot size={16} />
//     </div>
//     <div className="msg__body">
//       <div className="msg__meta">
//         <span className="msg__author">MGaye AI</span>
//       </div>
//       <div className="msg__content msg__content--thinking">
//         <Loader2 size={16} className="spin" />
//         <span>Réflexion en cours…</span>
//       </div>
//     </div>
//   </div>
// );

import { Bot, Loader2 } from "lucide-react";
import { useEffect, useState, type FC } from "react";

const THINKING_MESSAGES = [
  "Analyse de votre question…",
  "Recherche dans le contexte…",
  "Consultation des sources…",
  "Formulation de la réponse…",
  "Rédaction en cours…",
  "Vérification de la cohérence…",
  "Optimisation de la réponse…",
];

const ROTATION_MS = 1800;

export const ThinkingBubble: FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % THINKING_MESSAGES.length);
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="msg msg--ai msg--thinking">
      <div className="msg__avatar msg__avatar--thinking">
        <Bot size={15} />
      </div>

      <div className="msg__body">
        <div className="msg__content msg__content--thinking">
          <Loader2 size={16} className="spin" />
          <span key={index} className="thinking-text">
            {THINKING_MESSAGES[index]}
          </span>
          <span className="thinking-dots">
            <span />
            <span />
            <span />
          </span>
        </div>
      </div>
    </div>
  );
};
