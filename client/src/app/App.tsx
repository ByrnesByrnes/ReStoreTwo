import React, { useEffect, useState } from "react";
import { Header, Loader, NotFound, ServerError } from "../ui";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Route, Switch } from "react-router-dom";
import * as ROUTES from "../routes/constants";
import { ProductDetail, Catalog, About, Contact, Home, Basket, Checkout } from "../features";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "./context/store-context";
import { getCookie } from "./utilities";
import { apiService } from "../api-services";


function App() {
	const { setBasket, basket } = useStoreContext();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {

		if (getCookie("buyerId")) {
			apiService.Basket.get()
				.then((data) => setBasket(data))
				.catch((error) => console.log(error))
				.finally(() => setLoading(false));
		} else {
			setLoading(false);
		}

	}, [setBasket]);

	const [darkTheme, setDarkTheme] = useState<boolean>(false);

	const theme = createTheme({
		palette: {
			mode: darkTheme ? "dark" : "light",
			background: { default: darkTheme ? "#121212" : "#eaeaea" }
		}
	});

	const handleThemeChange = () => setDarkTheme(!darkTheme);

	if (loading) return <Loader message="Initializing App..." />;

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
						<Route path={ROUTES.BASKET} component={Basket} />
						<Route path={ROUTES.CHECKOUT} component={Checkout} />
						<Route path={ROUTES.SERVER_ERROR} component={ServerError} />
						<Route component={NotFound} />
					</Switch>
				</Container>
			</ThemeProvider>
		</>
	);
}

export default App;
