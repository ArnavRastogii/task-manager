import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      setLoading(true);
      setError("");

      // ✅ Validation
      if (!form.name.trim() || !form.email.trim() || !form.password) {
        setError("All fields are required");
        return;
      }

      if (form.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }

      await API.post("/auth/signup", form);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 dark:from-gray-900 dark:to-black">

      {/* Glass Card */}
      <div className="backdrop-blur-lg bg-white/10 dark:bg-gray-800/40 border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-sm">

        {/* Branding */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            🚀 Team Task Manager
          </h1>
          <p className="text-sm text-gray-200 mt-1">
            Create your account
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="bg-red-500/20 text-red-200 text-sm p-2 rounded mb-3 text-center">
            {error}
          </p>
        )}

        {/* Name */}
        <input
          className="w-full p-2 rounded bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-400 mb-3"
          placeholder="👤 Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* Email */}
        <input
          className="w-full p-2 rounded bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-400 mb-3"
          placeholder="📧 Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* Password */}
        <input
          className="w-full p-2 rounded bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
          type="password"
          placeholder="🔒 Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* Button */}
        <button
          className="w-full py-2 rounded bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] transition text-white font-semibold disabled:opacity-50"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Signup"}
        </button>

        {/* Login Link */}
        <p className="text-sm mt-5 text-center text-gray-200">
          Already have an account?{" "}
          <Link to="/" className="text-green-300 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}