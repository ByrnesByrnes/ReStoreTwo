import { Grid } from "@mui/material";
import React from "react";
import { Product } from "../../../app/models/products";
import { ProductCard } from "./";

interface Props {
    products: Product[];
}

const ProductList: React.FC<Props> = ({ products }) => {

    return (
        <Grid container spacing={4}>
            {products.map((product) =>
                <Grid item key={product.id} xs={3}>
                    <ProductCard product={product} />
                </Grid>
            )}
        </Grid>
    );
};

export default ProductList;