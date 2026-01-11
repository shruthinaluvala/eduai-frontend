import { Link } from "react-router-dom";
import Logo from "../assets/eduai-logo.svg";

<img src={Logo} className="h-8" />
export default function AuthNavbar() {
  return (
    <header className="w-full bg-white shadow-sm px-10 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">EduAI</h1>

      <nav className="flex items-center gap-6">
        <Link to="/" className="text-gray-600 hover:text-blue-600">
          Home
        </Link>
        <Link to="/login" className="text-gray-600 hover:text-blue-600">
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
}
