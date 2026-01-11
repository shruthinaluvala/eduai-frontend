import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar.jsx";

export default function SignUp() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "Student"
  });

  const navigate = useNavigate();

  const submit = async () => {
    await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    navigate("/login");
  };

  return (
    <>
      <AuthNavbar />

      <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-indigo-50 to-blue-100">
        {/* IMAGE */}
        <div className="hidden md:flex items-center justify-center p-10">
          <img
            src="https://img.freepik.com/free-vector/students-studying-online_52683-37720.jpg"
            className="w-4/5"
          />
        </div>

        {/* FORM */}
        <div className="flex items-center justify-center">
          <div className="bg-white p-10 rounded-xl shadow-lg w-[420px]">
            <h2 className="text-3xl font-bold text-center mb-6">
              Join EduAI
            </h2>

            <button className="w-full border py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5"
              />
              Sign up with Google
            </button>

            <div className="flex items-center gap-3 my-6">
              <hr className="flex-1" />
              <span className="text-gray-400 text-sm">OR</span>
              <hr className="flex-1" />
            </div>

            <input
              className="input"
              placeholder="Username"
              onChange={e => setForm({ ...form, username: e.target.value })}
            />

            <input
              className="input mt-4"
              type="password"
              placeholder="Password"
              onChange={e => setForm({ ...form, password: e.target.value })}
            />

            <select
              className="input mt-4"
              onChange={e => setForm({ ...form, role: e.target.value })}
            >
              <option>Student</option>
              <option>Faculty</option>
            </select>

            <button
              onClick={submit}
              className="btn-primary w-full mt-6"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
