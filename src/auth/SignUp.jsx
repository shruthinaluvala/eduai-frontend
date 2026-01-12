import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar.jsx";
import { registerUser } from "../services/api.js";

export default function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "STUDENT"
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");

    // 🔐 Validation
    if (!form.username || !form.password || !form.role) {
      setError("All fields are required");
      return;
    }

    if (form.password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        username: form.username.trim(),
        password: form.password,
        role: form.role // STUDENT or FACULTY
      });

      alert("Signup successful 🎉");
      navigate("/login");

    } catch (err) {
      if (err.response?.status === 400) {
        setError("User already exists");
      } else {
        setError("Signup failed. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthNavbar />

      <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-indigo-50 to-blue-100">

        {/* IMAGE SIDE */}
        <div className="hidden md:flex items-center justify-center p-10">
          <img
            src="https://media.istockphoto.com/id/1358014313/photo/group-of-elementary-students-having-computer-class-with-their-teacher-in-the-classroom.jpg"
            alt="signup"
            className="w-4/5 rounded-xl"
          />
        </div>

        {/* FORM SIDE */}
        <div className="flex items-center justify-center">
          <div className="bg-white p-10 rounded-xl shadow-lg w-[420px]">

            <h2 className="text-3xl font-bold text-center mb-6">
              Join EduAI 🚀
            </h2>

            {/* USERNAME */}
            <input
              className="input"
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />

            {/* PASSWORD */}
            <input
              className="input mt-4"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            {/* ROLE */}
            <select
              className="input mt-4"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="STUDENT">Student</option>
              <option value="FACULTY">Faculty</option>
            </select>

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm mt-3 text-center">
                {error}
              </p>
            )}

            {/* SUBMIT */}
            <button
              onClick={submit}
              disabled={loading}
              className={`btn-primary w-full mt-6 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            {/* LOGIN LINK */}
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-semibold">
                Login
              </Link>
            </p>

          </div>
        </div>
      </div>
    </>
  );
}
