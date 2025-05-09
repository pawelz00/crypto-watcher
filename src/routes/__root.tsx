import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "../components/Header";
import { Box } from "@mui/material";
import Navigation from "../components/Navigation";

export const Route = createRootRoute({
  component: () => (
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
      <TanStackRouterDevtools />
    </>
  ),
});
