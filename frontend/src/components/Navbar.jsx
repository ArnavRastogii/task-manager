import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-4 shadow">

      {/* Left */}
      <h1 className="text-lg font-semibold">
        Dashboard
      </h1>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Theme Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded transition hover:scale-105"
        >
          {dark ? "🌙 Dark" : "☀️ Light"}
        </button>

      </div>
    </div>
  );
}