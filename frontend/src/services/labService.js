import api from './api';

export const labService = {
  getAll: (params) => api.get('/lab', { params }),
  create: (data) => api.post('/lab', data),
  update: (id, data) => api.put(`/lab/${id}`, data),
  enterResults: (id, results) => api.patch(`/lab/${id}/results`, { results }),
  verify: (id) => api.patch(`/lab/${id}/verify`),
};
