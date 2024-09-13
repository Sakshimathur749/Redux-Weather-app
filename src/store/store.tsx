import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from './slice/weatherSlice';

export const store = configureStore({
  reducer: {
        weather: weatherSlice,
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;