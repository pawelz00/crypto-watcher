import type { CryptoState } from "@/types/slices";
import { createSlice } from "@reduxjs/toolkit";
import data from "../../../crypto.json";
import type { PayloadAction } from "@reduxjs/toolkit";

const FAVORITES_KEY = "crypto_favorites";

const loadFavoritesFromStorage = (): string[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load favorites from localStorage:", error);
    return [];
  }
};

const saveFavoritesToStorage = (favorites: string[]) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("Failed to save favorites to localStorage:", error);
  }
};

const favorites = loadFavoritesFromStorage();

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: data.map((item) => ({
    ...item,
    isFavorite: favorites.includes(item.id),
  })) as CryptoState,
  reducers: {
    setItems: (state, action: PayloadAction<CryptoState>) => {
      state = action.payload;
    },
    changeFavoriteState: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const item = state.find((item) => item.id === id);
      if (item) {
        item.isFavorite = !item.isFavorite;

        const favorites = state
          .filter((item) => item.isFavorite)
          .map((item) => item.id);
        saveFavoritesToStorage(favorites);
      }
    },
  },
});

export const { setItems, changeFavoriteState } = cryptoSlice.actions;

export default cryptoSlice.reducer;
