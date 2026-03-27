import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import * as strategyApi from '@api/strategies';
import type { TStrategy } from '@types';

type StrategyState = {
  items: TStrategy[];
  currentStrategy: TStrategy | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    total: number;
    lastPage: number;
  };
};

const initialState: StrategyState = {
  items: [],
  currentStrategy: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    total: 0,
    lastPage: 1,
  },
};

const toErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error';
};

export const fetchStrategies = createAsyncThunk(
  'strategy/fetchStrategies',
  async ({ page, limit }: { page: number; limit: number }, { rejectWithValue }) => {
    try {
      return await strategyApi.getStrategies(page, limit);
    } catch (error) {
      return rejectWithValue(toErrorMessage(error));
    }
  },
);

export const fetchStrategy = createAsyncThunk(
  'strategy/fetchStrategy',
  async (id: number, { rejectWithValue }) => {
    try {
      return await strategyApi.getStrategy(id);
    } catch (error) {
      return rejectWithValue(toErrorMessage(error));
    }
  },
);

export const createStrategy = createAsyncThunk(
  'strategy/createStrategy',
  async (payload: { description: string; parameters: any }, { rejectWithValue }) => {
    try {
      return await strategyApi.createStrategy(payload);
    } catch (error) {
      return rejectWithValue(toErrorMessage(error));
    }
  },
);

export const updateStrategy = createAsyncThunk(
  'strategy/updateStrategy',
  async (
    { id, data }: { id: number; data: { description?: string; parameters?: any } },
    { rejectWithValue },
  ) => {
    try {
      return await strategyApi.updateStrategy(id, data);
    } catch (error) {
      return rejectWithValue(toErrorMessage(error));
    }
  },
);

export const deleteStrategy = createAsyncThunk(
  'strategy/deleteStrategy',
  async (id: number, { rejectWithValue }) => {
    try {
      await strategyApi.deleteStrategy(id);
      return id;
    } catch (error) {
      return rejectWithValue(toErrorMessage(error));
    }
  },
);

const strategySlice = createSlice({
  name: 'strategy',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearCurrent: (state) => {
      state.currentStrategy = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStrategies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStrategies.fulfilled, (state, action) => {
        console.log('fetchStrategies.fulfilled payload:', action.payload);
        state.loading = false;
        state.items = action.payload.strategies;
        if (action.payload.meta) {
          state.pagination = {
            page: action.payload.meta.current_page,
            total: action.payload.meta.total,
            lastPage: action.payload.meta.last_page,
          };
        }
      })
      .addCase(fetchStrategies.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Failed to load strategies';
      })
      .addCase(fetchStrategy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStrategy.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStrategy = action.payload;
      })
      .addCase(fetchStrategy.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Failed to load strategy';
        state.currentStrategy = null;
      })
      .addCase(createStrategy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStrategy.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createStrategy.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Failed to create strategy';
      })
      .addCase(updateStrategy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStrategy.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStrategy = action.payload;
        state.items = state.items.map((item) => (item.id === action.payload.id ? action.payload : item));
      })
      .addCase(updateStrategy.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Failed to update strategy';
      })
      .addCase(deleteStrategy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStrategy.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteStrategy.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Failed to delete strategy';
      });
  },
});

export const { setLoading, setError, clearCurrent } = strategySlice.actions;
export default strategySlice.reducer;
