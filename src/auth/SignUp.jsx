import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar.jsx";
import { registerUser } from "../services/api.js";

export default function SignUp() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "Student"
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
      setError("User already exists or registration failed");
    }
  };

  return (
    <>
      <AuthNavbar />

      <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-indigo-50 to-blue-100">

        {/* IMAGE SIDE */}
        <div className="hidden md:flex items-center justify-center p-10">
          <img
            src="https://img.freepik.com/free-vector/students-studying-online_52683-37720.jpg"
            alt="signup"
            className="w-4/5"
          />
        </div>

        {/* FORM SIDE */}
        <div className="flex items-center justify-center">
          <div className="bg-white p-10 rounded-xl shadow-lg w-[420px]">

            <h2 className="text-3xl font-bold text-center mb-6">
              Join EduAI 🚀
            </h2>

            {/* GOOGLE (UI ONLY) */}
            <button
              type="button"
              className="w-full border py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5"
                alt="google"
              />
              Sign up with Google
            </button>

            <div className="flex items-center gap-3 my-6">
              <hr className="flex-1" />
              <span className="text-gray-400 text-sm">OR</span>
              <hr className="flex-1" />
            </div>

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
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
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
              className="btn-primary w-full mt-6"
            >
              Create Account
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
