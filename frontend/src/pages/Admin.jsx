import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import EditTaskModal from "../components/EditTaskModal";
import { AuthContext } from "../context/AuthContext";

export default function Admin() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);

  // 🔹 Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log("Error fetching tasks", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks(); // refresh
    } catch (err) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">

      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Main Content */}
      <div className="ml-60 p-6">

        {/* Header */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          👑 Admin Panel
        </h1>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading tasks...</p>
        )}

        {/* Empty */}
        {!loading && tasks.length === 0 && (
          <p className="text-center text-gray-500">No tasks found</p>
        )}

        {/* Task List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg transition"
            >

              <h2 className="font-bold text-lg mb-2">
                {task.title}
              </h2>

              <p className="text-sm text-gray-500">
                Status:{" "}
                <span className="font-semibold">
                  {task.status}
                </span>
              </p>

              <p className="text-sm text-gray-500">
                Due: {new Date(task.dueDate).toDateString()}
              </p>

              {task.user && (
                <p className="text-xs text-gray-400 mt-1">
                  Owner: {task.user.name}
                </p>
              )}

              {/* Buttons */}
              <div className="flex gap-2 mt-4">

                <button
                  onClick={() => setSelectedTask(task)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded w-full"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded w-full"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>

        {/* Edit Modal */}
        {selectedTask && (
          <EditTaskModal
            task={selectedTask}
            close={() => setSelectedTask(null)}
            refresh={fetchTasks}
          />
        )}

      </div>
    </div>
  );
}