import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function DashboardLayout({ children, role }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-6">
        <h1 className="text-xl font-bold mb-8">Edu AI Platform</h1>

        <nav className="space-y-4">
          {/* Common */}
          <Link
            to={role === "Student" ? "/student" : "/faculty"}
            className="block hover:bg-blue-600 p-2 rounded"
          >
            Dashboard
          </Link>

          {/* Student-only */}
          {role === "Student" && (
            <>
              <Link
                to="/upload"
                className="block hover:bg-blue-600 p-2 rounded"
              >
                Assignments
              </Link>

              <Link
                to="/analytics"
                className="block hover:bg-blue-600 p-2 rounded"
              >
                Analytics
              </Link>
            </>
          )}

          {/* Faculty-only */}
          {role === "Faculty" && (
            <>
              <Link
                to="/faculty"
                className="block hover:bg-blue-600 p-2 rounded"
              >
                Submissions
              </Link>
            </>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="font-semibold">{role} Dashboard</h2>

          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {role}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <section className="p-6">{children}</section>
      </main>
    </div>
  );
}
