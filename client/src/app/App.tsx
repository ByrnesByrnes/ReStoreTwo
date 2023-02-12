import React, { useCallback, useEffect, useState } from "react";
import { Header, Loader, NotFound, ServerError } from "../ui";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Route, Switch } from "react-router-dom";
import * as ROUTES from "../routes/constants";
import { ProductDetail, Catalog, About, Contact, Home, Basket, CheckoutWrapper, Login, Register, Orders, Order } from "../features";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "./store/configure-store";
import { fetchBasketAsync } from "../features/basket/data/basket-slice";
import { fetchCurrentUser } from "../features/account/data/account-slice";
import { PrivateRoute } from "../routes";
import "./styles/styles.scss";

function App() {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState<boolean>(true);

	const initApp = useCallback(async () => {
		try {
			await dispatch(fetchCurrentUser());
			await dispatch(fetchBasketAsync());
		} catch (error) {
			console.log(error);
		}

	}, [dispatch]);


	useEffect(() => {
		initApp().then(() => setLoading(false));
	}, [initApp]);

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
		<ThemeProvider theme={theme}>
			<ToastContainer position="bottom-right" hideProgressBar theme="colored" />
			<CssBaseline />
			<Header onThemeChange={handleThemeChange} />

			<Route exact path={ROUTES.HOME} component={Home} />

			<Route path={"/(.+)"} render={() => (
				<Container sx={{ mt: 4 }}>
					<Switch>
						<Route exact path={ROUTES.CATALOG} component={Catalog} />
						<Route path={`${ROUTES.CATALOG}/:id`} component={ProductDetail} />
						<Route path={ROUTES.ABOUT} component={About} />
						<Route path={ROUTES.CONTACT} component={Contact} />
						<Route path={ROUTES.BASKET} component={Basket} />
						<PrivateRoute path={ROUTES.CHECKOUT} component={CheckoutWrapper} />
						<PrivateRoute exact path={ROUTES.ORDERS} component={Orders} />
						<PrivateRoute path={`${ROUTES.ORDERS}${ROUTES.ORDER}/:id`} component={Order} />
						<Route path={ROUTES.SERVER_ERROR} component={ServerError} />
						<Route path={ROUTES.LOGIN} component={Login} />
						<Route path={ROUTES.REGISTER} component={Register} />
						<Route component={NotFound} />
					</Switch>
				</Container>
			)} />
		</ThemeProvider>
	);
}

export default App;
