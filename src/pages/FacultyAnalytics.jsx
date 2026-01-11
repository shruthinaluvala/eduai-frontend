import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

export default function FacultyAnalytics() {
  const [stats, setStats] = useState({
    submitted: 0,
    reviewed: 0,
    graded: 0
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/assignments/all")
      .then(res => res.json())
      .then(data => {
        setStats({
          submitted: data.filter(a => a.status === "SUBMITTED").length,
          reviewed: data.filter(a => a.status === "REVIEWED").length,
          graded: data.filter(a => a.status === "GRADED").length
        });
      });
  }, []);

  const total = stats.submitted + stats.reviewed + stats.graded || 1;

  return (
    <DashboardLayout role="Faculty">
      <h2 className="text-2xl font-bold mb-6">Faculty Analytics</h2>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <Stat title="Submitted" value={stats.submitted} color="bg-yellow-500" />
        <Stat title="Reviewed" value={stats.reviewed} color="bg-blue-500" />
        <Stat title="Graded" value={stats.graded} color="bg-green-500" />
      </div>

      {/* SIMPLE BAR CHART */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Assignment Status Distribution</h3>

        <Bar label="Submitted" value={stats.submitted} total={total} color="bg-yellow-500" />
        <Bar label="Reviewed" value={stats.reviewed} total={total} color="bg-blue-500" />
        <Bar label="Graded" value={stats.graded} total={total} color="bg-green-500" />
      </div>
    </DashboardLayout>
  );
}

function Stat({ title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>
      <h3 className={`text-3xl font-bold mt-2 ${color} text-white inline-block px-4 py-2 rounded`}>
        {value}
      </h3>
    </div>
  );
}

function Bar({ label, value, total, color }) {
  const width = Math.round((value / total) * 100);

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="w-full bg-gray-200 h-3 rounded">
        <div className={`${color} h-3 rounded`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}
