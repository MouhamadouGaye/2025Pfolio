import { BrainCircuit, Download, Trash2 } from "lucide-react";
import type { FC } from "react";

interface Props {
  onExport: () => void;
  onClear: () => void;
}

export const ChatHeader: FC<Props> = ({ onExport, onClear }) => (
  <header className="chat-header">
    <div className="chat-header__brand">
      <div className="chat-header__logo">
        <BrainCircuit size={20} strokeWidth={2} />
      </div>
      <div>
        <h1>MGaye AI</h1>
        <span className="chat-header__status">
          <span className="dot" /> en ligne
        </span>
      </div>
    </div>

    <div className="chat-header__actions">
      <button className="icon-btn" onClick={onExport} title="Exporter en CSV">
        <Download size={16} />
        <span>Export</span>
      </button>
      <button
        className="icon-btn"
        onClick={onClear}
        title="Effacer la conversation"
      >
        <Trash2 size={16} />
        <span>Effacer</span>
      </button>
    </div>
  </header>
);
