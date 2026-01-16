import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import safetySlice from './slices/safetySlice';
import materialSlice from './slices/materialSlice';
import maintenanceSlice from './slices/maintenanceSlice';
import environmentSlice from './slices/environmentSlice';
import suggestionSlice from './slices/suggestionSlice';
import notificationSlice from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    safety: safetySlice,
    material: materialSlice,
    maintenance: maintenanceSlice,
    environment: environmentSlice,
    suggestions: suggestionSlice,
    notifications: notificationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
