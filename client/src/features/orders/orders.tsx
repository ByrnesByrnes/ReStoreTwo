import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiService } from "../../api-services";
import { Loader } from "../../ui";
import { Order } from "./interfaces";
import * as ROUTES from "../../routes/constants";

const Orders = () => {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        apiService.Orders.list()
            .then((response) => setOrders(response))
            .catch(error => { console.log(error); })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loader message="Loading orders..." />;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Order Number</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Order Date</TableCell>
                        <TableCell align="right">Order Status</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((order) => (
                        <TableRow
                            key={order.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {order.id}
                            </TableCell>
                            <TableCell align="right">{(order.total / 100).toFixed(2)}</TableCell>
                            <TableCell align="right">{order.orderDate.split("T")[0]}</TableCell>
                            <TableCell align="right">{order.orderStatus}</TableCell>
                            <TableCell align="right">
                                <Button component={Link} to={`${ROUTES.ORDERS}${ROUTES.ORDER}/${order.id}`} >View</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Orders;