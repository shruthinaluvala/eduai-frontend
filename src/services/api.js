// 🔹 LIVE BACKEND BASE URL (Render)
const API_BASE_URL = "https://eduai-backend-ez9q.onrender.com/api/ai";


// ==========================
// AI EVALUATION
// ==========================
export async function evaluateAssignment(studentAnswer, answerKey) {
  const response = await fetch(`${API_BASE_URL}/ai/evaluate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      studentAnswer,
      answerKey,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to evaluate assignment");
  }

  return response.text(); // backend returns String
}


// ==========================
// AUTH
// ==========================
export async function loginUser(data) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Login failed");
  return response.json();
}

export async function registerUser(data) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Signup failed");
  return response.json();
}


// ==========================
// ASSIGNMENTS
// ==========================
export async function submitAssignment(data) {
  const response = await fetch(`${API_BASE_URL}/assignments/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Submission failed");
}

export async function getAssignmentCount(username) {
  const response = await fetch(
    `${API_BASE_URL}/assignments/count/${username}`
  );
  return response.json();
}

export async function getAllAssignments() {
  const response = await fetch(`${API_BASE_URL}/assignments/all`);
  return response.json();
}
