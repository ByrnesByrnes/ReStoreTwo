import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../../app/models/products";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { apiService } from "../../../api-services";
import { Loader, NotFound } from "../../../ui";
import { useStoreContext } from "../../../app/context/store-context";
import { LoadingButton } from "@mui/lab";

export default function ProductDetail() {
	const { basket, setBasket, removeItem } = useStoreContext();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [quantity, setQuantity] = useState<number>(0);
	const [submitting, setSubmitting] = useState<boolean>(false);

	const { id } = useParams<{ id: string; }>();

	const item = basket?.items.find(item => item.productId === product?.id);

	useEffect(() => {
		if (item) setQuantity(item.quantity);

		apiService.Catalog.details(parseInt(id))
			.then((data) => setProduct(data))
			.catch((error) => console.log(error))
			.finally(() => setLoading(false));
	}, [id, item]);

	const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuantity(parseInt(e.target.value));
	};

	const handleUpdateCart = () => {
		setSubmitting(true);

		if (!item || quantity > item.quantity) {
			const updatedQuantity = item ? quantity - item.quantity : quantity;
			apiService.Basket.addItem(product?.id!, updatedQuantity)
				.then((data) => setBasket(data.value))
				.catch((error) => console.log(error))
				.finally(() => setSubmitting(false));
		} else {
			const updatedQuantity = item.quantity - quantity;

			apiService.Basket.removeItem(product?.id!, updatedQuantity)
				.then(() => removeItem(product?.id!, updatedQuantity))
				.catch((error) => console.log(error))
				.finally(() => setSubmitting(false));
		}
	};

	if (loading) return <Loader message="Loading Product..." />;

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
							loading={submitting}
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
