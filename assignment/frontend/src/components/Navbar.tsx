// components/Navbar.tsx
import React from "react";

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-semibold">Chat App</h1>
      <button
        onClick={onLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
