import type { CryptoItem, UserDataState } from "@/types/slices";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getInitialData = (): UserDataState => {
  const data = localStorage.getItem("userData");

  try {
    return data
      ? JSON.parse(data)
      : {
          walletId: crypto.randomUUID(),
          walletValue: 0,
          wallet: {},
        };
  } catch {
    return {
      walletId: crypto.randomUUID(),
      walletValue: 0,
      wallet: {},
    };
  }
};

export const recalculateWalletValue = createAsyncThunk(
  "userData/recalculateWalletValue",
  async (_, { dispatch }) => {
    try {
      const response = await fetch("/crypto.json");
      const cryptoData: CryptoItem[] = await response.json();

      const cryptoPrices = Object.fromEntries(
        cryptoData.map((crypto) => [crypto.id, crypto.price])
      );

      dispatch(updateWalletValue(cryptoPrices));

      return cryptoPrices;
    } catch (error) {
      console.error("Failed to fetch crypto data:", error);
      return {};
    }
  }
);

const initialState = getInitialData();

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    modifyWallet: (state, action: PayloadAction<AddToWalletPayload>) => {
      const { id, amount, unit, comment } = action.payload;

      const existingWalletItem = state.wallet[id];

      if (existingWalletItem) {
        existingWalletItem.amount = Number(amount);
        existingWalletItem.unit = unit;
        existingWalletItem.comment = comment;
      } else {
        state.wallet[id] = {
          id,
          amount: Number(amount),
          unit,
          comment,
        };
      }

      localStorage.setItem("userData", JSON.stringify(state));
    },
    updateWalletValue: (
      state,
      action: PayloadAction<Record<string, number>>
    ) => {
      const cryptoPrices = action.payload;
      let totalValue = 0;

      Object.values(state.wallet).forEach((item) => {
        const price = cryptoPrices[item.id] || 0;
        totalValue += item.amount * price;
      });

      state.walletValue = totalValue;
      localStorage.setItem("userData", JSON.stringify(state));
    },
  },
});

export const { modifyWallet, updateWalletValue } = userDataSlice.actions;

export default userDataSlice.reducer;

interface AddToWalletPayload {
  id: string;
  amount: number;
  unit: string;
  comment?: string;
}
