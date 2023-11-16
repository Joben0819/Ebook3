"use client";

import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
  AnyAction,
} from "@reduxjs/toolkit";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { ThunkAction } from "redux-thunk";
import { TypedUseSelectorHook } from "react-redux";
import { useSelector, useDispatch } from "react-redux";

// Import your reducers here
import { GameDataState } from "@/reducers/gameData";
import gameDataSlice from "@/reducers/gameData";
// import { UserDataState } from "@/reducers/userData";
// import userDataSlice from "@/reducers/userData";
import { footerApi } from "@/api-rtk";
// import { withdrawDataState } from "@/reducers/withdrawData";
// import withdrawalDataSlice from "@/reducers/withdrawData";
// import { reportDataState } from "@/reducers/reportData";
// import reportDataSlice from "@/reducers/reportData";

// Define the root state
export interface RootState {
  gameData: GameDataState;
  // userData: UserDataState;
  // withdrawData: withdrawDataState;
  // reportData: reportDataState;
}

const rootReducer = combineReducers({
  gameData: gameDataSlice,
  // userData: userDataSlice,
  [footerApi.reducerPath]: footerApi.reducer,
  // withdrawData: withdrawalDataSlice,
  // reportData: reportDataSlice
});

const persistConfig: PersistConfig<any> = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["persist/PERSIST"],
    },
  }).concat(footerApi.middleware),
  thunk,
];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleware,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, AnyAction>;
export type RootStore = typeof store;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
