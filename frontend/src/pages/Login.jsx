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
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">

      <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl w-full max-w-sm">

        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Login
        </h2>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-3">
            {error}
          </p>
        )}

        {/* Email */}
        <input
          className="border dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* Password */}
        <input
          className="border dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* Button */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white w-full p-2 rounded transition disabled:opacity-50"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup */}
        <p className="text-sm mt-4 text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </p>

      </div>
    </div>
  );
}