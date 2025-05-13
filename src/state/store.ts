import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./crypto/cryptoSlice";
import userDataReducer from "./user-data/userDataSlice";
import carouselReducer from "./carousel/carouselSlice";

export const store = configureStore({
  reducer: {
    carousel: carouselReducer,
    crypto: cryptoReducer,
    userData: userDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
