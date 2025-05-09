import { Box, Typography } from "@mui/material";
import Arrows from "./main/Arrows";
import Carousel from "./main/Carousel";

export default function RightPanel() {
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
