import { useState } from "react";
import { evaluateAssignment } from "../services/api";

export default function EvaluateAssignment() {
  const [studentAnswer, setStudentAnswer] = useState("");
  const [answerKey, setAnswerKey] = useState("");
  const [result, setResult] = useState("");

  const handleEvaluate = async () => {
    const response = await evaluateAssignment(studentAnswer, answerKey);
    setResult(response);
  };

  return (
    <div>
      <h2>AI Assignment Evaluation</h2>

      <textarea
        placeholder="Student Answer"
        value={studentAnswer}
        onChange={(e) => setStudentAnswer(e.target.value)}
        rows={4}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <textarea
        placeholder="Answer Key"
        value={answerKey}
        onChange={(e) => setAnswerKey(e.target.value)}
        rows={4}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={handleEvaluate}>
        Evaluate
      </button>

      {result && (
        <pre style={{ marginTop: "20px", background: "#eee", padding: "10px" }}>
          {result}
        </pre>
      )}
    </div>
  );
}
