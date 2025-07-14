import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sgt-api.onrender.com/', // Cambiar por tu URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;