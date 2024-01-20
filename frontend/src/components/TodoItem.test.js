import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from './TodoItem';

describe('TodoItem Component', () => {
  const mockTask = { _id: '1', text: 'Test Task', completed: false };
  const mockEditTask = jest.fn();
  const mockDeleteTask = jest.fn();
  const mockToggleCompletion = jest.fn();

  test('renders TodoItem component', () => {
    render(
      <TodoItem
        task={mockTask}
        editTask={mockEditTask}
        deleteTask={mockDeleteTask}
        toggleCompletion={mockToggleCompletion}
      />
    );

    const checkboxElement = screen.getByRole('checkbox');
    const textElement = screen.getByText(/Test Task/i);
    const editButton = screen.getByText(/Edit/i);

    expect(checkboxElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    
  });

  test('calls editTask function when editing and saving a task', () => {
    render(
      <TodoItem
        task={mockTask}
        editTask={mockEditTask}
        deleteTask={mockDeleteTask}
        toggleCompletion={mockToggleCompletion}
      />
    );

    const editButton = screen.getByText(/Edit/i);
    fireEvent.click(editButton);

    const inputElement = screen.getByDisplayValue(/Test Task/i);
    fireEvent.change(inputElement, { target: { value: 'Test Task Updated' } });

    const saveButton = screen.getByText(/Save/i);
    fireEvent.click(saveButton);

    expect(mockEditTask).toHaveBeenCalledWith('1', 'Test Task Updated');
  });

 

  test('calls toggleCompletion function when the checkbox is clicked', () => {
    render(
      <TodoItem
        task={mockTask}
        editTask={mockEditTask}
        deleteTask={mockDeleteTask}
        toggleCompletion={mockToggleCompletion}
      />
    );

    const checkboxElement = screen.getByRole('checkbox');
    fireEvent.click(checkboxElement);

    expect(mockToggleCompletion).toHaveBeenCalledWith('1', false); // Assuming it starts with completed: false
  });
});
