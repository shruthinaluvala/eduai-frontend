import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import DashboardLayout from "../components/DashboardLayout";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/assignments/count/${user.username}`)
      .then(res => res.json())
      .then(setCount);

    fetch(`http://localhost:8080/api/assignments/student/${user.username}`)
      .then(res => res.json())
      .then(setHistory);
  }, [user.username]);

  const lastSubmission =
    history.length > 0
      ? new Date(history[history.length - 1].submittedAt).toLocaleString()
      : "No submissions yet";

  return (
    <DashboardLayout role="Student">
      <h2 className="text-2xl font-bold mb-6">Student Dashboard</h2>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Stat title="Assignments Submitted" value={count} />
        <Stat title="Average Score" value="78%" />
        <Stat title="AI Feedbacks" value={history.length} />
        <Stat title="Last Submission" value={lastSubmission} />
      </div>

      {/* PROGRESS */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <p className="font-semibold mb-2">Progress</p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full"
            style={{ width: `${Math.min(count * 10, 100)}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {Math.min(count * 10, 100)}% completed
        </p>
      </div>

      {/* HISTORY */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Assignment History</h3>

        {history.length === 0 ? (
          <p className="text-gray-500">No assignments submitted yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">File</th>
                <th className="p-2">Status</th>
                <th className="p-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {history.map((a, i) => (
                <tr key={i} className="text-center border-t">
                  <td className="p-2">{a.fileName}</td>
                  <td className="p-2">{a.status}</td>
                  <td className="p-2">{a.score ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-md">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-xl font-bold mt-2">{value}</h3>
    </div>
  );
}
