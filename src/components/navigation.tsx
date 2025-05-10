import { List, Paper, useMediaQuery } from "@mui/material";
import {
  AttachMoney,
  Favorite,
  AccountBalanceWallet,
} from "@mui/icons-material";
import NavigationItem from "./navigation/NavigationItem";
import { Link } from "@tanstack/react-router";

export default function Navigation() {
  const matches = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Paper
      elevation={0}
      sx={{
        width: { md: 240 },
        height: "calc(100vh-135px)",
        background: (theme) =>
          `linear-gradient(90deg, ${theme.palette.primary.main} 0%, #515151 100%)`,
        borderRadius: 0,
        border: (theme) => `1px solid ${theme.palette.primary.main}`,
      }}
    >
      <List component="nav" aria-label="Navigation" disablePadding>
        {matches && (
          <NavigationItem
            text="My walled USD value: $93,200.00"
            Icon={AccountBalanceWallet}
          />
        )}
        <Link to="/" style={{ textDecoration: "none" }}>
          <NavigationItem
            pathname="/"
            text="Pick favourites"
            Icon={AttachMoney}
          />
        </Link>
        <Link to="/manage" style={{ textDecoration: "none" }}>
          <NavigationItem
            pathname="/manage"
            text="My cryptocurrencies"
            Icon={Favorite}
          />
        </Link>
      </List>
    </Paper>
  );
}
