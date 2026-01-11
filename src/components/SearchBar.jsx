import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;

    const q = query.toLowerCase();

    if (q.includes("student")) navigate("/student");
    else if (q.includes("faculty")) navigate("/faculty");
    else if (q.includes("assignment")) navigate("/upload");
    else if (q.includes("analytics")) navigate("/analytics");
    else alert("No results found");

    setQuery("");
  };

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Search assignments, analytics, dashboards"
      className="bg-gray-100 px-4 py-2 rounded-full w-[420px] outline-none"
    />
  );
}
