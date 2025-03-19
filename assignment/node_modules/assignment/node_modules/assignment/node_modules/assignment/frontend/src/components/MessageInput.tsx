// components/MessageInput.tsx
import React, { useState } from "react";

interface MessageInputProps {
  selectedUser: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ selectedUser }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiver: selectedUser, text: message }),
      });

      setMessage(""); // Clear input after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="p-4 bg-white border-t flex items-center gap-2">
      <input
        type="text"
        className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
