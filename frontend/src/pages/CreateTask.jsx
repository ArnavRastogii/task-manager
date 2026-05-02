import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateTask() {
  const [task, setTask] = useState({
    title: "",
    dueDate: "",
    assignedTo: "",
    project: ""
  });

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ✅ FETCH USERS + PROJECTS
  useEffect(() => {
    API.get("/users")
      .then((res) => setUsers(res.data))
      .catch(() => setError("Failed to load users"));

    API.get("/projects")
      .then((res) => setProjects(res.data))
      .catch(() => setError("Failed to load projects"));
  }, []);

  const createTask = async () => {
    try {
      setLoading(true);
      setError("");

      if (!task.title || !task.dueDate) {
        return setError("All fields are required");
      }

      await API.post("/tasks", task);

      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">

      {/* 🔙 TOP BACK BUTTON */}
      <div className="p-4">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 hover:underline"
        >
          ← Back
        </button>
      </div>

      {/* CENTER FORM */}
      <div className="flex justify-center items-center flex-1">
        <div className="bg-white dark:bg-gray-800 shadow p-6 rounded w-96">

          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            Create Task
          </h2>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm mb-2">{error}</p>
          )}

          {/* TITLE */}
          <input
            className="border p-2 w-full mb-3 rounded"
            placeholder="Task Title"
            value={task.title}
            onChange={(e) =>
              setTask({ ...task, title: e.target.value })
            }
          />

          {/* DATE */}
          <input
            className="border p-2 w-full mb-3 rounded"
            type="date"
            value={task.dueDate}
            onChange={(e) =>
              setTask({ ...task, dueDate: e.target.value })
            }
          />

          {/* ✅ ASSIGN USER */}
          <select
            className="border p-2 w-full mb-3 rounded"
            value={task.assignedTo}
            onChange={(e) =>
              setTask({ ...task, assignedTo: e.target.value })
            }
          >
            <option value="">Select User</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>

          {/* ✅ SELECT PROJECT */}
          <select
            className="border p-2 w-full mb-3 rounded"
            value={task.project}
            onChange={(e) =>
              setTask({ ...task, project: e.target.value })
            }
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* BUTTONS */}
          <div className="flex gap-2">

            <button
              className="bg-green-500 text-white px-4 py-2 w-full rounded"
              onClick={createTask}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>

            <button
              className="bg-gray-300 px-4 py-2 w-full rounded"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}