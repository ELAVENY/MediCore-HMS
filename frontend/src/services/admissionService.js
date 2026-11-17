import api from './api';

export const admissionService = {
  getAll: (params) => api.get('/admissions', { params }),
  create: (data) => api.post('/admissions', data),
  discharge: (id, notes) => api.patch(`/admissions/${id}/discharge`, { notes }),
};
