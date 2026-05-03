import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://student-life-hub-9qxv.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use((config) => {
  const stored = window.localStorage.getItem('studentLifeUser');
  if (stored) {
    const payload = JSON.parse(stored);
    if (payload?.token) config.headers.Authorization = `Bearer ${payload.token}`;
  }
  return config;
});

export default instance;
