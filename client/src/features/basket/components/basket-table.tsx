import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableRow, TableCell, Box, Paper, Table, TableBody, TableContainer, TableHead } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/configure-store";
import { removeBasketItemAsync, addBasketItemAsync } from "../data/basket-slice";
import { BasketItem } from "../interfaces";

interface Props {
    items: BasketItem[];
    isBasket?: boolean;
}

const BasketTable: React.FC<Props> = ({ items, isBasket }) => {
    const { status } = useAppSelector(state => state.basket);

    const dispatch = useAppDispatch();

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        {isBasket && <TableCell align="right"></TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(item => (
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
                            <TableCell align="center">
                                {isBasket &&
                                    <LoadingButton
                                        loading={status === `pendingRemoveItem-${item.productId}-minus`}
                                        color="error"
                                        onClick={() => dispatch(removeBasketItemAsync({ productId: item?.productId, quantity: 1, name: "minus" }))}
                                    >
                                        <Remove />
                                    </LoadingButton>
                                }
                                {item.quantity}
                                {isBasket &&
                                    <LoadingButton
                                        loading={status === `pendingAddItem-${item.productId}`}
                                        color="secondary"
                                        onClick={() => dispatch(addBasketItemAsync({ productId: item.productId }))}
                                    >
                                        <Add />
                                    </LoadingButton>
                                }
                            </TableCell>
                            <TableCell align="right">{((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                            {isBasket &&
                                <TableCell align="right">
                                    <LoadingButton
                                        loading={status === `pendingRemoveItem-${item.productId}-delete`}
                                        onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: item.quantity, name: "delete" }))}
                                        color="error"
                                    >
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BasketTable;