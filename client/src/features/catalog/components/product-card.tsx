import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";
import { Product } from "../../../app/models/products";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../routes/constants";
import { apiService } from "../../../api-services";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../../app/context/store-context";

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setBasket } = useStoreContext();

    const handleAddItem = (productId: number) => {
        setLoading(true);

        apiService.Basket.addItem(productId)
            .then((data) => setBasket(data.value))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    };

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
                    onClick={() => handleAddItem(product.id)}
                    loading={loading}
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