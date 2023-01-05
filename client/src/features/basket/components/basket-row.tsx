import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableRow, TableCell, Box } from "@mui/material";
import React from 'react';
import { useAppDispatch, useAppSelector } from "../../../app/store/configure-store";
import { removeBasketItemAsync, addBasketItemAsync } from "../data/basket-slice";
import { BasketItem } from "../interfaces";

interface Props {
    item: BasketItem;
}

const BasketRow: React.FC<Props> = ({ item }) => {
    const { status } = useAppSelector(state => state.basket);

    const dispatch = useAppDispatch();

    return (
        <TableRow
            key={item.productId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                <Box display="flex" alignItems="center">
                    <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 16 }} />
                    {item.name}
                </Box>
            </TableCell>
            <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
            <TableCell align="center">
                <LoadingButton
                    loading={status === `pendingRemoveItem-${item.productId}-minus`}
                    color="error"
                    onClick={() => dispatch(removeBasketItemAsync({ productId: item?.productId, quantity: 1, name: "minus" }))}
                >
                    <Remove />
                </LoadingButton>
                {item.quantity}
                <LoadingButton
                    loading={status === `pendingAddItem-${item.productId}`}
                    color="secondary"
                    onClick={() => dispatch(addBasketItemAsync({ productId: item.productId }))}
                >
                    <Add />
                </LoadingButton>
            </TableCell>
            <TableCell align="right">{((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
            <TableCell align="right">
                <LoadingButton
                    loading={status === `pendingRemoveItem-${item.productId}-delete`}
                    onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: item.quantity, name: "delete" }))}
                    color="error"
                >
                    <Delete />
                </LoadingButton>
            </TableCell>
        </TableRow>
    );
};

export default BasketRow;