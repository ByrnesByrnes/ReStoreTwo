import React, { useState } from "react";
import { Header, NotFound, ServerError } from "../ui";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Route, Switch } from "react-router-dom";
import * as ROUTES from "../routes/constants";
import { ProductDetail, Catalog, About, Contact, Home } from "../features";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
        <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
        <CssBaseline />
        <Header onThemeChange={handleThemeChange} />
        <Container>
          <Switch>
            <Route exact path={ROUTES.HOME} component={Home} />
            <Route exact path={ROUTES.CATALOG} component={Catalog} />
            <Route path={`${ROUTES.CATALOG}/:id`} component={ProductDetail} />
            <Route path={ROUTES.ABOUT} component={About} />
            <Route path={ROUTES.CONTACT} component={Contact} />
            <Route path={ROUTES.SERVER_ERROR} component={ServerError} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
