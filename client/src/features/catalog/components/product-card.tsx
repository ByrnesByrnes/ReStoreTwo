import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Product } from "../../../app/models";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../routes/constants";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../../app/store/configure-store";
import { addBasketItemAsync } from "../../basket/data/basket-slice";

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    return (
        <Card>
            <CardHeader
                title={product.name}
                titleTypographyProps={{
                    sx: {
                        fontWeight: "bold", color: "primary.main",
                    }
                }}
                avatar={
                    <Avatar
                        sx={{ bgcolor: "secondary.main" }}
                    >
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
            />
            <CardMedia
                sx={{ height: 140, backgroundSize: "contain", bgcolor: "primary.light" }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color="secondary" variant="h5">
                    ${(product.price / 100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton
                    onClick={() => dispatch(addBasketItemAsync({ productId: product.id }))}
                    loading={status === `pendingAddItem-${product.id}`}
                    size="small"
                    variant="contained"
                >
                    Add To Cart
                </LoadingButton>
                <Button component={Link} to={`${ROUTES.CATALOG}/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    );
};


export default ProductCard;