import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { Loader, NotFound } from "../../../ui";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../../app/store/configure-store";
import { addBasketItemAsync, removeBasketItemAsync } from "../../basket/data/basket-slice";
import { fetchProductAsync, productSelectors } from "../data/catalog-slice";

export default function ProductDetail() {
	const { basket, status } = useAppSelector(state => state.basket);
	const { status: productState } = useAppSelector(state => state.catalog);
	
	const dispatch = useAppDispatch();

	const { id } = useParams<{ id: string; }>();
	const product = useAppSelector(state => productSelectors.selectById(state, id));
	const [quantity, setQuantity] = useState<number>(0);

	const item = basket?.items.find(item => item.productId === product?.id);

	useEffect(() => {
		if (item) setQuantity(item.quantity);

		if (!product) dispatch(fetchProductAsync(parseInt(id)));

	}, [id, item, dispatch, product]);

	const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuantity(parseInt(e.target.value));
	};

	const handleUpdateCart = () => {

		if (!item || quantity > item.quantity) {
			const updatedQuantity = item ? quantity - item.quantity : quantity;
			dispatch(addBasketItemAsync({ productId: product?.id!, quantity: updatedQuantity }));
		} else {
			const updatedQuantity = item.quantity - quantity;
			dispatch(removeBasketItemAsync({ productId: product?.id!, quantity: updatedQuantity }));
		}
	};

	if (productState.includes("pending")) return <Loader message="Loading Product..." />;

	if (!product) return <NotFound />;

	return (
		<Grid container spacing={6}>
			<Grid item xs={6}>
				<img src={product.pictureUrl} alt={product.name} style={{ width: "100%" }} />
			</Grid>
			<Grid item xs={6}>
				<Typography variant="h3">{product.name}</Typography>
				<Divider sx={{ mb: 2 }} />
				<Typography variant="h4" color="secondary">{(product.price / 100).toFixed(2)}</Typography>
				<TableContainer>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>{product.name}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Description</TableCell>
								<TableCell>{product.name}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Type</TableCell>
								<TableCell>{product.type}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Brand</TableCell>
								<TableCell>{product.brand}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Quantity</TableCell>
								<TableCell>{product.quantityInStock}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							variant="outlined"
							type="number"
							label="Quantity in Cart"
							fullWidth
							value={quantity >= 0 ? quantity : ""}
							onChange={handleQuantityChange}
							InputProps={{
								inputProps: { min: 0 }
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<LoadingButton
							disabled={(item?.quantity === quantity) || (Number.isNaN(quantity)) || (!item && quantity === 0)}
							loading={status.includes("pending")}
							onClick={handleUpdateCart}
							sx={{ height: "55px" }}
							color="primary"
							size="large"
							variant="contained"
							fullWidth
						>
							{item ? "Update Quantity" : "Add to Cart"}
						</LoadingButton>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}
