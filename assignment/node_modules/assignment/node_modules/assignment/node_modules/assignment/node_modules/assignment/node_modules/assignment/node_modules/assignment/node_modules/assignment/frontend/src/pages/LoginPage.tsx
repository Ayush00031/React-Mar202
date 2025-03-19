// pages/LoginPage.tsx

import LoginForm from "../components/LoginForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        login(data.user);
        navigate("/chat");
      } else {
        alert(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
