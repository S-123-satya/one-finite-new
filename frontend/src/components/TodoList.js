import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ tasks, editTask, deleteTask, toggleCompletion }) {
  return (
    <ul className='flex border border-blue-300 flex-wrap'>
      {tasks.map((task) => (
        <TodoItem
          key={task._id}
          task={task}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleCompletion={toggleCompletion}
        />
      ))}
    </ul>
  );
}

export default TodoList;
