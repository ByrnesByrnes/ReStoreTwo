import { MetaData, ProductParams } from "../../../../app/models";

interface CatalogState {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    brands: string[];
    types: string[];
    productParams: ProductParams;
    metaData: MetaData | null ;
}

export default CatalogState;
