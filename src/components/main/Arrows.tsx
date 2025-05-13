import { ArrowBack, ArrowForward } from "@mui/icons-material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { nextSlide, prevSlide } from "@/state/carousel/carouselSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/state/store";

type ArrowsProps = {
  isFirstSlide: boolean;
  isLastSlide: boolean;
  numberOfSlides: number;
};

export default function Arrows({
  isFirstSlide,
  isLastSlide,
  numberOfSlides,
}: ArrowsProps) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Box flexDirection={"row"} gap={2} display={"flex"}>
      <IconButton
        size="large"
        onClick={() => dispatch(prevSlide(numberOfSlides))}
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
        onClick={() => dispatch(nextSlide(numberOfSlides))}
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
