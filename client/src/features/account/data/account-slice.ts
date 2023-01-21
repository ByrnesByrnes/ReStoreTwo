import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { apiService } from "../../../api-services";
import { User } from "./interfaces";
import AccountState from "./interfaces/account-state";
import { history } from "../../../index";
import * as ROUTES from "../../../routes/constants";
import { toast } from "react-toastify";
import { setBasket } from "../../basket/data/basket-slice";

const initialState: AccountState = {
    user: null,
};

const restoreUser = "restore-user";

const signInUser = createAsyncThunk<User, FieldValues>(
    "account/signInUser",
    async (data, thunkAPI) => {
        try {
            const userDto = await apiService.Account.login(data);

            const { basket, ...user } = userDto;

            if (basket) thunkAPI.dispatch(setBasket(basket));

            localStorage.setItem(restoreUser, JSON.stringify(user));

            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    },
);

const fetchCurrentUser = createAsyncThunk<User>(
    "account/fetchCurrentUser",
    async (_, thunkAPI) => {
        thunkAPI.dispatch(
            setUser(JSON.parse(localStorage.getItem(restoreUser)!)),
        );

        try {
            const userDto = await apiService.Account.currentUser();

            const { basket, ...user } = userDto;

            if (basket) thunkAPI.dispatch(setBasket(basket));

            localStorage.setItem(restoreUser, JSON.stringify(user));

            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem(restoreUser)) return false;
        },
    },
);

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        signedOut: (state) => {
            state.user = null;
            localStorage.removeItem(restoreUser);
            history.push(ROUTES.HOME);
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem(restoreUser);
            toast.error("Session Expired - Please Login again");
            history.push(ROUTES.HOME);
        });
        builder.addMatcher(
            isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
            (state, action) => {
                state.user = action.payload;
            },
        );
        builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
            throw action.payload;            
        });
    },
});

export const { signedOut, setUser } = accountSlice.actions;
export { signInUser, fetchCurrentUser, accountSlice };
