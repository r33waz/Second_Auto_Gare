import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import loginslice from "../src/pages/auth/loginslice";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "persist-store",
  storage,
};

const Persistedreducer = persistReducer(persistConfig, loginslice);
const store = configureStore({
  reducer: {
    user: Persistedreducer,
  },
});

const persist = persistStore(store);
export { store, persist };
