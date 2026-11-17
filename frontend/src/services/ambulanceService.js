import api from './api';

export const ambulanceService = {
  getAll: (params) => api.get('/ambulance', { params }),
  create: (data) => api.post('/ambulance', data),
  update: (id, data) => api.put(`/ambulance/${id}`, data),
  dispatch: (id, destination) => api.patch(`/ambulance/${id}/dispatch`, { destination }),
};
