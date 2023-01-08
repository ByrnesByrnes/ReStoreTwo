import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import { apiService } from "../../../api-services";
import { Product, ProductParams } from "../../../app/models";
import { RootState } from "../../../app/store/configure-store";
import { CatalogState } from "./interfaces";

const productsAdapter = createEntityAdapter<Product>();

const getAxiosParams = (productParams: ProductParams) => {
    const params = new URLSearchParams();
    const { pageNumber, pageSize, orderBy, searchTerm, brands, types } =
        productParams;

    params.append("pageNumber", pageNumber.toString());
    params.append("pageSize", pageSize.toString());
    params.append("orderBy", orderBy);

    if (searchTerm) params.append("searchTerm", searchTerm);

    if (brands.length > 0) params.append("brands", brands.toString());

    if (types.length > 0) params.append("types", types.toString());

    return params;
};

const fetchProductsAsync = createAsyncThunk<
    Product[],
    void,
    { state: RootState }
>("catalog/fetchProductsAsync", async (_, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().catalog.productParams);

    try {
        const response = await apiService.Catalog.list(params);

        thunkAPI.dispatch(setMetaData(response.metaData));

        return response.items;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

const fetchProductAsync = createAsyncThunk<Product, number>(
    "catalog/fetchProductAsync",
    async (productId, thunkAPI) => {
        try {
            return await apiService.Catalog.details(productId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    },
);

const fetchFilters = createAsyncThunk(
    "catalog/fetchFilters",
    async (_, thunkApi) => {
        try {
            return await apiService.Catalog.fetchFilters();
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    },
);

const initParams = () => {
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: "name",
        brands: [],
        types: []
    };
};

const catalogSlice = createSlice({
    name: "catalog",
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        filtersLoaded: false,
        status: "idle",
        brands: [],
        types: [],
        productParams: initParams(),
        metaData: null,
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload, pageNumber: 1 };
        },

        setPageNumber: (state, action)=> {
            state.productsLoaded = false;
            state.productParams = {...state.productParams, ...action.payload}
        },

        resetProductParams: (state) => {
            state.productParams = initParams();
        },

        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = "pendingFetchProducts";
        });

        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);          
            state.status = "idle";
            state.productsLoaded = true;
        });

        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            state.status = "idle";
            console.log(action.payload);
        });

        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = "pendingFetchProduct";
        });

        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = "idle";
        });

        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            state.status = "idle";
            console.log(action.payload);
        });

        builder.addCase(fetchFilters.pending, (state) => {
            state.status = "pendingFetchFilters";
        });

        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.status = "idle";
            state.filtersLoaded = true;
        });

        builder.addCase(fetchFilters.rejected, (state, action) => {
            state.status = "idle";
            console.log(action.payload);
        });
    },
});

const productSelectors = productsAdapter.getSelectors(
    (state: RootState) => state.catalog,
);

export {
    catalogSlice,
    fetchProductsAsync,
    fetchProductAsync,
    fetchFilters,
    productSelectors,
};

export const { setProductParams, resetProductParams, setMetaData, setPageNumber } =
    catalogSlice.actions;
