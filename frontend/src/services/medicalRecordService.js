import api from './api';

export const medicalRecordService = {
  getAll: (params) => api.get('/medical-records', { params }),
  getById: (id) => api.get(`/medical-records/${id}`),
  create: (data) => api.post('/medical-records', data),
  update: (id, data) => api.put(`/medical-records/${id}`, data),
};
