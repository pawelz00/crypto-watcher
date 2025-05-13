import { createFileRoute } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Arrows from "@/components/main/Arrows";
import Carousel from "@/components/main/Carousel";

export const Route = createFileRoute("/manage")({
  component: Manage,
});

function Manage() {
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
        My cryptocurrencies
      </Typography>
      <Carousel withForm onlyFavorites />
      <Arrows />
    </Box>
  );
}
