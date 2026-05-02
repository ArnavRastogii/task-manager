import API from "../api/axios";
import { useState } from "react";
import EditTaskModal from "./EditTaskModal";

export default function TaskCard({ task, refresh }) {

  const [showEdit, setShowEdit] = useState(false);

  const updateStatus = async (status) => {
    await API.put(`/tasks/${task._id}`, { status });
    refresh();
  };

  const isOverdue =
    new Date(task.dueDate) < new Date() &&
    task.status !== "done";

  const statusColor =
    task.status === "done"
      ? "bg-green-500"
      : task.status === "in-progress"
      ? "bg-yellow-500"
      : "bg-gray-400";

  return (
    <div
      className={`p-4 rounded shadow transition ${
        isOverdue
          ? "bg-red-100"
          : "bg-white dark:bg-gray-800"
      }`}
    >

      <h2 className="font-bold text-lg mb-2">
        {task.title}
      </h2>

      <span
        className={`text-white text-xs px-2 py-1 rounded ${statusColor}`}
      >
        {task.status}
      </span>

      <p className="text-sm text-gray-500 mt-2">
        Due: {new Date(task.dueDate).toDateString()}
      </p>

      {isOverdue && (
        <p className="text-red-500 text-xs mt-1">
          ⚠️ Overdue
        </p>
      )}

      {/* STATUS BUTTONS */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => updateStatus("todo")}
          className="bg-gray-300 px-2 py-1 rounded text-sm"
        >
          Todo
        </button>

        <button
          onClick={() => updateStatus("in-progress")}
          className="bg-yellow-400 px-2 py-1 rounded text-sm"
        >
          Progress
        </button>

        <button
          onClick={() => updateStatus("done")}
          className="bg-green-500 text-white px-2 py-1 rounded text-sm"
        >
          Done
        </button>
      </div>

      {/* EDIT BUTTON */}
      <button
        onClick={() => setShowEdit(true)}
        className="bg-blue-500 text-white px-2 py-1 mt-3 rounded"
      >
        Edit
      </button>

      {/* MODAL */}
      {showEdit && (
        <EditTaskModal
          task={task}
          close={() => setShowEdit(false)}
          refresh={refresh}
        />
      )}
    </div>
  );
}