import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function TaskChart({ tasks }) {

  const data = [
    {
      name: "Completed",
      value: tasks.filter(t => t.status === "done").length
    },
    {
      name: "In Progress",
      value: tasks.filter(t => t.status === "in-progress").length
    },
    {
      name: "Todo",
      value: tasks.filter(t => t.status === "todo").length
    }
  ];

  const COLORS = ["#22c55e", "#eab308", "#9ca3af"];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="font-bold mb-3 text-gray-800 dark:text-white">
        Task Analytics
      </h2>

      <div className="h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={80}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}