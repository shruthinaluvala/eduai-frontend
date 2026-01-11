import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthNavbar from "../components/AuthNavbar.jsx";
import { useAuth } from "./AuthContext.jsx";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const user = await res.json();
    login(user);
    navigate(user.role === "Student" ? "/student" : "/faculty");
  };

  return (
    <>
      <AuthNavbar />

      <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* IMAGE SIDE */}
        <div className="hidden md:flex items-center justify-center p-10">
          <img
            src="https://img.freepik.com/free-vector/online-learning-concept-illustration_114360-4764.jpg"
            alt="login"
            className="w-4/5"
          />
        </div>

        {/* FORM SIDE */}
        <div className="flex items-center justify-center">
          <div className="bg-white p-10 rounded-xl shadow-lg w-[420px]">
            <h2 className="text-3xl font-bold text-center mb-6">
              Welcome Back
            </h2>

            {/* GOOGLE */}
            <button className="w-full border py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5"
              />
              Continue with Google
            </button>

            <div className="flex items-center gap-3 my-6">
              <hr className="flex-1" />
              <span className="text-gray-400 text-sm">OR</span>
              <hr className="flex-1" />
            </div>

            <input
              className="input"
              placeholder="Username"
              onChange={e => setUsername(e.target.value)}
            />

            <div className="relative mt-4">
              <input
                className="input pr-10"
                type={show ? "text" : "password"}
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-3 top-3 cursor-pointer"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <button
              onClick={handleLogin}
              className="btn-primary w-full mt-6"
            >
              Login
            </button>

            <p className="text-sm text-center mt-4">
              New user?{" "}
              <Link to="/signup" className="text-blue-600 font-semibold">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
