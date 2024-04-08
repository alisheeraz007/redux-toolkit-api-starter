import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./authSlice/AuthSlice";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    auth: AuthSlice,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: () => {
        return [thunk]
    },
});

export { store };