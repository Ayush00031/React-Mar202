// pages/ChatPage.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ContactList from "../components/ContactList";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";

const ChatPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return (
    <div className="h-screen flex flex-col">
      <Navbar onLogout={logout} />
      <div className="flex flex-grow">
        <ContactList onSelectUser={setSelectedUser} />
        {selectedUser ? (
          <div className="flex flex-col flex-grow">
            <ChatWindow selectedUser={selectedUser} />
            <MessageInput selectedUser={selectedUser} />
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center text-gray-500">
            Select a contact to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
