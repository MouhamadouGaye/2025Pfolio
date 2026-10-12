// import { Sparkles, X } from "lucide-react";
// import { useMemo, type FC } from "react";
// import type { Topic } from "../types";

// interface Props {
//   topics: Topic[];
//   activeTopic: Topic | null;
//   onSelect: (t: Topic | null) => void;
// }

// export const ChatSidebar: FC<Props> = ({ topics, activeTopic, onSelect }) => {
//   const grouped = useMemo(() => {
//     return topics.reduce<Record<string, Topic[]>>((acc, t) => {
//       (acc[t.category] ??= []).push(t);
//       return acc;
//     }, {});
//   }, [topics]);

//   return (
//     <aside className="chat-sidebar">
//       <div className="chat-sidebar__header">
//         <Sparkles size={14} />
//         <span>Sujets</span>
//       </div>

//       {Object.entries(grouped).map(([category, list]) => (
//         <div key={category} className="topic-group">
//           <h4>{category}</h4>
//           <div className="topic-list">
//             {list.map((topic) => {
//               const isActive = activeTopic?.id === topic.id;
//               return (
//                 <button
//                   key={topic.id}
//                   type="button"
//                   className={`topic-chip ${isActive ? "topic-chip--active" : ""}`}
//                   onClick={() => onSelect(isActive ? null : topic)}
//                   title={topic.description}
//                 >
//                   <span
//                     className="topic-chip__bullet"
//                     style={{ background: topic.color }}
//                   />
//                   <span>{topic.title}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       ))}

//       {activeTopic && (
//         <div className="active-topic">
//           <span>
//             Sujet actif : <strong>{activeTopic.title}</strong>
//           </span>
//           <button onClick={() => onSelect(null)} title="Retirer">
//             <X size={14} />
//           </button>
//         </div>
//       )}
//     </aside>
//   );
// };
import {
  MessageSquarePlus,
  MoreHorizontal,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState, type FC } from "react";
import type { Thread, Topic } from "../types";

interface Props {
  threads: Thread[];
  activeThreadId: string | null;
  topics: Topic[];
  activeTopic: Topic | null;
  onCreateThread: () => void;
  onSwitchThread: (id: string) => void;
  onDeleteThread: (id: string) => void;
  onSelectTopic: (t: Topic | null) => void;
}

interface GroupedThreads {
  label: string;
  items: Thread[];
}

function groupByDate(threads: Thread[]): GroupedThreads[] {
  const now = Date.now();
  const day = 86_400_000;

  const today: Thread[] = [];
  const yesterday: Thread[] = [];
  const thisWeek: Thread[] = [];
  const older: Thread[] = [];

  const sorted = [...threads].sort((a, b) => b.updatedAt - a.updatedAt);

  for (const t of sorted) {
    const age = now - t.updatedAt;
    if (age < day) today.push(t);
    else if (age < day * 2) yesterday.push(t);
    else if (age < day * 7) thisWeek.push(t);
    else older.push(t);
  }

  const groups: GroupedThreads[] = [];
  if (today.length) groups.push({ label: "Aujourd'hui", items: today });
  if (yesterday.length) groups.push({ label: "Hier", items: yesterday });
  if (thisWeek.length) groups.push({ label: "Cette semaine", items: thisWeek });
  if (older.length) groups.push({ label: "Plus ancien", items: older });
  return groups;
}

export const ChatSidebar: FC<Props> = ({
  threads,
  activeThreadId,
  topics,
  activeTopic,
  onCreateThread,
  onSwitchThread,
  onDeleteThread,
  onSelectTopic,
}) => {
  const grouped = useMemo(() => groupByDate(threads), [threads]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const topicsByCategory = useMemo(() => {
    return topics.reduce<Record<string, Topic[]>>((acc, t) => {
      (acc[t.category] ??= []).push(t);
      return acc;
    }, {});
  }, [topics]);

  return (
    <aside className="chat-sidebar">
      {/* ——— Nouveau chat ——— */}
      <button className="new-chat-btn" onClick={onCreateThread}>
        <MessageSquarePlus size={16} />
        <span>Nouveau chat</span>
      </button>

      {/* ——— Historique ——— */}
      <div className="threads-scroll">
        {grouped.length === 0 && (
          <p className="threads-empty">Aucune conversation pour l'instant.</p>
        )}

        {grouped.map((group) => (
          <div key={group.label} className="thread-group">
            <h4>{group.label}</h4>
            {group.items.map((t) => {
              const isActive = t.id === activeThreadId;
              const isHovered = t.id === hoveredId;

              return (
                <div
                  key={t.id}
                  className={`thread-row ${isActive ? "thread-row--active" : ""}`}
                  onMouseEnter={() => setHoveredId(t.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onSwitchThread(t.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onSwitchThread(t.id);
                  }}
                >
                  <span className="thread-row__title">{t.title}</span>

                  {(isHovered || isActive) && (
                    <button
                      className="thread-row__delete"
                      title="Supprimer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteThread(t.id);
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* ——— Sujets (compact) ——— */}
      <div className="topics-compact">
        <div className="topics-compact__header">
          <Sparkles size={12} />
          <span>Sujets</span>
        </div>

        <div className="topics-compact__chips">
          {Object.entries(topicsByCategory).map(([category, list]) => (
            <div key={category} className="topics-compact__group">
              {list.map((topic) => {
                const isActive = activeTopic?.id === topic.id;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    className={`topic-chip ${isActive ? "topic-chip--active" : ""}`}
                    onClick={() => onSelectTopic(isActive ? null : topic)}
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
          ))}
        </div>

        {activeTopic && (
          <div className="active-topic">
            <span>
              Actif : <strong>{activeTopic.title}</strong>
            </span>
            <button onClick={() => onSelectTopic(null)} title="Retirer">
              <X size={12} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
