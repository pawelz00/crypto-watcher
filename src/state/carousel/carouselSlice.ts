import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const carouselSlice = createSlice({
  name: "carousel",
  initialState: {
    activeIndex: 0,
  },
  reducers: {
    resetActiveIndex: (state) => {
      state.activeIndex = 0;
    },
    nextSlide: (state, action: PayloadAction<number>) => {
      const length = action.payload;
      state.activeIndex = (state.activeIndex + 1) % length;
    },
    prevSlide: (state, action: PayloadAction<number>) => {
      const length = action.payload;
      state.activeIndex = (state.activeIndex - 1 + length) % length;
    },
  },
});

export const { nextSlide, prevSlide, resetActiveIndex } = carouselSlice.actions;

export default carouselSlice.reducer;
