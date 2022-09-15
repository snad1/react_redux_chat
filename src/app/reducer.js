import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_MESSAGE":
            return { ...state, messages: [...state.messages,action.payload] };
        default:
            return state;
    }
};

const persistConfig = {
    key: "root",
    storage,
};

export default persistReducer(persistConfig, reducer);