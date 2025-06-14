import React, { useState } from 'react';
import './index.css';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() === "") return;
    const newTaskObj = {
      id: Date.now(), // unique id for key
      text: newTask.trim()
    };
    setTasks(prevTasks => [...prevTasks, newTaskObj]);
    setNewTask("");
  }

  function deleteTask(id) {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }

  function moveTaskUp(index) {
    if (index <= 0) return;
    const updatedTasks = [...tasks];
    [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
    setTasks(updatedTasks);
  }

  function moveTaskDown(index) {
    if (index >= tasks.length - 1) return;
    const updatedTasks = [...tasks];
    [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
    setTasks(updatedTasks);
  }

  return (
    <div className="to-do-list">
      <h1>To-Do List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-btn" onClick={addTask} disabled={newTask.trim() === ""}>
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <span className="noTask">No tasks yet. Add one above!</span>
      ) : (
        <ol>
          {tasks.map((task, index) => (
            <li key={task.id}>
              <span className="text">{task.text}</span>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
              <button className="move-btn" onClick={() => moveTaskUp(index)}>⬆️</button>
              <button className="move-btn" onClick={() => moveTaskDown(index)}>⬇️</button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default ToDoList;
