import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

export default function FacultySubmissions() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/assignments/all")
      .then(res => res.json())
      .then(setAssignments);
  }, []);

  const review = (index) => {
    fetch(`http://localhost:8080/api/assignments/review/${index}`, {
      method: "POST",
      body: "Reviewed by faculty",
      headers: { "Content-Type": "text/plain" }
    }).then(() => window.location.reload());
  };

  const grade = (index) => {
    const score = prompt("Enter score (0-10)");
    fetch(`http://localhost:8080/api/assignments/grade/${index}`, {
      method: "POST",
      body: score,
      headers: { "Content-Type": "application/json" }
    }).then(() => window.location.reload());
  };

  return (
    <DashboardLayout role="Faculty">
      <h2 className="text-2xl font-bold mb-4">Assignment Submissions</h2>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Student</th>
            <th className="p-2">Roll</th>
            <th className="p-2">Subject</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a, i) => (
            <tr key={i} className="border-t text-center">
              <td>{a.studentName}</td>
              <td>{a.rollNo}</td>
              <td>{a.subject}</td>
              <td>
                <span className="px-2 py-1 rounded bg-blue-100">
                  {a.status}
                </span>
              </td>
              <td className="space-x-2">
                <button
                  onClick={() => review(i)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Review
                </button>
                <button
                  onClick={() => grade(i)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Grade
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}
