import api from './api';

export const appointmentService = {
  getAll: (params) => api.get('/appointments', { params }),
  create: (data) => api.post('/appointments', data),
  update: (id, data) => api.put(`/appointments/${id}`, data),
  cancel: (id, reason) => api.patch(`/appointments/${id}/cancel`, { reason }),
};
