import api from './api';

export const billingService = {
  getAll: (params) => api.get('/billing', { params }),
  getById: (id) => api.get(`/billing/${id}`),
  create: (data) => api.post('/billing', data),
  recordPayment: (id, data) => api.patch(`/billing/${id}/payment`, data),
  getRevenueSummary: () => api.get('/billing/summary/revenue'),
};
