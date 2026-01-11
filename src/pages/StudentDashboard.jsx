import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import DashboardLayout from "../components/DashboardLayout";
import {
  getAssignmentCount,
  getStudentAssignments
} from "../services/api";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getAssignmentCount(user.username).then(setCount);
    getStudentAssignments(user.username).then(setHistory);
  }, [user.username]);

  const lastSubmission =
    history.length > 0
      ? new Date(history.at(-1).submittedAt).toLocaleString()
      : "No submissions yet";

  return (
    <DashboardLayout role="Student">
      <h2 className="text-2xl font-bold mb-6">Student Dashboard</h2>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Stat title="Assignments Submitted" value={count} />
        <Stat title="Average Score" value="78%" />
        <Stat title="AI Feedbacks" value={history.length} />
        <Stat title="Last Submission" value={lastSubmission} />
      </div>
    </DashboardLayout>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}
