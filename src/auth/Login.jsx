import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthNavbar from "../components/AuthNavbar.jsx";
import { useAuth } from "./AuthContext.jsx";
import { loginUser } from "../services/api.js";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    try {
      const user = await loginUser({ username, password });

      console.log("LOGIN RESPONSE:", user);

      // 🔴 HARD CHECK
      if (!user?.role || !user?.username) {
        throw new Error("Invalid login response");
      }

      // SAVE TO CONTEXT
      login(user);

      // ROLE BASED REDIRECT
      if (user.role === "Student") {
        navigate("/student");
      } else if (user.role === "Faculty") {
        navigate("/faculty");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err.message);
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <AuthNavbar />

      <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="hidden md:flex items-center justify-center p-10">
          <img
            src="https://img.freepik.com/free-vector/online-learning-concept-illustration_114360-4764.jpg"
            alt="login"
            className="w-4/5"
          />
        </div>

        <div className="flex items-center justify-center">
          <div className="bg-white p-10 rounded-xl shadow-lg w-[420px]">
            <h2 className="text-3xl font-bold text-center mb-6">
              Welcome Back 👋
            </h2>

            <input
              className="input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <div className="relative mt-4">
              <input
                className="input pr-10"
                type={show ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-3 text-center">
                {error}
              </p>
            )}

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
