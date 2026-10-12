// src/pages/ChatPage.tsx
import type { FC } from "react";

import "../chat/components/Chat.css";
import { useChat } from "../chat/hooks/useChat";
import { ChatHeader } from "../chat/components/ChatHeader";
import { ChatSidebar } from "../chat/components/ChatSideBar";
import { MessageInput } from "../chat/components/MessageInput";
import { MessageList } from "../chat/components/MessageList";

const ChatPage: FC = () => {
  const {
    messages,
    topics,
    activeTopic,
    isProcessing,
    error,
    freshId, // ← récupéré
    setActiveTopic,
    sendMessage,
    clearAll,
    exportCSV,
  } = useChat();

  return (
    <div className="chat-app">
      <ChatHeader onExport={exportCSV} onClear={clearAll} />

      <ChatSidebar
        topics={topics}
        activeTopic={activeTopic}
        onSelect={setActiveTopic}
      />

      <main className="chat-main">
        <MessageList
          messages={messages}
          isProcessing={isProcessing}
          freshId={freshId}
        />

        {error && <div className="chat-error">{error}</div>}

        <MessageInput onSend={sendMessage} disabled={isProcessing} />
      </main>
    </div>
  );
};

export default ChatPage;
