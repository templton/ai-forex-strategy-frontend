import { apiClient } from './client';
import type { TStrategy, ApiResponse } from '@types';

type StrategyPayload = {
  description: string;
  parameters: any;
};

type StrategyUpdatePayload = {
  description?: string;
  parameters?: any;
};

export const getStrategies = async (page: number, limit: number) => {
  const response = await apiClient.get<ApiResponse<TStrategy[]>>('/strategies', {
    params: { page, limit },
  });
  // API возвращает {success, data: [...], meta: {...}, ...}
  // Возвращаем {strategies: data, meta} для совместимости со slice
  return {
    strategies: response.data.data,
    meta: response.data.meta,
  };
};

export const getStrategy = async (id: number) => {
  const response = await apiClient.get<ApiResponse<TStrategy>>(`/strategies/${id}`);
  return response.data.data;
};

export const createStrategy = async (data: StrategyPayload) => {
  const response = await apiClient.post<ApiResponse<TStrategy>>('/strategies', data);
  return response.data.data;
};

export const updateStrategy = async (id: number, data: StrategyUpdatePayload) => {
  const response = await apiClient.put<ApiResponse<TStrategy>>(`/strategies/${id}`, data);
  return response.data.data;
};

export const deleteStrategy = async (id: number) => {
  await apiClient.delete(`/strategies/${id}`);
};
