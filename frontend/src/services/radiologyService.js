import api from './api';

export const radiologyService = {
  getAll: (params) => api.get('/radiology', { params }),
  create: (data) => api.post('/radiology', data),
  update: (id, data) => api.put(`/radiology/${id}`, data),
  uploadReport: (id, data) => api.patch(`/radiology/${id}/report`, data),
};
