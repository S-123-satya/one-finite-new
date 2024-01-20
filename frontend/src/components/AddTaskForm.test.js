import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTaskForm from './AddTaskForm';

describe('AddTaskForm Component', () => {
  test('renders AddTaskForm component', () => {
    render(<AddTaskForm addTask={() => {}} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add Task/i);

    expect(inputElement).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test('updates state on input change', () => {
    render(<AddTaskForm addTask={() => {}} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task/i);

    fireEvent.change(inputElement, { target: { value: 'New Task' } });

    expect(inputElement.value).toBe('New Task');
  });

  test('submits form and calls addTask function', () => {
    const mockAddTask = jest.fn();
    render(<AddTaskForm addTask={mockAddTask} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(inputElement, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    expect(mockAddTask).toHaveBeenCalledWith('New Task');
    expect(inputElement.value).toBe('');
  });

  test('does not call addTask function on empty form submission', () => {
    const mockAddTask = jest.fn();
    render(<AddTaskForm addTask={mockAddTask} />);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.click(addButton);

    expect(mockAddTask).not.toHaveBeenCalled();
  });
});
