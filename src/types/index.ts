export type TStrategy = {
  id: number;
  description: string;
  parameters: any;
  version: number;
  created_at: string;
  updated_at: string;
};

export type TStrategiesResponse = {
  data: TStrategy[];
  meta: {
    current_page: number;
    last_page: number;
    total: number;
  };
};
