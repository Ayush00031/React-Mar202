// components/ChatWindow.tsx
import React, { useEffect, useState } from "react";

interface ChatWindowProps {
  selectedUser: string;
}

interface Message {
  sender: string;
  text: string;
  createdAt: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedUser }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/messages/${selectedUser}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedUser]);

  return (
    <div className="flex flex-col flex-grow p-4 bg-gray-50 overflow-y-auto">
      {messages.length > 0 ? (
        messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded-md shadow ${
              msg.sender === selectedUser
                ? "bg-gray-200"
                : "bg-blue-500 text-white self-end"
            }`}
          >
            {msg.text}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No messages yet</p>
      )}
    </div>
  );
};

export default ChatWindow;
