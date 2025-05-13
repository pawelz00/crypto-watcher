import type { UserDataState } from "@/types/slices";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { modifyWallet } = userDataSlice.actions;

export default userDataSlice.reducer;

interface AddToWalletPayload {
  id: string;
  amount: number;
  unit: string;
  comment?: string;
}
