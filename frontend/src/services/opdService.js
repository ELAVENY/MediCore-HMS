import api from './api';

export const opdService = {
  getAll: (params) => api.get('/opd', { params }),
  getById: (id) => api.get(`/opd/${id}`),
  create: (data) => api.post('/opd', data),
  update: (id, data) => api.put(`/opd/${id}`, data),
};
