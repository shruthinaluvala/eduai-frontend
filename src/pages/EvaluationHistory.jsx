import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../auth/AuthContext";
import { getEvaluationHistory, getStudentEvaluationHistory } from "../services/api";

export default function EvaluationHistory() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data =
        user.role === "Faculty"
          ? await getEvaluationHistory()
          : await getStudentEvaluationHistory(user.username);

      setHistory(data);
    };

    fetchData();
  }, [user]);

  return (
    <DashboardLayout role={user.role}>
      <h2 className="text-2xl font-bold mb-6">📜 AI Evaluation History</h2>

      <div className="space-y-4">
        {history.map((h, i) => (
          <div key={i} className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">
              {new Date(h.evaluatedAt).toLocaleString()}
            </p>
            <p className="font-semibold mt-1">
              Student: {h.studentUsername}
            </p>
            <pre className="mt-3 whitespace-pre-wrap text-gray-700">
              {h.result}
            </pre>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
