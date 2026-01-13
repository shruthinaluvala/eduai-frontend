import { useEffect, useState } from "react";
import { getAllAssignments } from "../services/api";
import DashboardLayout from "../components/DashboardLayout";

export default function FacultyDashboard() {
  const [list, setList] = useState([]);

  useEffect(() => {
    getAllAssignments().then(setList);
  }, []);

  return (
    <DashboardLayout role="Faculty">
      <h2 className="text-2xl font-bold mb-6">Faculty Control Center</h2>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <Stat title="Total" value={list.length} />
        <Stat title="Submitted" value={list.length} />
        <Stat title="Reviewed" value={0} />
        <Stat title="Graded" value={0} />
      </div>
    </DashboardLayout>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}
