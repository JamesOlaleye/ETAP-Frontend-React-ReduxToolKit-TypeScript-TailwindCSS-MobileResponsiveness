import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer, { AuthState } from '../features/authSlice';
import userReducer, { UserState } from '../features/userSlice';
import subjectReducer, { SubjectState } from '../features/subjectSlice';
import topicReducer, { TopicState } from '../features/topicSlice';
import progressReducer, { ProgressState } from '../features/progressSlice';

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

const authPersistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
    user: userReducer,
    subject: subjectReducer,
    topic: topicReducer,
    progress: progressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Define the overall state type for the store
// export type RootState = ReturnType<typeof store.getState>;
export type RootState = {
  auth: AuthState;
  user: UserState;
  subject: SubjectState;
  topic: TopicState;
  progress: ProgressState;
};

// Export the dispatch type for usage in components
export type AppDispatch = typeof store.dispatch;
