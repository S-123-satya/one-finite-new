import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from './TodoList';

describe('TodoList Component', () => {
  const mockTasks = [
    { _id: '1', text: 'Task 1', completed: false },
    { _id: '2', text: 'Task 2', completed: true },
    { _id: '3', text: 'Task 3', completed: false },
  ];

  const mockEditTask = jest.fn();
  const mockDeleteTask = jest.fn();
  const mockToggleCompletion = jest.fn();

  test('renders TodoList component with tasks', () => {
    render(
      <TodoList
        tasks={mockTasks}
        editTask={mockEditTask}
        deleteTask={mockDeleteTask}
        toggleCompletion={mockToggleCompletion}
      />
    );

    const taskElements = screen.getAllByRole('listitem');

    expect(taskElements).toHaveLength(3);
    expect(taskElements[0]).toHaveTextContent(/Task 1/i);
    expect(taskElements[1]).toHaveTextContent(/Task 2/i);
    expect(taskElements[2]).toHaveTextContent(/Task 3/i);
  });

  test('calls editTask, deleteTask, and toggleCompletion functions when interacting with tasks', () => {
    render(
      <TodoList
        tasks={mockTasks}
        editTask={mockEditTask}
        deleteTask={mockDeleteTask}
        toggleCompletion={mockToggleCompletion}
      />
    );

    const checkboxElements = screen.getAllByRole('checkbox');

    checkboxElements.forEach((checkbox, index) => {
      fireEvent.click(checkbox);
      expect(mockToggleCompletion).toHaveBeenCalledWith(mockTasks[index]._id, mockTasks[index].completed);
    });
  });
});
