import api from './api';

export const wardService = {
  getAll: () => api.get('/wards'),
  create: (data) => api.post('/wards', data),
  getBeds: (params) => api.get('/wards/beds', { params }),
  createBed: (data) => api.post('/wards/beds', data),
  updateBedStatus: (id, status) => api.patch(`/wards/beds/${id}/status`, { status }),
};
