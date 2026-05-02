import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar({ user }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded transition ${
      isActive
        ? "bg-blue-500 text-white"
        : "hover:bg-gray-800 text-gray-300"
    }`;

  return (
    <div className="w-60 h-screen fixed top-0 left-0 bg-gray-900 text-white p-5 flex flex-col justify-between">

      {/* Top */}
      <div>
        <h2 className="text-2xl font-bold mb-8">🚀 Task Manager</h2>

        <nav className="space-y-2">
          <NavLink to="/dashboard" className={linkClass}>
            📊 Dashboard
          </NavLink>

          <NavLink to="/create" className={linkClass}>
            ➕ Create Task
          </NavLink>

          {/* ✅ NEW: Projects */}
          <NavLink to="/projects" className={linkClass}>
            📁 Projects
          </NavLink>

          {/* ✅ Create Project */}
          <NavLink to="/create-project" className={linkClass}>
            📁 Create Project
          </NavLink>

          {user?.role === "admin" && (
            <NavLink to="/admin" className={linkClass}>
              👑 Admin Panel
            </NavLink>
          )}
        </nav>
      </div>

      {/* Bottom */}
      <div className="space-y-4">
        <div className="text-sm text-gray-400">
          Logged in as <br />
          <span className="text-white font-semibold">
            {user?.name}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 py-2 rounded transition"
        >
          Logout
        </button>
      </div>

    </div>
  );
}