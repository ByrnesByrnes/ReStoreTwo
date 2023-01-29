import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BasketSummary, BasketTable } from "./components";
import * as ROUTES from "../../routes/constants";
import { useAppSelector } from "../../app/store/configure-store";

export default function Basket() {
    const { basket } = useAppSelector(state => state.basket);

    if (!basket) return <Typography variant="h3">Your basket is Empty</Typography>;

    return (
        <>
            <BasketTable items={basket.items} isBasket />
            <Grid container>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <BasketSummary />
                    <Button variant="contained" component={Link} to={ROUTES.CHECKOUT}>Proceed to Checkout</Button>
                </Grid>
            </Grid>
        </>
    );
}
