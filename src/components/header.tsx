import { Typography, Box, useMediaQuery } from "@mui/material";

export default function Header() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <Box
      component={"header"}
      px={4}
      gap={4}
      bgcolor={"primary.main"}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: { xs: "center", md: "space-between" },
        alignItems: "center",
        height: 135,
        textAlign: { xs: "center", md: "match-parent" },
      }}
    >
      <Typography
        variant="headerAppText"
        component={"h1"}
        sx={{
          color: "primary.contrastText",
        }}
      >
        CryptoWatcher
      </Typography>
      {matches && (
        <Typography variant="body1" sx={{ color: "primary.contrastText" }}>
          My walled USD value: $93,200.00
        </Typography>
      )}
    </Box>
  );
}
