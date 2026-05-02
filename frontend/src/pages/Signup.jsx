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
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">

      <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl w-full max-w-sm">

        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Signup
        </h2>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-3">
            {error}
          </p>
        )}

        {/* Name */}
        <input
          className="border dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* Email */}
        <input
          className="border dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* Password */}
        <input
          className="border dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* Button */}
        <button
          className="bg-green-500 hover:bg-green-600 text-white w-full p-2 rounded transition disabled:opacity-50"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        {/* Login link */}
        <p className="text-sm mt-4 text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}