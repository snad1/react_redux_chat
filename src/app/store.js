import persistedReducer from "./reducer";
import {applyMiddleware, createStore} from "@reduxjs/toolkit";
import {createStateSyncMiddleware} from "redux-state-sync";


const store = createStore(
    persistedReducer,
    { messages: [] },
    applyMiddleware(
        createStateSyncMiddleware({
            blacklist: ["persist/PERSIST", "persist/REHYDRATE"],
        })
    )
);

export default store;
