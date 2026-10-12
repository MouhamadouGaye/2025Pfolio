import { Send } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type FC,
  type KeyboardEvent,
} from "react";

interface Props {
  onSend: (content: string) => void | Promise<void>;
  disabled?: boolean;
}

export const MessageInput: FC<Props> = ({ onSend, disabled = false }) => {
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

  return (
    <div className="message-input">
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Écris ton message… (Entrée pour envoyer)"
        rows={1}
        disabled={disabled}
      />
      <button
        type="button"
        onClick={submit}
        disabled={disabled || !value.trim()}
        aria-label="Envoyer"
      >
        <Send size={18} />
      </button>
    </div>
  );
};
