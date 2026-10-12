import { Sparkles, X } from "lucide-react";
import { useMemo, type FC } from "react";
import type { Topic } from "../types";

interface Props {
  topics: Topic[];
  activeTopic: Topic | null;
  onSelect: (t: Topic | null) => void;
}

export const ChatSidebar: FC<Props> = ({ topics, activeTopic, onSelect }) => {
  const grouped = useMemo(() => {
    return topics.reduce<Record<string, Topic[]>>((acc, t) => {
      (acc[t.category] ??= []).push(t);
      return acc;
    }, {});
  }, [topics]);

  return (
    <aside className="chat-sidebar">
      <div className="chat-sidebar__header">
        <Sparkles size={14} />
        <span>Sujets</span>
      </div>

      {Object.entries(grouped).map(([category, list]) => (
        <div key={category} className="topic-group">
          <h4>{category}</h4>
          <div className="topic-list">
            {list.map((topic) => {
              const isActive = activeTopic?.id === topic.id;
              return (
                <button
                  key={topic.id}
                  type="button"
                  className={`topic-chip ${isActive ? "topic-chip--active" : ""}`}
                  onClick={() => onSelect(isActive ? null : topic)}
                  title={topic.description}
                >
                  <span
                    className="topic-chip__bullet"
                    style={{ background: topic.color }}
                  />
                  <span>{topic.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {activeTopic && (
        <div className="active-topic">
          <span>
            Sujet actif : <strong>{activeTopic.title}</strong>
          </span>
          <button onClick={() => onSelect(null)} title="Retirer">
            <X size={14} />
          </button>
        </div>
      )}
    </aside>
  );
};
