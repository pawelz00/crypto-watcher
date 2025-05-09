import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

export default function Arrows() {
  return (
    <Box flexDirection={"row"} gap={2} display={"flex"}>
      <IconButton size="large">
        <ArrowBack
          sx={{
            color: "#fff",
            width: 64,
            height: 64,
          }}
        />
      </IconButton>
      <IconButton size="large">
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
