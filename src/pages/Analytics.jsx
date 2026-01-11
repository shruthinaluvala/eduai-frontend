import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../auth/AuthContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b"];

export default function Analytics() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
  fetch("http://localhost:8080/api/assignments/all")
    .then(res => res.json())
    .then(data => setAssignments(data || []))
    .catch(() => setAssignments([]));
  }, []);

 

  // 📊 Line chart data (score trend)
  const scoreData = assignments
    .filter((a) => a.score !== null)
    .map((a, index) => ({
      name: `A${index + 1}`,
      score: a.score,
    }));

  // 🧮 Average score
  const avgScore =
    scoreData.reduce((sum, a) => sum + a.score, 0) /
    (scoreData.length || 1);

  // 🥧 Status distribution
  const statusCount = {
    SUBMITTED: 0,
    REVIEWED: 0,
    GRADED: 0,
  };

  assignments.forEach((a) => {
    statusCount[a.status]++;
  });

  const statusData = Object.keys(statusCount).map((key) => ({
    name: key,
    value: statusCount[key],
  }));

  return (
    <DashboardLayout role="Student">
      <h3 className="text-xl font-bold mb-6">Performance Analytics</h3>

      {/* Top Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 shadow rounded">
          <p className="text-gray-500">Assignments Submitted</p>
          <h2 className="text-2xl font-bold">{assignments.length}</h2>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <p className="text-gray-500">Average Score</p>
          <h2 className="text-2xl font-bold">
            {avgScore.toFixed(1)}/10
          </h2>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <p className="text-gray-500">Latest Status</p>
          <h2 className="text-xl font-semibold">
            {assignments[0]?.status || "-"}
          </h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Line Chart */}
        <div className="bg-white p-4 shadow rounded">
          <h4 className="font-semibold mb-4">Score Progress</h4>
          <LineChart width={400} height={250} data={scoreData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#2563eb" />
          </LineChart>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 shadow rounded">
          <h4 className="font-semibold mb-4">Assignment Status</h4>
          <PieChart width={300} height={250}>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {statusData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* Improvement Tips */}
      <div className="bg-white p-4 shadow rounded">
        <h4 className="font-semibold mb-3">Improvement Tips</h4>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Include more real-world examples</li>
          <li>Improve conclusion clarity</li>
          <li>Practice problem-solving assignments</li>
        </ul>
      </div>
    </DashboardLayout>
  );
}
