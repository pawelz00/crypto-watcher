import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../state/store";
import { nextSlide, prevSlide } from "../../state/carousel/carouselSlice";

export default function Arrows() {
  const { activeIndex, items } = useSelector(
    (state: RootState) => state.carousel
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Box flexDirection={"row"} gap={2} display={"flex"}>
      <IconButton
        size="large"
        onClick={() => dispatch(prevSlide())}
        disabled={activeIndex === 0}
      >
        <ArrowBack
          sx={{
            color: "#fff",
            width: 64,
            height: 64,
          }}
        />
      </IconButton>
      <IconButton
        size="large"
        onClick={() => dispatch(nextSlide())}
        disabled={activeIndex === items.length - 1}
      >
        <ArrowForward
          sx={{
            color: "#fff",
            width: 64,
            height: 64,
          }}
        />
      </IconButton>
    </Box>
  );
}
