import { createSlice } from "@reduxjs/toolkit";

interface CarouselState {
  activeIndex: number;
  items: any[];
}

const carouselSlice = createSlice({
  name: "carousel",
  initialState: {
    activeIndex: 0,
    items: [],
  } as CarouselState,
  reducers: {
    nextSlide: (state) => {
      state.activeIndex = (state.activeIndex + 1) % state.items.length;
    },
    prevSlide: (state) => {
      state.activeIndex =
        (state.activeIndex - 1 + state.items.length) % state.items.length;
    },
    setItems: (state, action) => {
      state.items = action.payload;
      state.activeIndex = 0;
    },
  },
});

export const { nextSlide, prevSlide, setItems } = carouselSlice.actions;

export default carouselSlice.reducer;
