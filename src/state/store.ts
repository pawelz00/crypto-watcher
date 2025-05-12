import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favorites/favoritesSlice";
import carouselReducer from "./carousel/carouselSlice";
import userDataReducer from "./user-data/userDataSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    carousel: carouselReducer,
    userData: userDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
