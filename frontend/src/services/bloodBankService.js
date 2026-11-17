import api from './api';

export const bloodBankService = {
  getAll: (params) => api.get('/blood-bank', { params }),
  getStock: () => api.get('/blood-bank/stock'),
  registerDonor: (data) => api.post('/blood-bank', data),
  updateDonor: (id, data) => api.put(`/blood-bank/${id}`, data),
};
