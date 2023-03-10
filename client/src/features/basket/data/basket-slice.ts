import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { apiService } from "../../../api-services";
import { getCookie } from "../../../app/utilities";
import { Basket } from "../interfaces";

interface BasketState {
    basket?: Basket;
    status: string;
}

const initialState: BasketState = {
    basket: undefined,
    status: "idle",
};

export const fetchBasketAsync = createAsyncThunk<Basket>(
    "basket/fetchBasketAsync",
    async (_, thunkAPI) => {
        try {
            return await apiService.Basket.get();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    },
    {
        condition: () => {
            if (!getCookie("buyerId")) return false;
        },
    },
);

export const addBasketItemAsync = createAsyncThunk<
    Basket,
    { productId: number; quantity?: number }
>(
    "basket/addBasketItemAsync",
    async ({ productId, quantity = 1 }, thunkApi) => {
        try {
            return await apiService.Basket.addItem(productId, quantity);
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    },
);

export const removeBasketItemAsync = createAsyncThunk<
    void,
    { productId: number; quantity: number; name?: string }
>("basket/removeBasketItemAsync", async ({ productId, quantity }, thunkApi) => {
    try {
        await apiService.Basket.removeItem(productId, quantity);
    } catch (error: any) {
        return thunkApi.rejectWithValue({ error: error.data });
    }
});

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload;
        },
        clearBasket: (state) => {
            state.basket = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            state.status = `pendingAddItem-${action.meta.arg.productId}`;
        });


        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = `pendingRemoveItem-${action.meta.arg.productId}-${action.meta.arg.name}`;
        });

        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const { productId, quantity } = action.meta.arg;

            if (state.basket === undefined) return;

            const itemIndex = state.basket.items.findIndex(
                (i) => i.productId === productId,
            );

            if (itemIndex === -1 || itemIndex === undefined) return;

            state.basket.items[itemIndex].quantity -= quantity;

            if (state.basket.items[itemIndex].quantity === 0) {
                state.basket.items.splice(itemIndex, 1);
            }

            state.status = "idle";
        });

        builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
            state.status = "idle";
            console.log(action.payload);
        });
        builder.addMatcher(isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled), (state, action) => {
            state.basket = action.payload;
            state.status = "idle";
        });

        builder.addMatcher(isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.fulfilled), (state, action) => {
            state.status = "idle";
        });
    },
});

export const { setBasket, clearBasket } = basketSlice.actions;
