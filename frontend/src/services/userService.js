import api from './api';

export const userService = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  toggleStatus: (id) => api.patch(`/users/${id}/toggle-status`),
  changePassword: (data) => api.patch('/users/change-password', data),
  register: (data) => api.post('/auth/register', data),
};
