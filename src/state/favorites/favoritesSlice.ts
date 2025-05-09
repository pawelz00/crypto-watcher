import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface FavoritesState {
  value: string[];
}

const getInitialFavorites = (): string[] => {
  const data = localStorage.getItem("favoriteCryptos");
  try {
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState: FavoritesState = { value: getInitialFavorites() };

const favoritesSlice = createSlice({
  name: "favoriteCryptos",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<string>) => {
      const newFavorites = [...state.value, action.payload];
      localStorage.setItem("favoriteCryptos", JSON.stringify(newFavorites));
      state.value = newFavorites;
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const newFavorites = state.value.filter(
        (item) => item !== action.payload
      );
      localStorage.setItem("favoriteCryptos", JSON.stringify(newFavorites));
      state.value = newFavorites;
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
