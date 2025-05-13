import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    headerAppText: {
      fontFamily:
        '"Jersey 10", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 400,
      fontSize: "4rem",
    },
  },
  palette: {
    primary: {
      main: "#332E2E",
      contrastText: "#fff",
    },
    secondary: {
      main: "#5C5C5C",
      contrastText: "#fff",
    },
  },
});

export default theme;
