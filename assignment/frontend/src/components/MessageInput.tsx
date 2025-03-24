import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import AuthContext

interface MessageInputProps {
  selectedUser: string;
  onMessageSent?: () => void; // Optional callback after message sent
}

const MessageInput: React.FC<MessageInputProps> = ({
  selectedUser,
  onMessageSent,
}) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth(); // Get token from AuthContext

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include auth token
        },
        body: JSON.stringify({ receiver: selectedUser, text: message }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      setMessage(""); // Clear input on success
      setError(null); // Clear previous errors
      onMessageSent?.(); // Call callback if provided
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
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
        onKeyDown={handleKeyDown} // Handle Enter key
        aria-label="Message input"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Send
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default MessageInput;
