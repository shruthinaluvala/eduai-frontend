import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async () => {
    await fetch("http://localhost:8080/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    setMsg("Password reset link sent (mock)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-6 text-center">
          Forgot Password
        </h2>

        <input
          placeholder="Enter username"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Reset Password
        </button>

        {msg && <p className="text-green-600 mt-4">{msg}</p>}

        <p className="text-sm mt-4 text-center">
          <Link to="/login" className="text-blue-600 underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
