import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Arrows from "../components/main/Arrows";
import Carousel from "../components/main/Carousel";
import data from "../../crypto.json";
import { setItems } from "../state/carousel/carouselSlice";
import { useDispatch } from "react-redux";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setItems(data));
  }, [dispatch]);

  return (
    <Box
      sx={{
        bgcolor: "secondary.main",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        py: 4,
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "primary.contrastText",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "4rem",
        }}
      >
        Pick favourites
      </Typography>
      <Carousel />
      <Arrows />
    </Box>
  );
}
