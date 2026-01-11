import { API_BASE } from "./config";

// ==========================
// AUTH
// ==========================
export async function loginUser(username, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
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

// ==========================
// ASSIGNMENTS
// ==========================
export async function submitAssignment(data) {
  const res = await fetch(`${API_BASE}/assignments/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Submission failed");
}

export async function getAssignmentCount(username) {
  const res = await fetch(`${API_BASE}/assignments/count/${username}`);
  return res.json();
}

export async function getStudentAssignments(username) {
  const res = await fetch(`${API_BASE}/assignments/student/${username}`);
  return res.json();
}

export async function getAllAssignments() {
  const res = await fetch(`${API_BASE}/assignments/all`);
  return res.json();
}

// ==========================
// AI EVALUATION
// ==========================
export async function evaluateAssignment(studentAnswer, answerKey) {
  const res = await fetch(`${API_BASE}/ai/evaluate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentAnswer, answerKey }),
  });
  if (!res.ok) throw new Error("Evaluation failed");
  return res.text();
}

// ==========================
// (OPTIONAL – ONLY IF USED)
// ==========================
export async function getEvaluationHistory() {
  return [];
}

export async function getStudentEvaluationHistory() {
  return [];
}
