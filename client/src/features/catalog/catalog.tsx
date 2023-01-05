import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/store/configure-store";
import { Loader } from "../../ui";
import { ProductList } from "./components";
import { fetchProductsAsync, productSelectors } from "./data/catalog-slice";

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());

    }, [productsLoaded, dispatch]);

    if (status.includes("pending")) return <Loader message={"Loading Products..."} />;

    return <ProductList products={products} />;
}
