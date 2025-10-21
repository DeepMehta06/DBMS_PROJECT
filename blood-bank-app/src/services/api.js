import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => API.post('/auth/register', userData),
  login: (credentials) => API.post('/auth/login', credentials),
  getCurrentUser: () => API.get('/auth/me'),
};

// Donors API calls
export const donorsAPI = {
  getAll: (params) => API.get('/donors', { params }),
  getById: (id) => API.get(`/donors/${id}`),
  create: (data) => API.post('/donors', data),
  update: (id, data) => API.put(`/donors/${id}`, data),
  delete: (id) => API.delete(`/donors/${id}`),
  getStats: () => API.get('/donors/stats'),
};

// Recipients API calls
export const recipientsAPI = {
  getAll: (params) => API.get('/recipients', { params }),
  getById: (id) => API.get(`/recipients/${id}`),
  create: (data) => API.post('/recipients', data),
  update: (id, data) => API.put(`/recipients/${id}`, data),
  delete: (id) => API.delete(`/recipients/${id}`),
  updateStatus: (id, status) => API.patch(`/recipients/${id}/status`, { status }),
};

// Blood Specimens API calls
export const bloodSpecimensAPI = {
  getAll: (params) => API.get('/blood-specimens', { params }),
  getById: (id) => API.get(`/blood-specimens/${id}`),
  create: (data) => API.post('/blood-specimens', data),
  update: (id, data) => API.put(`/blood-specimens/${id}`, data),
  delete: (id) => API.delete(`/blood-specimens/${id}`),
  updateStatus: (id, status) => API.patch(`/blood-specimens/${id}/status`, { status }),
  getInventoryStats: () => API.get('/blood-specimens/stats/inventory'),
};

// Hospitals API calls
export const hospitalsAPI = {
  getAll: (params) => API.get('/hospitals', { params }),
  getById: (id) => API.get(`/hospitals/${id}`),
  create: (data) => API.post('/hospitals', data),
  update: (id, data) => API.put(`/hospitals/${id}`, data),
  delete: (id) => API.delete(`/hospitals/${id}`),
};

export default API;
