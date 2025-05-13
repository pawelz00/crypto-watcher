import { formatMoney } from "@/helpers/formatter";
import type { RootState } from "@/state/store";
import { Typography, Box, useMediaQuery } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";

export default function Header() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const { walletValue } = useSelector((state: RootState) => state.userData);
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
      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography
          variant="headerAppText"
          component={"h1"}
          sx={{
            color: "primary.contrastText",
          }}
        >
          CryptoWatcher
        </Typography>
      </Link>
      {matches && (
        <Typography variant="body1" sx={{ color: "primary.contrastText" }}>
          My walled USD value: ${formatMoney(walletValue)}
        </Typography>
      )}
    </Box>
  );
}
