import type { CryptoState } from "@/types/slices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import data from "../../../crypto.json";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { convertToMainUnit } from "@/helpers/convert-crypto-denomination";
import { updateWalletValue } from "../user-data/userDataSlice";

const FAVORITES_KEY = "crypto_favorites";

let priceUpdateInterval: ReturnType<typeof setInterval> | null = null;

export const startPriceUpdates = createAsyncThunk(
  "crypto/startPriceUpdates",
  async (_, { dispatch, getState }) => {
    if (priceUpdateInterval) {
      clearInterval(priceUpdateInterval);
    }
    priceUpdateInterval = setInterval(() => {
      dispatch(increaseValues());

      // Get updated crypto prices after increment
      const state = getState() as RootState;
      const cryptoData = state.crypto;
      const wallet = state.userData.wallet;

      // Create price map for wallet items
      const cryptoPrices: Record<string, number> = {};

      // Calculate new values only for crypto in the wallet
      Object.keys(wallet).forEach((cryptoId) => {
        const crypto = cryptoData.find((item) => item.id === cryptoId);
        const walletItem = wallet[cryptoId];

        if (crypto && walletItem) {
          if (walletItem.unit !== crypto.name) {
            const amountInMainUnit =
              convertToMainUnit(walletItem.amount, cryptoId) || 0;
            cryptoPrices[cryptoId] = crypto.price * amountInMainUnit;
          } else {
            cryptoPrices[cryptoId] = crypto.price * walletItem.amount;
          }
        }
      });

      // Update wallet values with new prices
      dispatch(updateWalletValue(cryptoPrices));
    }, 4000);
  }
);

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
    increaseValues: (state) => {
      state.forEach((crypto) => {
        crypto.price += 50;
      });
    },
  },
});

export const { changeFavoriteState, increaseValues } = cryptoSlice.actions;

export default cryptoSlice.reducer;
