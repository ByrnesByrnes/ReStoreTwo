import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import { apiService } from "../../../api-services";
import { Product } from "../../../app/models/products";
import { RootState } from "../../../app/store/configure-store";

const productsAdapter = createEntityAdapter<Product>();

const fetchProductsAsync = createAsyncThunk<Product[]>(
    "catalog/fetchProductsAsync",
    async (_, thunkApi) => {
        try {
            return await apiService.Catalog.list();
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    },
);

const fetchProductAsync = createAsyncThunk<Product, number>(
    "catalog/fetchProductAsync",
    async (productId, thunkApi) => {
        try {
            return await apiService.Catalog.details(productId);
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    },
);

const CatalogSlice = createSlice({
    name: "catalog",
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: "idle",
    }),
    reducers: {},
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
            console.log(action);
        });
    },
});

const productSelectors = productsAdapter.getSelectors(
    (state: RootState) => state.catalog,
);

export {
    CatalogSlice,
    fetchProductsAsync,
    fetchProductAsync,
    productSelectors,
};
