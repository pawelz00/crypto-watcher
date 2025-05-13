import type { FormData } from "@/components/main/Form";
import { convertToMainUnit } from "@/helpers/convert-crypto-denomination";
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

export const recalculateSingleCrypto = createAsyncThunk(
  "userData/recalculateSingleCrypto",
  async (data: FormData, { dispatch }) => {
    try {
      const { id, amount } = data;
      const response = await fetch("/crypto.json");
      const cryptoData: CryptoItem[] = await response.json();
      let price = 0;

      const crypto = cryptoData.find((item) => item.id === id);

      if (!crypto) {
        throw new Error(`Crypto with id ${id} not found`);
      }

      if (data.unit !== crypto.name) {
        const amountDenomination = convertToMainUnit(amount, id) || 0;
        price = crypto.price * amountDenomination;
      } else {
        price = crypto.price * amount;
      }

      const cryptoPrices = { [id]: price };
      dispatch(updateWalletValue(cryptoPrices));

      return cryptoPrices;
    } catch (error) {
      console.error(`Failed to fetch crypto data for ${data.id}:`, error);
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

      Object.entries(cryptoPrices).forEach(([cryptoId, price]) => {
        const walletItem = state.wallet[cryptoId];

        if (walletItem) {
          const cryptoValue = price;

          if (walletItem.currentValue !== undefined) {
            state.walletValue =
              state.walletValue - walletItem.currentValue + cryptoValue;
          } else {
            state.walletValue = state.walletValue + cryptoValue;
          }

          walletItem.currentValue = cryptoValue;
        }
      });

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
  currentValue?: number;
}
