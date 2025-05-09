import { Box, Typography } from "@mui/material";
import Card from "./main/Card";

export default function RightPanel() {
  return (
    <Box
      sx={{
        bgcolor: "secondary.main",
        flex: 1,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "primary.contrastText",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "4rem",
          padding: 4,
        }}
      >
        Pick favourites
      </Typography>
      <Card />
    </Box>
  );
}
