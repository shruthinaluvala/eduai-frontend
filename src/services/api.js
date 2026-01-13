const API_BASE = "https://eduai-backend-ez9q.onrender.com/api";

/* ================= AUTH ================= */

export async function loginUser(credentials) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json(); // { username, role }
}

export async function registerUser(data) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Signup failed");
  return res.json();
}

/* ================= STUDENT ================= */

// SAFE COUNT (derived from list)
export async function getStudentAssignments(username) {
  const res = await fetch(
    `${API_BASE}/assignments/student/${username}`
  );

  if (!res.ok) return [];
  return res.json();
}

export async function submitAssignment(data) {
  const res = await fetch(`${API_BASE}/assignments/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to submit assignment");
  }

  // backend may not return JSON → safe guard
  try {
    return await res.json();
  } catch {
    return {};
  }
}

export async function getAssignmentCount(username) {
  const res = await fetch(
    `${API_BASE}/assignments/count/${username}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch assignment count");
  }

  return res.json();
}


/* ================= FACULTY ================= */

// DEMO SAFE
export async function getAllAssignments() {
  const res = await fetch(`${API_BASE}/assignments/all`);
  if (!res.ok) return [];
  return res.json();
}
