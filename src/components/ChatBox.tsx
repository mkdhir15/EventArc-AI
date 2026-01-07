import { useState } from "react";

interface Message {
  id: number;
  sender: string;
  text: string;
}

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "Admin", text: input },
    ]);
    setInput("");
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h3 className="font-semibold mb-3">Event Chat</h3>

      <div className="h-48 overflow-y-auto space-y-2 mb-3">
        {messages.map((msg) => (
          <div key={msg.id} className="text-sm">
            <span className="text-indigo-400">{msg.sender}:</span>{" "}
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type update..."
          className="flex-1 bg-white/10 p-2 rounded-lg outline-none"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
