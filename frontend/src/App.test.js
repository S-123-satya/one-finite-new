import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from './App';

// Mocking the axios requests
const mock = new MockAdapter(axios);

// Mock data
const mockTasks = [
  { _id: '1', text: 'Task 1', completed: false },
  { _id: '2', text: 'Task 2', completed: true },
];

// Mocking axios responses
mock.onGet('/api/notes').reply(200, mockTasks);
mock.onPost('/api/notes').reply(201, { data: { newTask: { _id: '3', text: 'Task 3', completed: false } } });
mock.onPut('/api/notes/1').reply(200, { data: { updatedTask: { _id: '1', text: 'Task 1 Updated', completed: false } } });
mock.onDelete('/api/notes/1').reply(200);
mock.onPut('/api/notes/2').reply(200, { data: { updatedTask: { _id: '2', text: 'Task 2', completed: false } } });

// Test cases
test('renders Todo App title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Todo App/i);
  expect(titleElement).toBeInTheDocument();
});

test('fetches tasks and renders them', async () => {
  render(<App />);
  const taskElement = await screen.findByText(/Task/i);
  expect(taskElement).toBeInTheDocument();
});

test('adds a new task', async () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Add a new task/i);
  fireEvent.change(inputElement, { target: { value: 'New Task' } });
  fireEvent.click(screen.getByText(/Add Task/i));

  // Wait for the new task to be added
  await waitFor(() => {
    const newTaskElement = screen.getByText(/New/i);
    expect(newTaskElement).toBeInTheDocument();
  });
});






