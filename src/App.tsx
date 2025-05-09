import { Box } from "@mui/material";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import RightPanel from "./components/RightPanel";

function App() {
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
        <RightPanel />
      </Box>
    </>
  );
}

export default App;
