import { Button } from "@mui/material";
import { useEffect, useState } from 'react';
import { Product } from "../../app/models/products";
import { ProductList } from "./components";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {

        fetch("https://localhost:5001/api/products").then((response) =>
            response.json()
        ).then((data) => {
            setProducts(data);
        }).catch((error) => {

            console.log(error);
        });

    }, []);

    // const handleAddProduct = () => {   };

    return (
        <>
            <ProductList products={products} />
            {/* <Button variant="contained" onClick={handleAddProduct}>Add Product</Button> */}
        </>
    );
}
