// // src/features/chat/components/MessageBubble.tsx
// import { Bot, User } from "lucide-react";
// import { memo, type FC } from "react";
// import { MarkdownRenderer } from "./MarkdownRender";
// import type { ChatMessage } from "../types";

// interface Props {
//   message: ChatMessage;
//   animate?: boolean;
// }

// export const MessageBubble: FC<Props> = memo(({ message, animate = false }) => {
//   const isUser = message.role === "user";

//   return (
//     <div
//       className={`msg ${isUser ? "msg--user" : "msg--ai"} ${
//         animate ? "msg--enter" : ""
//       }`}
//     >
//       <div className="msg__avatar">
//         {isUser ? <User size={15} /> : <Bot size={15} />}
//       </div>

//       <div className="msg__body">
//         <div
//           className={`msg__content ${
//             message.isError ? "msg__content--error" : ""
//           }`}
//         >
//           {isUser ? (
//             <p className="msg__plain">{message.content}</p>
//           ) : (
//             <MarkdownRenderer content={message.content} />
//           )}
//         </div>

//         {message.model && <div className="msg__model">via {message.model}</div>}
//       </div>
//     </div>
//   );
// });

// MessageBubble.displayName = "MessageBubble";
import { Bot, User } from "lucide-react";
import { memo, type FC } from "react";
import { MarkdownRenderer } from "./MarkdownRender"; // ← FIX : Renderer (avec "er")
import type { ChatMessage } from "../types";

interface Props {
  message: ChatMessage;
  animate?: boolean;
  isStreaming?: boolean;
}

export const MessageBubble: FC<Props> = memo(
  ({ message, animate = false, isStreaming = false }) => {
    const isUser = message.role === "user";

    return (
      <div
        className={`msg ${isUser ? "msg--user" : "msg--ai"} ${
          animate ? "msg--enter" : ""
        }`}
      >
        <div className="msg__avatar">
          {isUser ? <User size={15} /> : <Bot size={15} />}
        </div>

        <div className="msg__body">
          <div
            className={`msg__content ${
              message.isError ? "msg__content--error" : ""
            }`}
          >
            {isUser ? (
              <p className="msg__plain">{message.content}</p>
            ) : (
              <>
                <MarkdownRenderer content={message.content} />
                {isStreaming && <span className="msg__cursor" />}
              </>
            )}
          </div>

          {message.model && (
            <div className="msg__model">via {message.model}</div>
          )}
        </div>
      </div>
    );
  },
);

MessageBubble.displayName = "MessageBubble";
