
import { useState, useEffect } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState([]);

  const API = "http://localhost:5050/api/task";

  // GET: Fetch all tasks
  async function getTask() {
    try {
      const response = await fetch(API);

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setTask(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  // Fetch tasks when the component loads
  useEffect(() => {
    getTask();
  }, []);

  // POST: Add a new task
  async function addTask(e) {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      setTitle("");
      getTask();
    } catch (error) {
      console.log(error.message);
    }
  }

  // DELETE: Delete a task
  async function deleteTask(id) {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      getTask();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <h1>Task Management App</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      <h2>My Tasks</h2>

      <ul>
        {task.map((item) => (
          <li key={item._id || item.id}>
            {item.title}{" "}
            <button
              type="button"
              onClick={() => deleteTask(item._id || item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
