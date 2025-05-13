import { createRootRoute, Outlet } from "@tanstack/react-router";
import Box from "@mui/material/Box";
import Header from "@/components/Header";
import Navigation from "@/components/navigation/Navigation";
import type { AppDispatch } from "@/state/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { startPriceUpdates } from "@/state/crypto/cryptoSlice";

function RootComponent() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(startPriceUpdates());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: "calc(100vh - 135px)",
        }}
      >
        <Navigation />
        <Outlet />
      </Box>
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
