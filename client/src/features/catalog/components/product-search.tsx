import { debounce, TextField } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/configure-store";
import { setProductParams } from "../data/catalog-slice";

const ProductSearch = () => {
    const { productParams: { searchTerm } } = useAppSelector(state => state.catalog);
    const [input, setInput] = useState(searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setProductParams({ searchTerm: event.target.value }));
    }, 1000);

    return (
        <TextField
            label="Search Products"
            variant="outlined"
            fullWidth
            value={input || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInput(event.target.value);
                debouncedSearch(event);
            }}
        />
    );
};

export default ProductSearch;