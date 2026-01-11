import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { evaluateAssignment } from "../services/api";

export default function EvaluateAssignment() {
  const [studentAnswer, setStudentAnswer] = useState("");
  const [answerKey, setAnswerKey] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEvaluate = async () => {
    setError("");
    setResult("");

    if (!studentAnswer || !answerKey) {
      setError("Please provide both student answer and answer key");
      return;
    }

    try {
      setLoading(true);
      const response = await evaluateAssignment(studentAnswer, answerKey);
      setResult(response);
    } catch (err) {
      setError("AI evaluation failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="Faculty">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-2xl font-bold mb-6 text-center">
          🤖 AI Assignment Evaluation
        </h2>

        {/* STUDENT ANSWER */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Student Answer
          </label>
          <textarea
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={5}
            placeholder="Paste student answer here..."
            value={studentAnswer}
            onChange={(e) => setStudentAnswer(e.target.value)}
          />
        </div>

        {/* ANSWER KEY */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Answer Key
          </label>
          <textarea
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            rows={5}
            placeholder="Paste model answer / answer key..."
            value={answerKey}
            onChange={(e) => setAnswerKey(e.target.value)}
          />
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        {/* BUTTON */}
        <div className="text-center">
          <button
            onClick={handleEvaluate}
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Evaluating..." : "Evaluate Assignment"}
          </button>
        </div>

        {/* RESULT */}
        {result && (
          <div className="mt-8 bg-white shadow rounded-lg p-6">
            <h3 className="font-bold mb-3 text-lg">
              📊 AI Evaluation Result
            </h3>
            <pre className="whitespace-pre-wrap text-gray-700">
              {result}
            </pre>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
