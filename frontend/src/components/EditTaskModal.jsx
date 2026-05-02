import { useState } from "react";
import API from "../api/axios";

export default function EditTaskModal({ task, close, refresh }) {

  const [form, setForm] = useState({
    title: task.title,
    dueDate: task.dueDate?.slice(0, 10),
    status: task.status
  });

  const handleUpdate = async () => {
    await API.put(`/tasks/edit/${task._id}`, form);
    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

      <div className="bg-white dark:bg-gray-800 p-6 rounded w-80">

        <h2 className="font-bold mb-4 text-gray-800 dark:text-white">
          Edit Task
        </h2>

        <input
          className="border p-2 w-full mb-2"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          type="date"
          className="border p-2 w-full mb-2"
          value={form.dueDate}
          onChange={(e) =>
            setForm({ ...form, dueDate: e.target.value })
          }
        />

        <select
          className="border p-2 w-full mb-3"
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-3 py-1 w-full"
          >
            Save
          </button>

          <button
            onClick={close}
            className="bg-gray-300 px-3 py-1 w-full"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}