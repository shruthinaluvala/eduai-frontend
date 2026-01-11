import { useState } from "react";
import { evaluateAssignment } from "../services/api";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../auth/AuthContext";

export default function EvaluateAssignment() {
  const { user } = useAuth();
  const [studentAnswer, setStudentAnswer] = useState("");
  const [answerKey, setAnswerKey] = useState("");
  const [result, setResult] = useState(null);

  const handleEvaluate = async () => {
    const data = await evaluateAssignment(
      user.username,
      studentAnswer,
      answerKey
    );
    setResult(data);
  };

  return (
    <DashboardLayout role="Student">
      <h2 className="text-2xl font-bold mb-4">
        AI Assignment Evaluation
      </h2>

      <textarea
        className="input mb-3"
        rows={4}
        placeholder="Student Answer"
        value={studentAnswer}
        onChange={e => setStudentAnswer(e.target.value)}
      />

      <textarea
        className="input mb-4"
        rows={4}
        placeholder="Answer Key"
        value={answerKey}
        onChange={e => setAnswerKey(e.target.value)}
      />

      <button onClick={handleEvaluate} className="btn-primary">
        Evaluate
      </button>

      {result && (
        <div className="mt-6 bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-4">
            Score: {result.score.total}/10
          </h3>

          {Object.entries(result.score).map(
            ([key, value]) =>
              key !== "total" && (
                <div key={key} className="mb-3">
                  <p className="capitalize font-medium">{key}</p>
                  <div className="w-full bg-gray-200 h-3 rounded">
                    <div
                      className="bg-blue-600 h-3 rounded"
                      style={{ width: `${value * 10}%` }}
                    />
                  </div>
                </div>
              )
          )}

          <pre className="mt-4 whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded">
            {result.result}
          </pre>
        </div>
      )}
    </DashboardLayout>
  );
}
