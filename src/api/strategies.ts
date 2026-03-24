import { apiClient } from './client';
import type { TStrategiesResponse, TStrategy } from '@types';

type StrategyPayload = {
  description: string;
  parameters: any;
};

type StrategyUpdatePayload = {
  description?: string;
  parameters?: any;
};

export const getStrategies = async (page: number, limit: number) => {
  const response = await apiClient.get<TStrategiesResponse>('/strategies', {
    params: { page, limit },
  });
  return response.data;
};

export const getStrategy = async (id: number) => {
  const response = await apiClient.get<TStrategy>(`/strategies/${id}`);
  return response.data;
};

export const createStrategy = async (data: StrategyPayload) => {
  const response = await apiClient.post<TStrategy>('/strategies', data);
  return response.data;
};

export const updateStrategy = async (id: number, data: StrategyUpdatePayload) => {
  const response = await apiClient.put<TStrategy>(`/strategies/${id}`, data);
  return response.data;
};

export const deleteStrategy = async (id: number) => {
  await apiClient.delete(`/strategies/${id}`);
};
