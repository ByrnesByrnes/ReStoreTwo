import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiService } from "../../../api-services";
import { Loader } from "../../../ui";
import { Order as OrderType } from "../interfaces";
import { OrderSummary } from "./components";
import * as ROUTES from "../../../routes/constants";

const Order = () => {
    const [order, setOrder] = useState<OrderType | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const { id } = useParams<any>();

    let subtotal = 0;

    if (order !== undefined) {
        subtotal = order.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    useEffect(() => {
        apiService.Orders.fetchOrder(parseInt(id))
            .then((order) => setOrder(order))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Loader message={`Loading Order Number ${id}`} />;

    return (
        <>
            <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h3">Order Number {order?.id}</Typography>
                <Button variant="contained" component={Link} to={ROUTES.ORDERS}>Back to Orders</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order?.orderItems.map(item => (
                            <TableRow
                                key={item.productId}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box display="flex" alignItems="center">
                                        <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 16 }} />
                                        {item.name}
                                    </Box>
                                </TableCell>
                                <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                                <TableCell align="center">{item.quantity}</TableCell>
                                <TableCell align="right">{((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <OrderSummary subtotal={subtotal} />
                </Grid>
            </Grid>
        </>
    );
};

export default Order;
