import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Logo from "../assets/eduai-logo.svg";
export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-10 py-4">

        {/* LEFT */}
        <img
          src={Logo}
          alt="EduAI Logo"
          className="h-8 cursor-pointer"
        />


        {/* CENTER SEARCH */}
        <div className="hidden md:block">
          <SearchBar />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">
          <Link to="/login" className="text-gray-700 hover:text-indigo-600">
            Log in
          </Link>

          <Link
            to="/signup"
            className="bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold"
          >
            Sign up
          </Link>
        </div>

      </div>
    </header>
  );
}
