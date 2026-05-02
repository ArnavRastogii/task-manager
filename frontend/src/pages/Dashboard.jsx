import { useEffect, useState, useContext, useMemo } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import TaskChart from "../components/TaskChart";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const [search, setSearch] = useState(""); // ✅ added
  const [projectFilter, setProjectFilter] = useState(""); // ✅ added

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Stats
  const { total, completed, pending } = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "done").length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [tasks]);

  // ✅ UPDATED FILTER LOGIC (combined)
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch = t.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesProject = projectFilter
        ? t.project?._id === projectFilter
        : true;

      const matchesStatus =
        filter === "all"
          ? true
          : filter === "done"
          ? t.status === "done"
          : t.status !== "done";

      return matchesSearch && matchesProject && matchesStatus;
    });
  }, [tasks, filter, search, projectFilter]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">

      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Main Content */}
      <div className="ml-60 min-h-screen flex flex-col">

        <Navbar />

        {/* Scrollable area */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Dashboard
            </h1>

            <button
              onClick={() => navigate("/create")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              + Create Task
            </button>
          </div>

          {/* ✅ Search Input */}
          <input
            placeholder="Search..."
            className="border dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white p-2 mb-3 w-full rounded"
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Chart */}
          <div className="mb-6">
            <TaskChart tasks={tasks} />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <p className="text-gray-500">Total Tasks</p>
              <h2 className="text-xl font-bold">{total}</h2>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <p className="text-gray-500">Pending Tasks</p>
              <h2 className="text-xl font-bold text-yellow-500">{pending}</h2>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <p className="text-gray-500">Completed Tasks</p>
              <h2 className="text-xl font-bold text-green-500">{completed}</h2>
            </div>

          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-6">
            {["all", "pending", "done"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1 rounded border ${
                  filter === f
                    ? "bg-blue-500 text-white"
                    : "bg-white dark:bg-gray-800 dark:text-white"
                }`}
              >
                {f === "all"
                  ? "All"
                  : f === "pending"
                  ? "Pending"
                  : "Completed"}
              </button>
            ))}
          </div>

          {/* States */}
          {loading && <p className="text-center">Loading tasks...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {!loading && filteredTasks.length === 0 && (
            <p className="text-center text-gray-500">No tasks found</p>
          )}

          {/* Tasks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                refresh={fetchTasks}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}