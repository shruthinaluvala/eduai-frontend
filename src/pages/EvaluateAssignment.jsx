import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { evaluateAssignment } from "../services/api";

export default function EvaluateAssignment() {
  const [file, setFile] = useState(null);
  const [answerKey, setAnswerKey] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(file); // TXT for now
    });
  };

  const handleEvaluate = async () => {
    setError("");
    setResult("");

    if (!file || !answerKey) {
      setError("Please upload assignment and provide answer key");
      return;
    }

    try {
      setLoading(true);
      const studentAnswer = await readFileContent(file);
      const response = await evaluateAssignment(studentAnswer, answerKey);
      setResult(response);
    } catch {
      setError("Evaluation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="Faculty">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          📁 Upload Assignment for AI Evaluation
        </h2>

        <input
          type="file"
          accept=".txt"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        <textarea
          className="w-full p-3 border rounded mb-4"
          rows={4}
          placeholder="Answer Key"
          value={answerKey}
          onChange={(e) => setAnswerKey(e.target.value)}
        />

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <button
          onClick={handleEvaluate}
          className="bg-blue-600 text-white px-6 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Evaluating..." : "Evaluate"}
        </button>

        {result && (
          <div className="mt-6 bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">AI Result</h3>
            <pre className="whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
