import { createFileRoute } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Carousel from "@/components/main/Carousel";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
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
        gap: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "primary.contrastText",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
        }}
      >
        Pick favourites
      </Typography>
      <Carousel />
    </Box>
  );
}
