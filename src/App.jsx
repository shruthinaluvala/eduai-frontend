import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import ProtectedRoute from "./auth/ProtectedRoute";
import EvaluationHistory from "./pages/EvaluationHistory";

import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import FacultyAnalytics from "./pages/FacultyAnalytics";
import FacultySubmissions from "./pages/FacultySubmissions";
import UploadAssignment from "./pages/UploadAssignment";
import Analytics from "./pages/Analytics";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      {/* Test route (keep for debugging) */}
      <Route path="/test" element={<div className="text-2xl p-10">UI WORKS</div>} />

      

      {/* Auth */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      {/* Student */}
      <Route
        path="/student"
        element={
          <ProtectedRoute role="Student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload"
        element={
          <ProtectedRoute role="Student">
            <UploadAssignment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute role="Student">
            <Analytics />
          </ProtectedRoute>
        }
      />

      {/* Faculty */}
      <Route
        path="/faculty"
        element={
          <ProtectedRoute role="Faculty">
            <FacultyDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/faculty/submissions"
        element={
          <ProtectedRoute role="Faculty">
            <FacultySubmissions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/faculty/analytics"
        element={
          <ProtectedRoute role="Faculty">
            <FacultyAnalytics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <EvaluationHistory />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
}
