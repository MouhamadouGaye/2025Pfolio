import type { FC } from "react";

import "../chat/components/Chat.css";
import { useChat } from "../chat/hooks/useChat";
import { ChatHeader } from "../chat/components/ChatHeader";
import { ChatSidebar } from "../chat/components/ChatSideBar";
import { MessageList } from "../chat/components/MessageList";
import { MessageInput } from "../chat/components/MessageInput";

const ChatPage: FC = () => {
  const {
    // Threads
    threads,
    activeThreadId,
    createNewThread,
    switchThread,
    deleteThread,

    // Chat courant
    messages,
    topics,
    activeTopic,
    isProcessing,
    error,
    freshId,

    // Actions
    setActiveTopic,
    sendMessage,
    stopGeneration, // ← bien récupéré depuis le hook
    clearAll,
    exportCSV,
  } = useChat();

  return (
    <div className="chat-app">
      <ChatHeader onExport={exportCSV} onClear={clearAll} />

      <ChatSidebar
        threads={threads}
        activeThreadId={activeThreadId}
        topics={topics}
        activeTopic={activeTopic}
        onCreateThread={createNewThread}
        onSwitchThread={switchThread}
        onDeleteThread={deleteThread}
        onSelectTopic={setActiveTopic}
      />

      <main className="chat-main">
        <MessageList
          messages={messages}
          isProcessing={isProcessing}
          freshId={freshId}
        />

        {error && <div className="chat-error">{error}</div>}

        <MessageInput
          onSend={sendMessage}
          onStop={stopGeneration} // ← branché
          disabled={isProcessing}
        />
      </main>
    </div>
  );
};

export default ChatPage;
