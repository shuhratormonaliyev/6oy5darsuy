import React, { useState, useEffect, useRef } from 'react';

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task) {
      setTasks([...tasks, { text: task }]);
      setTask('');
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed} : task
    );
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const taskToDelete = tasks[index];
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    setDeletedTasks([...deletedTasks, taskToDelete]);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-green-100 rounded-lg my-10">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <div className='flex gap-2'>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border p-2 rounded w-full mb-2"
        placeholder="Malumot kiriting..."
        ref={inputRef}
      />
      <button
        onClick={addTask}
        className="bg-purple-500 text-white p-2 rounded w-12 h-10 pt-1"
      >
        +
      </button>
      </div>
      <div className="mt-4">
        <h2 className="font-bold">Textlar - {tasks.length}</h2>
        {tasks.map((task, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-200 p-2 rounded mt-2">
            <span 
              className={task.completed ? 'line-through text-gray-500' : ''} 
              onClick={() => toggleTaskCompletion(index)}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(index)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h2 className="font-bold">Deleted Taxt</h2>
        {deletedTasks.map((task, index) => (
          <div key={index} className="bg-red-300 p-2 rounded mt-2">
            <span className="line-through text-gray-500">{task.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;