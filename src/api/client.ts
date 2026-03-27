import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT, 10) || 30000;

export const apiClient = axios.create({
  baseURL: `${API_URL}/api/v1`,
  timeout: API_TIMEOUT,
});
