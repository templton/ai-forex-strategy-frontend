export type TStrategy = {
  id: number;
  description: string;
  parameters: any;
  version: number;
  createdAt: string;
  updatedAt: string;
};

export type TStrategiesMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  meta?: TStrategiesMeta;
  message: string;
  errors: any[];
};

export interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_TIMEOUT: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
