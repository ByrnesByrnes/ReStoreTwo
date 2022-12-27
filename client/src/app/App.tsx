import React, { useState } from "react";
import Catalog from "../features/catalog/catalog";
import { Header } from "../ui";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";


function App() {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);

  const theme = createTheme({
    palette: {
      mode: darkTheme ? "dark" : "light",
      background: { default: darkTheme ? "#121212" : "#eaeaea" }
    }
  });

  const handleThemeChange = () => setDarkTheme(!darkTheme);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header onThemeChange={handleThemeChange} />
        <Container>
          <Catalog />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
