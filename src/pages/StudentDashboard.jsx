import { useLocation } from "react-router-dom";
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
  const [assignments, setAssignments] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const location = useLocation();
useEffect(() => {
  if (!user?.username) return;

  async function loadData() {
    try {
      const list = await getStudentAssignments(user.username);
      setAssignments(list);

      setCount(list.length);
    } catch (err) {
      console.error("Dashboard load error:", err);
    }
  }

  loadData();
}, [user,location.pathname]);

  
  const lastSubmission =
    assignments.length > 0
      ? assignments[assignments.length - 1].title
      : "No submissions yet";

  const scores = assignments.filter(a => a.score != null);
  const avgScore =
  scores.length
    ? Math.round(scores.reduce((s, a) => s + a.score, 0) / scores.length)
    : "-";
    
  const submittedCount = assignments.filter(
  a => a.status === "SUBMITTED"
  ).length;
  
  return (
    <DashboardLayout role="Student">
      <h2 className="text-2xl font-bold mb-6">Student Dashboard</h2>

      <div className="grid md:grid-cols-4 gap-6">
        <Stat title="Assignments Submitted" value={assignments.length} />
       <Stat title="Average Score" value={avgScore === "-" ? "-" : `${avgScore}%`} />
        <Stat title="AI Feedbacks" value={assignments.length} />
        <Stat title="Last Submission" value={lastSubmission} />
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
