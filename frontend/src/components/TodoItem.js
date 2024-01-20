import React, { useState } from 'react';
import DeleteIcon from './DeleteButton';

function TodoItem({ task, editTask, deleteTask, toggleCompletion }) {
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleEdit = () => {
    editTask(task._id, editedText);
    setEditing(false);
  };

  return (
    <li className='w-72 p-2 m-2 border bg-emerald-400  rounded-lg'>
      <input
      className='bg-slate-400 rounded-md m-2  p-2 text-white'
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleCompletion(task._id, task.completed)}
      />
      {isEditing ? (
        <>
          <input
          className='bg-emerald-300  rounded-md m-2 p-2 '
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button 
          className='border border-emerald-300 m-2 p-2 rounded-md bg-green-800 text-white'
          onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <span>{task.text}</span>
          <button className='border border-emerald-300 m-2 p-2 rounded-md bg-green-800 text-white' onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
      <DeleteIcon onClick={() => deleteTask(task._id)}>Delete</DeleteIcon>
    </li>
  );
}

export default TodoItem;
