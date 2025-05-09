import { List, Paper, useMediaQuery } from "@mui/material";
import {
  AttachMoney,
  Favorite,
  AccountBalanceWallet,
} from "@mui/icons-material";
import { useState } from "react";
import NavigationItem from "./navigation/NavigationItem";
import { Link } from "@tanstack/react-router";

export default function Navigation() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const matches = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

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
            selectedIndex={selectedIndex}
            handleListItemClick={handleListItemClick}
            Icon={AccountBalanceWallet}
          />
        )}
        <Link to="/" style={{ textDecoration: "none" }}>
          <NavigationItem
            index={0}
            text="Pick favourites"
            selectedIndex={selectedIndex}
            handleListItemClick={handleListItemClick}
            Icon={AttachMoney}
          />
        </Link>
        <Link to="/manage" style={{ textDecoration: "none" }}>
          <NavigationItem
            index={1}
            text="My cryptocurrencies"
            selectedIndex={selectedIndex}
            handleListItemClick={handleListItemClick}
            Icon={Favorite}
          />
        </Link>
      </List>
    </Paper>
  );
}
