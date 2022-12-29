import { useEffect, useState } from 'react';
import { apiService } from "../../api-services";
import { Product } from "../../app/models/products";
import { Loader } from "../../ui";
import { ProductList } from "./components";

export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        apiService.Catalog.list()
            .then((data) => setProducts(data)
            ).catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loader message={"Loading Products..."} />;

    return <ProductList products={products} />;
}
