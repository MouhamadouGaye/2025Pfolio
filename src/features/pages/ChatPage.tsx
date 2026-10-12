import { useEffect, type FC } from "react";

import "../chat/components/Chat.css";
import { ChatHeader } from "../chat/components/ChatHeader";
import { ChatSidebar } from "../chat/components/ChatSideBar";
import { MessageList } from "../chat/components/MessageList";
import { MessageInput } from "../chat/components/MessageInput";
import { useChat } from "../chat/hooks/useChat";

const ChatPage: FC = () => {
  const {
    messages,
    topics,
    activeTopic,
    isProcessing,
    error,
    setActiveTopic,
    sendMessage,
    clearAll,
    exportCSV,
  } = useChat();

  useEffect(() => {
    console.log("ENV CHECK →", import.meta.env.VITE_OPENROUTER_KEY);
  }, []);

  return (
    <div className="chat-app">
      <ChatHeader onExport={exportCSV} onClear={clearAll} />

      <ChatSidebar
        topics={topics}
        activeTopic={activeTopic}
        onSelect={setActiveTopic}
      />

      <main className="chat-main">
        <MessageList messages={messages} isProcessing={isProcessing} />

        {error && <div className="chat-error">{error}</div>}

        <MessageInput onSend={sendMessage} disabled={isProcessing} />
      </main>
    </div>
  );
};

export default ChatPage;
