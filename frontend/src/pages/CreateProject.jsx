import { useState, useContext } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // ✅ add
import { AuthContext } from "../context/AuthContext"; // ✅ add

export default function CreateProject() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // ✅ get user

  const handleCreate = async () => {
    try {
      setError("");

      if (!name.trim()) {
        return setError("Project name is required");
      }

      setLoading(true);

      await API.post("/projects", { name });

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">

      {/* ✅ Sidebar added */}
      <Sidebar user={user} />

      {/* Main content shifted right */}
      <div className="ml-60 p-6 flex justify-center items-center min-h-screen">

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-md">

          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            📁 Create Project
          </h1>

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          <input
            className="border dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white p-2 w-full mb-4 rounded"
            placeholder="Enter project name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex gap-3">
            <button
              onClick={handleCreate}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 w-full rounded"
            >
              {loading ? "Creating..." : "Create"}
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-gray-300 px-4 py-2 w-full rounded"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}