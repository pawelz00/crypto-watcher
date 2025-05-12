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
          wallet: [],
        };
  } catch {
    return {
      walletId: crypto.randomUUID(),
      walletValue: 0,
      wallet: [],
    };
  }
};

const initialState = getInitialData();

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
});

export const {} = userDataSlice.actions;

export default userDataSlice.reducer;
