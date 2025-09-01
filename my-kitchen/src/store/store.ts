// src/store/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "./storage";

import tableReducer from "./slices/tableSlice";
import orderReducer from "./slices/orderSlice";
import billReducer from "./slices/billSlice";
import revenueReducer from "./slices/revenueSlice";

const rootReducer = combineReducers({
  tables: tableReducer,
  orders: orderReducer,
  bills: billReducer,
  revenue: revenueReducer,
});

const persistConfig = { key: "root", storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
