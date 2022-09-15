import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

import {
    createStateSyncMiddleware,
    initMessageListener,
} from "redux-state-sync";

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_MESSAGE":
            return { ...state, message: [...state.message,action.payload] };
        default:
            return state;
    }
};

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
    persistedReducer,
    { message: [] },
    applyMiddleware(
        createStateSyncMiddleware({
            blacklist: ["persist/PERSIST", "persist/REHYDRATE"],
        })
    )
);

initMessageListener(store);

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
