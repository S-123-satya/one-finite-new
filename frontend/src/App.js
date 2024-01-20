import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTaskForm from './components/AddTaskForm';
import { addNote, deleteNote, getNotes,  updateNote } from './services/api'

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getNotes();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (text) => {
    try {
      const response = await addNote({text:text,completed:false});
      console.log(response);
      setTasks([...tasks, {...response?.data?.newTask}]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const editTask = async (id, text) => {
    try {
      await updateNote(id,{text:text});
      fetchTasks();
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteNote(id);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleCompletion = async (id, completed) => {
    try {
      await updateNote(id,{completed:!completed})
      fetchTasks();
    } catch (error) {
      console.error('Error toggling completion:', error);
    }
  };

  return (
    <div className='text-center '>
      <h1 className='text-3xl '>Todo App</h1>
      <AddTaskForm addTask={addTask} />
      <TodoList
        tasks={tasks}
        editTask={editTask}
        deleteTask={deleteTask}
        toggleCompletion={toggleCompletion}
      />
    </div>
  );
}

export default App;
