import { useEffect, useState } from "react";
import API from "../api/axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const fetch = async () => {
    const res = await API.get("/users");
    setUsers(res.data);
  };

  const updateRole = async (id, role) => {
    await API.put(`/users/${id}/role`, { role });
    fetch();
  };

  useEffect(() => { fetch(); }, []);

  return (
    <div className="ml-60 p-6">
      <h1 className="text-xl font-bold mb-4">Users</h1>

      {users.map((u) => (
        <div key={u._id} className="border p-3 mb-2 flex justify-between">
          <span>{u.name}</span>

          <select
            value={u.role}
            onChange={(e) => updateRole(u._id, e.target.value)}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      ))}
    </div>
  );
}