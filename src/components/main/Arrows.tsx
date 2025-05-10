import { ArrowBack, ArrowForward } from "@mui/icons-material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { nextSlide, prevSlide } from "../../state/carousel/carouselSlice";
import type { AppDispatch, RootState } from "../../state/store";

export default function Arrows() {
  const { activeIndex, items } = useSelector(
    (state: RootState) => state.carousel
  );
  const dispatch = useDispatch<AppDispatch>();
  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex === items.length - 1;

  return (
    <Box flexDirection={"row"} gap={2} display={"flex"}>
      <IconButton
        size="large"
        onClick={() => dispatch(prevSlide())}
        disabled={isFirstSlide}
      >
        <ArrowBack
          sx={{
            color: "#eee",
            stroke: "#fff",
            strokeWidth: 0.1,
            width: 64,
            height: 64,
            filter: "drop-shadow(1px 1px 4px rgba(0,0,0,0.5))",
            opacity: isFirstSlide ? 0.3 : 1,
          }}
        />
      </IconButton>
      <IconButton
        size="large"
        onClick={() => dispatch(nextSlide())}
        disabled={isLastSlide}
      >
        <ArrowForward
          sx={{
            color: "#eee",
            stroke: "#fff",
            strokeWidth: 0.1,
            width: 64,
            height: 64,
            filter: "drop-shadow(1px 1px 4px rgba(0,0,0,0.5))",
            opacity: isLastSlide ? 0.3 : 1,
          }}
        />
      </IconButton>
    </Box>
  );
}
