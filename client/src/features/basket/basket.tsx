import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BasketRow, BasketSummary } from "./components";
import * as ROUTES from "../../routes/constants";
import { useAppSelector } from "../../app/store/configure-store";

export default function Basket() {
    const { basket } = useAppSelector(state => state.basket);

    if (!basket) return <Typography variant="h3">Your basket is Empty</Typography>;

    const subtotal = basket.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map((item, i: number) => (
                            <BasketRow key={i} item={item} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <BasketSummary subtotal={subtotal} />
                    <Button variant="contained" component={Link} to={ROUTES.CHECKOUT}>Proceed to Checkout</Button>
                </Grid>
            </Grid>
        </>
    );
}
