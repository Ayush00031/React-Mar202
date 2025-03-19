import React, { useState } from "react";

interface SignupFormProps {
  onSubmit: (credentials: {
    username: string;
    email: string;
    password: string;
  }) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      onSubmit(formData);
    } catch {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Sign Up</h2>
      {error && (
        <p className="text-red-500 text-sm text-center mb-2">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className={`w-full bg-green-500 text-white p-2 rounded ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-green-600 transition"
          }`}
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
