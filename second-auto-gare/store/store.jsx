import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import loginslice from "../src/slice/loginslice";
import vehicleslice from "../src/slice/vehicleslice";

const persistConfig = {
  key: "persist-store",
  storage,
};

// Combine multiple reducers into a single reducer
const rootReducer = combineReducers({
  user: persistReducer(persistConfig, loginslice),
  vehicle: persistReducer(persistConfig, vehicleslice),
});

const store = configureStore({
  reducer: rootReducer,
});

const persist = persistStore(store);

export { store, persist };
