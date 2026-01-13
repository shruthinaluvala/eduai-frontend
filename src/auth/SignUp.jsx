import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar.jsx";
import { registerUser } from "../services/api.js";

export default function SignUp() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "Student",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    setError("");

    if (!form.username || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <>
      <AuthNavbar />

      <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-indigo-50 to-blue-100">
        <div className="hidden md:flex items-center justify-center p-10">
          <img
            src="https://media.istockphoto.com/id/1358014313/photo/group-of-elementary-students-having-computer-class-with-their-teacher-in-the-classroom.jpg?s=612x612&w=0&k=20&c=3xsykmHXFa9ejL_sP2Xxiow7zdtmKvg15UxXFfgR98Q="
            className="w-4/5"
          />
        </div>

        <div className="flex items-center justify-center">
          <div className="bg-white p-10 rounded-xl shadow-lg w-[420px]">
            <h2 className="text-3xl font-bold text-center mb-6">
              Join EduAI 🚀
            </h2>

            <input
              className="input"
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />

            <input
              className="input mt-4"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <select
              className="input mt-4"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
            </select>

            {error && (
              <p className="text-red-500 text-sm mt-3 text-center">
                {error}
              </p>
            )}

            <button
              onClick={submit}
              className="btn-primary w-full mt-6"
            >
              Create Account
            </button>

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
