import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../auth/AuthContext";

export default function UploadAssignment() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState("");
  const [branch, setBranch] = useState("CSE");
  const [year, setYear] = useState(1);

  const submitAssignment = async () => {
    if (!file) return alert("Please select a file");

    await fetch("http://localhost:8080/api/assignments/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentUsername: user.username,
        studentName: user.username,
        rollNo: "JNTUH001",
        branch,
        year,
        subject,
        fileName: file.name
      }),
    });

    alert("Assignment submitted successfully");
  };

  return (
    <DashboardLayout role="Student">
      <h3 className="text-xl font-bold mb-4">Upload Assignment</h3>

      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.txt"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-3"
      />

      <input
        placeholder="Subject"
        className="block border p-2 mb-3"
        onChange={(e) => setSubject(e.target.value)}
      />

      <select onChange={(e) => setBranch(e.target.value)} className="mb-3">
        <option>CSE</option>
        <option>IT</option>
        <option>ECE</option>
        <option>EEE</option>
        <option>MECH</option>
      </select>

      <select onChange={(e) => setYear(e.target.value)} className="mb-3">
        <option value={1}>Year 1</option>
        <option value={2}>Year 2</option>
        <option value={3}>Year 3</option>
        <option value={4}>Year 4</option>
      </select>

      <button
        onClick={submitAssignment}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Assignment
      </button>
    </DashboardLayout>
  );
}
