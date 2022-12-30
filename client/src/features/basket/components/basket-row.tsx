import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableRow, TableCell, Box } from "@mui/material";
import React, { useState } from 'react';
import { apiService } from "../../../api-services";
import { useStoreContext } from "../../../app/context/store-context";
import { BasketItem } from "../interfaces";

enum IncrementLoad {
    Add = "add",
    Decrease = "decrease",
    Remove = "remove",
    None = ""
};

interface Props {
    item: BasketItem;
}

const BasketRow: React.FC<Props> = ({ item }) => {
    const [loading, setLoading] = useState<IncrementLoad>(IncrementLoad.None);
    const { setBasket, removeItem } = useStoreContext();

    const handleAddOne = (productId: number) => {
        setLoading(IncrementLoad.Add);
        apiService.Basket.addItem(productId)
            .then((data) => setBasket(data.value))
            .catch((error) => console.log(error))
            .finally(() => setLoading(IncrementLoad.None));
    };

    const handleRemoveOne = (productId: number, quantity = 1, loadType = IncrementLoad.Decrease) => {

        if (loadType === IncrementLoad.Remove) {
            setLoading(IncrementLoad.Remove);
        } else {
            setLoading(IncrementLoad.Decrease);
        }

        apiService.Basket.removeItem(productId)
            .then(() => removeItem(productId, 1))
            .catch((error) => console.log(error))
            .finally(() => setLoading(IncrementLoad.None));
    };

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
                    disabled={loading === IncrementLoad.Remove}
                    loading={loading === IncrementLoad.Decrease}
                    color="error"
                    onClick={() => handleRemoveOne(item.productId)}
                >
                    <Remove />
                </LoadingButton>
                {item.quantity}
                <LoadingButton
                    loading={loading === IncrementLoad.Add}
                    color="secondary"
                    onClick={() => handleAddOne(item.productId)}
                >
                    <Add />
                </LoadingButton>
            </TableCell>
            <TableCell align="right">{((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
            <TableCell align="right">
                <LoadingButton
                    disabled={loading === IncrementLoad.Decrease}
                    loading={loading === IncrementLoad.Remove}
                    onClick={() => handleRemoveOne(item.productId, item.quantity, IncrementLoad.Remove)}
                    color="error"
                >
                    <Delete />
                </LoadingButton>
            </TableCell>
        </TableRow>
    );
};

export default BasketRow;