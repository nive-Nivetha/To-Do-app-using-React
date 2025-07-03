import React, { useState } from 'react';

function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState({ todo: [], ongoing: [], completed: [] });

  const handleInputChange = (e) => setTask(e.target.value);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks((prev) => ({ ...prev, todo: [...prev.todo, task] }));
      setTask('');
    }
  };

  const moveTask = (from, to, item) => {
    setTasks((prev) => ({
      ...prev,
      [from]: prev[from].filter((t) => t !== item),
      [to]: [...prev[to], item],
    }));
  };

  const deleteTask = (category, item) => {
    setTasks((prev) => ({
      ...prev,
      [category]: prev[category].filter((t) => t !== item),
    }));
  };

  const clearAll = (category) => {
    setTasks((prev) => ({ ...prev, [category]: [] }));
  };

  const renderSection = (title, category) => (
    <div className="task-section">
      <div className="section-header">
        <h2>{title}</h2>
        {tasks[category].length > 0 && (
          <button className="clear-btn" onClick={() => clearAll(category)}>
            Clear All
          </button>
        )}
      </div>
      <ul>
        {tasks[category].map((t, i) => (
          <li key={i} className="task-item">
            <span>{t}</span>
            <div className="buttons">
              {category !== 'todo' && (
                <button onClick={() => moveTask(category, 'todo', t)}>To-Do</button>
              )}
              {category !== 'ongoing' && (
                <button onClick={() => moveTask(category, 'ongoing', t)}>Ongoing</button>
              )}
              {category !== 'completed' && (
                <button onClick={() => moveTask(category, 'completed', t)}>Completed</button>
              )}
              <button className="delete-btn" onClick={() => deleteTask(category, t)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="home">
      <form
        className="task-form"
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          type="text"
          placeholder="Enter a task..."
          className="task-input"
          value={task}
          onChange={handleInputChange}
        />
        <button type="submit" className="add-task-button">
          Add Task
        </button>
      </form>
      <div className="task-sections">
        {renderSection('To-Do Tasks', 'todo')}
        {renderSection('Ongoing Tasks', 'ongoing')}
        {renderSection('Completed Tasks', 'completed')}
      </div>
    </div>
  );
}

export default Home;
