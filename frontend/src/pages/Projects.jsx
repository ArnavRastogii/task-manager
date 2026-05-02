import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    API.get("/projects")
      .then((res) => setProjects(res.data))
      .catch(() => setError("Failed to load projects"));
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">

      <Sidebar user={user} />

      <div className="ml-60">
        <Navbar />

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            📁 Projects
          </h1>

          {error && <p className="text-red-500">{error}</p>}

          {projects.length === 0 ? (
            <p className="text-gray-500">No projects found</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {projects.map((p) => (
                <div
                  key={p._id}
                  className="bg-white dark:bg-gray-800 p-4 rounded shadow"
                >
                  <h2 className="font-bold text-lg text-gray-800 dark:text-white">
                    {p.name}
                  </h2>

                  <p className="text-sm text-gray-500 mt-2">
                    Created: {new Date(p.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}