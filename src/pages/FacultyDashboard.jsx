import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getAllAssignments } from "../services/api";

export default function FacultyDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [year, setYear] = useState("All");
  const [branch, setBranch] = useState("All");

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      const data = await getAllAssignments();
      setAssignments(data || []);
    } catch (err) {
      console.error("Failed to load assignments", err);
    }
  };

  // 🔢 STATS
  const total = assignments.length;
  const submitted = assignments.filter(a => a.status === "SUBMITTED").length;
  const reviewed = assignments.filter(a => a.status === "REVIEWED").length;
  const graded = assignments.filter(a => a.status === "GRADED").length;

  return (
    <DashboardLayout role="Faculty">
      <h2 className="text-2xl font-bold mb-4">Faculty Control Center</h2>

      {/* FILTERS */}
      <div className="flex gap-4 mb-6">
        <select
          className="input w-40"
          value={year}
          onChange={e => setYear(e.target.value)}
        >
          <option value="All">All Years</option>
          <option value="1">Year 1</option>
          <option value="2">Year 2</option>
          <option value="3">Year 3</option>
          <option value="4">Year 4</option>
        </select>

        <select
          className="input w-40"
          value={branch}
          onChange={e => setBranch(e.target.value)}
        >
          <option value="All">All Branches</option>
          <option>CSE</option>
          <option>IT</option>
          <option>ECE</option>
          <option>EEE</option>
          <option>MECH</option>
        </select>
      </div>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <Stat title="Total" value={total} />
        <Stat title="Submitted" value={submitted} />
        <Stat title="Reviewed" value={reviewed} />
        <Stat title="Graded" value={graded} />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr className="text-gray-600">
              <th className="p-2">Student</th>
              <th className="p-2">Subject</th>
              <th className="p-2">Branch</th>
              <th className="p-2">Year</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No assignments found
                </td>
              </tr>
            ) : (
              assignments.map((a, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-2">{a.studentUsername}</td>
                  <td className="p-2">{a.title}</td>
                  <td className="p-2">{a.branch}</td>
                  <td className="p-2">Year {a.year}</td>
                  <td className="p-2 font-medium">{a.status}</td>
                  <td className="p-2">
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

/* ---------- STAT CARD ---------- */
function Stat({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}
