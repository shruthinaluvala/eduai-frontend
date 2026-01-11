const API_BASE_URL = "http://localhost:8080/api/ai";

export async function evaluateAssignment(studentAnswer, answerKey) {
  const response = await fetch(`${API_BASE_URL}/evaluate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      studentAnswer,
      answerKey
    })
  });

  if (!response.ok) {
    throw new Error("Failed to evaluate assignment");
  }

  return response.text(); // backend returns String
}
