import { Grid } from "@mui/material";
import React from "react";
import { Product } from "../../../app/models";
import { useAppSelector } from "../../../app/store/configure-store";
import { ProductCard } from "./";
import ProductCardSkeleton from "./product-card-skeleton";

interface Props {
    products: Product[];
}

const ProductList: React.FC<Props> = ({ products }) => {
    const { productsLoaded } = useAppSelector(state => state.catalog);

    return (
        <Grid container spacing={4}>
            {products.map((product) =>
                <Grid item key={product.id} xs={4}>
                    {!productsLoaded ?
                        <ProductCardSkeleton /> :
                        <ProductCard product={product} />
                    }
                </Grid>
            )}
        </Grid>
    );
};

export default ProductList;