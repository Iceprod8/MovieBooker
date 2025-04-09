import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff9100",
    },
    secondary: {
      main: "#00b0ff",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
    h5: {
      fontWeight: 600,
      letterSpacing: "0.5px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: "bold",
        },
      },
    },
  },
});

export default theme;
