// pages/SignupPage.tsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm";

const SignupPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (credentials: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        login(data.user); // Log in the user after signup
        navigate("/chat");
      } else {
        alert(data.message || "Signup failed!");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <SignupForm onSubmit={handleSignup} />
    </div>
  );
};

export default SignupPage;
