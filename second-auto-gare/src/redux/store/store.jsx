import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import loginslice from "../loginslice/loginslice";
import vehicleslice from "../vehicleslice/vehicleslice";
import userslice from "../userslice/userslice";
import commentSlice from "../commentslice/commentslice";
import bookingslice from "../booking/bookingslice";
const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["login"],
  blacklist: ["vehicle", "user", "comment","booking"],
};

// Apply persist configuration only to the login slice
const persistedLoginReducer = persistReducer(persistConfig, loginslice);

const rootReducer = combineReducers({
  login: persistedLoginReducer,
  user: userslice,
  vehicle: vehicleslice,
  comment: commentSlice,
  booking: bookingslice,
});

const store = configureStore({
  reducer: rootReducer,
});

const persist = persistStore(store);

export { store, persist };
