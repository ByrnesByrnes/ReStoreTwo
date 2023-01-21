import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAppDispatch, useAppSelector } from "../../../../app/store/configure-store";
import { signedOut } from "../../../../features/account/data/account-slice";
import { clearBasket } from "../../../../features/basket/data/basket-slice";

const SignedInMenu = () => {
    const { user } = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        dispatch(signedOut());
        dispatch(clearBasket());
    };

    return (
        <>
            <Button
                color="inherit"
                id="header-menu-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ typography: "h6" }}
            >
                {user?.email}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "header-menu-button",
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My Orders</MenuItem>
                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default SignedInMenu;