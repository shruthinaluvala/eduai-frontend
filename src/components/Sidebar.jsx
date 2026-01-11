import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-60 bg-blue-700 text-white min-h-screen p-5">
      <ul className="space-y-4">
        <li><Link to="/">Student Dashboard</Link></li>
        <li><Link to="/faculty">Faculty Dashboard</Link></li>
        <li><Link to="/upload">Upload Assignment</Link></li>
        <li><Link to="/evaluation">AI Feedback</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
      </ul>
    </div>
  );
}
