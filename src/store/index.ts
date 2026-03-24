import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';

const rootReducer = combineReducers({
  app: appReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
