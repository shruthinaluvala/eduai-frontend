import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

export default function FacultyDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [selected, setSelected] = useState([]);
  const [filter, setFilter] = useState({ year: "ALL", branch: "ALL" });
  const [remark, setRemark] = useState({});
  const [score, setScore] = useState({});
  const [activeStudent, setActiveStudent] = useState(null);
  useEffect(() => {
  fetch("http://localhost:8080/api/assignments/all")
    .then(res => res.json())
    .then(data => setAssignments(data || []))
    .catch(() => setAssignments([]));
  }, []);

  
  /* ---------- FILTER LOGIC ---------- */
  const filteredAssignments = assignments.filter(a =>
    (filter.year === "ALL" || a.year === Number(filter.year)) &&
    (filter.branch === "ALL" || a.branch === filter.branch)
  );

  /* ---------- SELECTION ---------- */
  const toggleSelect = (index) => {
    setSelected(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  /* ---------- ACTIONS ---------- */
  const markReviewed = (index) => {
    fetch(`http://localhost:8080/api/assignments/review/${index}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(remark[index] || "Reviewed"),
    }).then(() => window.location.reload());
  };

  const gradeAssignment = (index) => {
    fetch(`http://localhost:8080/api/assignments/grade/${index}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Number(score[index] || 8)),
    }).then(() => window.location.reload());
  };

  const batchReview = () => {
    selected.forEach(i => markReviewed(i));
  };

  const batchGrade = () => {
    selected.forEach(i => gradeAssignment(i));
  };

  return (
    <DashboardLayout role="Faculty">
      <h2 className="text-2xl font-bold mb-4">Faculty Control Center</h2>

      {/* 🔹 FILTER PANEL */}
      <div className="flex gap-4 mb-6">
        <select
          onChange={e => setFilter({ ...filter, year: e.target.value })}
          className="border p-2"
        >
          <option value="ALL">All Years</option>
          {[1,2,3,4].map(y => (
            <option key={y} value={y}>Year {y}</option>
          ))}
        </select>

        <select
          onChange={e => setFilter({ ...filter, branch: e.target.value })}
          className="border p-2"
        >
          <option value="ALL">All Branches</option>
          {["CSE","IT","ECE","EEE","MECH"].map(b => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* 🔹 STATS */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Stat title="Total" value={assignments.length} />
        <Stat title="Submitted" value={assignments.filter(a => a.status==="SUBMITTED").length} />
        <Stat title="Reviewed" value={assignments.filter(a => a.status==="REVIEWED").length} />
        <Stat title="Graded" value={assignments.filter(a => a.status==="GRADED").length} />
      </div>

      {/* 🔹 ASSIGNMENT TABLE */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th>✔</th>
              <th>Student</th>
              <th>Roll</th>
              <th>Subject</th>
              <th>Status</th>
              <th>SLA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments.map((a, index) => {
              const delayed =
                (Date.now() - new Date(a.submittedAt)) / (1000*60*60*24) > 2;

              return (
                <tr key={index} className="border-t text-center">
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(index)}
                      onChange={() => toggleSelect(index)}
                    />
                  </td>

                  <td
                    className="text-blue-600 cursor-pointer"
                    onClick={() => setActiveStudent(a)}
                  >
                    {a.studentName}
                  </td>

                  <td>{a.rollNo}</td>
                  <td>{a.subject}</td>

                  <td>
                    <span className={`px-2 py-1 rounded text-white ${
                      a.status === "GRADED" ? "bg-green-600" :
                      a.status === "REVIEWED" ? "bg-yellow-500" :
                      "bg-blue-600"
                    }`}>
                      {a.status}
                    </span>
                  </td>

                  <td>
                    {delayed ? "⏰ Delayed" : "On Time"}
                  </td>

                  <td className="space-y-1">
                    <input
                      placeholder="Remark"
                      className="border p-1 w-full"
                      onChange={e => setRemark({ ...remark, [index]: e.target.value })}
                    />
                    <input
                      type="number"
                      min="0"
                      max="10"
                      placeholder="Score"
                      className="border p-1 w-full"
                      onChange={e => setScore({ ...score, [index]: e.target.value })}
                    />
                    <button
                      onClick={() => markReviewed(index)}
                      className="bg-yellow-500 text-white px-2 py-1 text-xs mr-1"
                    >
                      Review
                    </button>
                    <button
                      onClick={() => gradeAssignment(index)}
                      className="bg-green-600 text-white px-2 py-1 text-xs"
                    >
                      Grade
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 🔹 BATCH ACTIONS */}
      {selected.length > 0 && (
        <div className="mt-6 bg-blue-50 p-4 rounded">
          <h4 className="font-semibold mb-2">
            Batch Actions ({selected.length})
          </h4>
          <button
            onClick={batchReview}
            className="bg-yellow-500 text-white px-4 py-2 mr-3"
          >
            Mark Reviewed
          </button>
          <button
            onClick={batchGrade}
            className="bg-green-600 text-white px-4 py-2"
          >
            Grade All
          </button>
        </div>
      )}

      {/* 🔹 STUDENT DRILL-DOWN MODAL */}
      {activeStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="font-bold mb-2">Student Details</h3>
            <p>Name: {activeStudent.studentName}</p>
            <p>Roll: {activeStudent.rollNo}</p>
            <p>Branch: {activeStudent.branch}</p>
            <p>Year: {activeStudent.year}</p>
            <button
              onClick={() => setActiveStudent(null)}
              className="mt-4 bg-red-600 text-white px-4 py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}
