import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import User from './reducers/User';
import Watch from './reducers/Watch';
import Category from './reducers/Category';
import Comment from './reducers/Comment';
import Video from './reducers/Video';
import Index from './reducers/Index';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
  User,
  Watch,
  Category,
  Comment,
  Video,
  Index
}));

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);