import { Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configure-store";
import { AppPagination, CheckboxButtons, Loader, RadioButtonGroup } from "../../ui";
import { ProductList, ProductSearch } from "./components";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./data/catalog-slice";

const sortOptions = [
    { value: "name", label: "Alphabetical" },
    { value: "priceDesc", label: "Price - High to low" },
    { value: "price", label: "Price - Low to high" },
];

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, filtersLoaded, brands, types, productParams, metaData } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]);

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [filtersLoaded, dispatch]);

    if (!filtersLoaded) return <Loader message={"Loading Products..."} />;

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={3}>
                    <Paper sx={{ mb: 2 }}>
                        <ProductSearch />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <RadioButtonGroup onChange={(event) => dispatch(setProductParams({ orderBy: event.target.value }))} options={sortOptions} selected={productParams.orderBy} />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <CheckboxButtons
                            options={brands}
                            checked={productParams.brands}
                            onChange={(options: string[]) => dispatch(setProductParams({ brands: options }))}
                        />
                    </Paper>
                    <Paper sx={{ mb: 2, p: 2 }}>
                        <CheckboxButtons
                            options={types}
                            checked={productParams.types}
                            onChange={(options: string[]) => dispatch(setProductParams({ types: options }))}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <ProductList products={products} />
                </Grid>
            </Grid>
            <Grid container columnSpacing={4}>
                <Grid item xs={3} />
                <Grid item xs={9}>
                    {metaData && <AppPagination metaData={metaData} onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))} />}
                </Grid>
            </Grid>
        </>
    );
}
