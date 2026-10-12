// src/pages/ChatPage.tsx
import type { FC } from "react";
import "../chat/components/Chat.css";
import { useChat } from "../chat/hooks/useChat";
import { ChatHeader } from "../chat/components/ChatHeader";
import { ChatSidebar } from "../chat/components/ChatSideBar";
import { MessageList } from "../chat/components/MessageList";
import { MessageInput } from "../chat/components/MessageInput";

const ChatPage: FC = () => {
  const {
    messages,
    topics,
    activeTopic,
    isProcessing,
    error,
    freshId, // ← AJOUT
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
          freshId={freshId} // ← AJOUT
        />

        {error && <div className="chat-error">{error}</div>}

        <MessageInput onSend={sendMessage} disabled={isProcessing} />
      </main>
    </div>
  );
};

export default ChatPage;
