import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const getTodos = () => axios.get(API_URL);
export const addTodo = (todo) => axios.post(API_URL, todo);
export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);
export const updateTodo = (id, updatedTodo) =>
  axios.put(`${API_URL}/${id}`, updatedTodo);
