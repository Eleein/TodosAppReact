

export async function saveTodo(todo) {
  const response = await fetch("http://localhost:3030/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON"
    },
    body: JSON.stringify(todo)
  });

  if (response.ok) {
    return await response.json();
  }
  throw new Error("Request failed!");
}
