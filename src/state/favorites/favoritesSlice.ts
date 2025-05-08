import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
});

export default favoritesSlice.reducer;
