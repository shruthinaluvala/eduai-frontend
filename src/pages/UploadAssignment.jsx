import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import DashboardLayout from "../components/DashboardLayout";
import { submitAssignment } from "../services/api";

export default function UploadAssignment() {
  const { user } = useAuth();

  const [subject, setSubject] = useState("");
  const [branch, setBranch] = useState("CSE");
  const [year, setYear] = useState("Year 1");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!subject) {
      setMessage("❌ Please enter subject");
      return;
    }

    try {
      await submitAssignment({
        username: user.username,
        title: subject,
        content: `${branch} - ${year}`,
      });

      setMessage("✅ Assignment submitted successfully");
      setSubject("");
    } catch (err) {
      setMessage("❌ Submission failed");
    }
  };

  return (
    <DashboardLayout role="Student">
      <h2 className="text-2xl font-bold mb-6">Upload Assignment</h2>

      {/* FILE INPUT (UI ONLY) */}
      <div className="mb-4">
        <input type="file" />
      </div>

      {/* SUBJECT */}
      <div className="mb-4">
        <input
          className="input w-64"
          placeholder="DBMS"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      {/* BRANCH + YEAR */}
      <div className="flex gap-4 mb-4">
        <select
          className="input w-32"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        >
          <option>CSE</option>
          <option>ECE</option>
          <option>EEE</option>
          <option>MECH</option>
        </select>

        <select
          className="input w-32"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option>Year 1</option>
          <option>Year 2</option>
          <option>Year 3</option>
          <option>Year 4</option>
        </select>

        <button
          onClick={handleSubmit}
          className="btn-primary px-6"
        >
          Submit Assignment
        </button>
      </div>

      {/* MESSAGE */}
      {message && (
        <p className="mt-3 font-medium">
          {message}
        </p>
      )}
    </DashboardLayout>
  );
}
