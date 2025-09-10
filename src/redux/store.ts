import { configureStore, combineReducers } from '@reduxjs/toolkit'; // Import combineReducers here
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default: localStorage for web
import { counterReducer } from '../features/counterSlice';
import { dropdownReducer } from '../features/dropdownSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Combine reducers for persistence
const rootReducer = combineReducers({
  counter: counterReducer,
  dropdown: dropdownReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
});

// Create the persistor
export const persistor = persistStore(store);

// Export store types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
