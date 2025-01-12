import axios from 'axios';

const API_URL = 'https://taskmanagementapi20250108083524.azurewebsites.net/api';

export const getAllTasks = () => axios.get(`${API_URL}/task`);
export const getTaskById = (id) => axios.get(`${API_URL}/task/${id}`);
export const createTask = (task) => axios.post(`${API_URL}/task`, task);
export const deleteTask = (id) => axios.delete(`${API_URL}/task/${id}`);
