import axios from 'axios';

const api = axios.create({
  baseURL: 'https://student-management-system-1cv3.onrender.com/api/students'
});

export default api;
