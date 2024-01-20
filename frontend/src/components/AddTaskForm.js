import React, { useState } from 'react';

function AddTaskForm({ addTask }) {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText.trim());
      setTaskText('');
    }
  };

  return (
    <form className='bg-slate-500 m-2 p-2 rounded-lg w-full flex justify-center ' onSubmit={handleSubmit}>
      <input
      className='bg-slate-400 rounded-md m-2 p-2 text-white'
        type="text"
        placeholder="Add a new task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button className='border border-emerald-300 m-2 p-2 rounded-md bg-green-800 text-white' type="submit">Add Task</button>
    </form>
  );
}

export default AddTaskForm;
