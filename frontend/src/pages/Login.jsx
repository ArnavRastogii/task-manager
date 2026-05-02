import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      if (!form.email.trim() || !form.password) {
        setError("All fields are required");
        return;
      }

      const res = await API.post("/auth/login", form);

      login(res.data.token);
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 dark:from-gray-900 dark:to-black">

      {/* Glass Card */}
      <div className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/40 border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-sm">

        {/* Logo / Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            🚀 Team Task Manager
          </h1>
          <p className="text-sm text-gray-200 mt-1">
            Manage your tasks efficiently
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="bg-red-500/20 text-red-200 text-sm p-2 rounded mb-3 text-center">
            {error}
          </p>
        )}

        {/* Email Input */}
        <div className="mb-3">
          <input
            className="w-full p-2 rounded bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="📧 Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <input
            className="w-full p-2 rounded bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="🔒 Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        {/* Login Button */}
        <button
          className="w-full py-2 rounded bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-[1.02] transition text-white font-semibold disabled:opacity-50"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup */}
        <p className="text-sm mt-5 text-center text-gray-200">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-300 hover:underline">
            Signup
          </Link>
        </p>

      </div>
    </div>
  );
}