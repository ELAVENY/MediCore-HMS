import api from './api';

export const pharmacyService = {
  getAll: (params) => api.get('/pharmacy', { params }),
  getById: (id) => api.get(`/pharmacy/${id}`),
  create: (data) => api.post('/pharmacy', data),
  update: (id, data) => api.put(`/pharmacy/${id}`, data),
  dispense: (id, quantity) => api.patch(`/pharmacy/${id}/dispense`, { quantity }),
  getLowStock: () => api.get('/pharmacy/alerts/low-stock'),
};
