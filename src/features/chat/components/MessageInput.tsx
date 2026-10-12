// import { Send } from "lucide-react";
// import {
//   useEffect,
//   useRef,
//   useState,
//   type FC,
//   type KeyboardEvent,
// } from "react";

// interface Props {
//   onSend: (content: string) => void | Promise<void>;
//   disabled?: boolean;
// }

// export const MessageInput: FC<Props> = ({ onSend, disabled = false }) => {
//   const [value, setValue] = useState("");
//   const ref = useRef<HTMLTextAreaElement>(null);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     el.style.height = "auto";
//     el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
//   }, [value]);

//   const submit = (): void => {
//     if (!value.trim() || disabled) return;
//     void onSend(value);
//     setValue("");
//   };

//   const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       submit();
//     }
//   };

//   return (
//     <div className="message-input">
//       <textarea
//         ref={ref}
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         onKeyDown={handleKeyDown}
//         placeholder="Écris ton message… (Entrée pour envoyer)"
//         rows={1}
//         disabled={disabled}
//       />
//       <button
//         type="button"
//         onClick={submit}
//         disabled={disabled || !value.trim()}
//         aria-label="Envoyer"
//       >
//         <Send size={18} />
//       </button>
//     </div>
//   );
// };
import { Send, Square } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type FC,
  type KeyboardEvent,
} from "react";

interface Props {
  onSend: (content: string) => void | Promise<void>;
  onStop?: () => void;
  disabled?: boolean;
}

export const MessageInput: FC<Props> = ({
  onSend,
  onStop,
  disabled = false,
}) => {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }, [value]);

  const submit = (): void => {
    if (!value.trim() || disabled) return;
    void onSend(value);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const hasContent = value.trim().length > 0;
  // En cours de génération : on affiche le bouton Stop
  const isGenerating = disabled;

  return (
    <div className="message-input">
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Écris ton message… (Entrée pour envoyer, Maj+Entrée pour un saut de ligne)"
        rows={1}
        disabled={disabled}
      />

      {isGenerating ? (
        <button
          type="button"
          className="send-btn send-btn--generating"
          onClick={onStop}
          aria-label="Arrêter la génération"
          title="Arrêter la génération"
        >
          <span className="send-btn__pulse" aria-hidden="true" />
          <span
            className="send-btn__pulse send-btn__pulse--delay"
            aria-hidden="true"
          />
          <Square size={16} fill="currentColor" />
        </button>
      ) : (
        <button
          type="button"
          className="send-btn"
          onClick={submit}
          disabled={!hasContent}
          aria-label="Envoyer"
        >
          <Send size={18} />
        </button>
      )}
    </div>
  );
};
