import { useState } from "react"

function App() {
  const [tasks, setTasks] = useState([])
  const [text, setText] = useState("")
  const [editId, setEditId] = useState(null)

  function addTask() {
    if (text.trim() === "") return

    if (editId !== null) {
      setTasks(tasks.map(t => t.id === editId ? { ...t, text } : t))
      setEditId(null)
    } else {
      setTasks([...tasks, { id: Date.now(), text }])
    }

    setText("")
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id))
  }

  function editTask(task) {
    setText(task.text)
    setEditId(task.id)
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>ToDo App</h1>

      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Wpisz zadanie"
      />

      <button onClick={addTask}>
        {editId !== null ? "Zapisz" : "Dodaj"}
      </button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => editTask(task)}>Edytuj</button>
            <button onClick={() => deleteTask(task.id)}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
