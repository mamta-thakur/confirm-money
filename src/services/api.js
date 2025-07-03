import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5000/api', // or your actual base URL
  baseURL: 'https://cors-anywhere.herokuapp.com/https://confirmmoney-nodejs.ckeoo6.easypanel.host', // or your actual base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;