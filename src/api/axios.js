import axios from 'axios';

const apiClient = axios.create({
  // baseURL: 'http://localhost:8101/api',
  baseURL: 'http://localhost:9998/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    // Add token or other request configurations here
    return config;
  },
  error => Promise.reject(error)
);

apiClient.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export default apiClient;
