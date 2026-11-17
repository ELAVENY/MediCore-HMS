import api from './api';

export const reportsService = {
  getMonthlyTrend: () => api.get('/reports/monthly-trend'),
  getDepartmentStats: () => api.get('/reports/department-stats'),
  getSummary: () => api.get('/reports/summary'),
};
