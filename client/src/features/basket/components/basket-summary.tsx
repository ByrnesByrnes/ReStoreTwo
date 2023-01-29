import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useAppSelector } from "../../../app/store/configure-store";

const BasketSummary: React.FC = () => {
    const { basket } = useAppSelector(state => state.basket);

    let subtotal = 0;

    if (basket !== undefined) {
        subtotal = basket.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    const deliveryFee = subtotal > 10000 ? 0 : 500;

    return (
        <TableContainer component={Paper} variant="outlined">
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">${(subtotal / 100).toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Delivery fee*</TableCell>
                        <TableCell align="right">{deliveryFee === 0 ? "----" : `$${(deliveryFee / 100).toFixed(2)}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">${((subtotal + deliveryFee) / 100).toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <span style={{ fontStyle: "italic" }}>*Orders over $100 qualify for free delivery</span>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BasketSummary;
