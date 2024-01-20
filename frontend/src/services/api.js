import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api', // Your server URL
});

export const getNotes = () => instance.get('/notes');
export const getNote = (id) => instance.get(`/notes/${id}`);
export const addNote = (note) => instance.post('/notes', note);
export const deleteNote = (id) => instance.delete(`/notes/${id}`);
export const updateNote = (id,note) => instance.put(`/notes/${id}`,note);
