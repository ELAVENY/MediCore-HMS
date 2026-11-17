import { useState, useEffect, useCallback } from 'react';
import api from '@/services/api';

/**
 * Generic data fetching hook
 * @param {string} url - API endpoint
 * @param {object} params - Query parameters
 */
export function useFetch(url, params = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const { data: res } = await api.get(url, { params });
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(params)]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Mutation hook for POST/PUT/PATCH/DELETE
 */
export function useMutation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (method, url, body = {}) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api[method](url, body);
      return { success: true, data: data.data, message: data.message };
    } catch (err) {
      const message = err.response?.data?.message || 'Operation failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  return { mutate, loading, error };
}
