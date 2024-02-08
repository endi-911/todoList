import React, { useState, useEffect } from 'react';

const TodoList = () => {

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return [];
    }
  });

  const addTask = (text) => {
    const newTask = { text, completed: false };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };


  const removeTask = (index) => {
    setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
  };


  const toggleTaskCompletion = (index) => {
    setTasks(prevTasks =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
            <button onClick={() => removeTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <input type="text" id="newTask" />
      <button onClick={() => {
        const textInput = document.getElementById('newTask');
        if (textInput.value.trim() !== '') {
          addTask(textInput.value.trim());
          textInput.value = '';
        }
      }}>Add Task</button>
    </div>
  );
};

export default TodoList;
