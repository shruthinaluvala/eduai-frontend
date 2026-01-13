import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import DashboardLayout from "../components/DashboardLayout";
import {getAssignmentCount} from "../services/api";
import { getStudentAssignments } from "../services/api";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [count, setCount] = useState(0);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
  if (!user?.username) return;
  async function loadData() {
      try {
        const c = await getAssignmentCount(user.username);
        setCount(c);

        const list = await getStudentAssignments(user.username);
        setAssignments(list);
      } catch (err) {
        console.error("Dashboard load error:", err);
      }
    }

    loadData();
  }, [user]);
  const lastSubmission =
    assignments.length > 0
      ? new Date(assignments.at(-1).submittedAt).toLocaleString()
      : "No submissions yet";


  return (
    <DashboardLayout role="Student">
      <h2 className="text-2xl font-bold mb-6">Student Dashboard</h2>

      <div className="grid md:grid-cols-4 gap-6">
        <Stat title="Assignments Submitted" value={assignments.length} />
        <Stat title="Average Score" value="78%" />
        <Stat title="AI Feedbacks" value={assignments.length} />
        <Stat title="Last Submission" value={
          assignments.length
            ? new Date(assignments.at(-1).submittedAt).toLocaleString()
            : "No submissions"
        } />
      </div>
    </DashboardLayout>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}
