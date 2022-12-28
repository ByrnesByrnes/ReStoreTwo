import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, SxProps, Theme, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { navigationLinksMiddle, navigationLinksRight } from "./components";
import * as ROUTES from "../../../routes/constants";

interface Props {
    onThemeChange: () => void;
}

const Header: React.FC<Props> = ({ onThemeChange }) => {

    const navigationStyles = {
        color: "inherit",
        typography: "h6",
        textDecoration: "none",
        "&:hover": {
            color: "grey.500"
        },
        "&.active": {
            color: "text.secondary"
        },
    } as SxProps<Theme>;

    return (
        <AppBar position="sticky" sx={{ mb: 4 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                <Box display="flex" alignItems="center">
                    <Typography
                        sx={navigationStyles}
                        exact
                        variant="h6"
                        component={NavLink}
                        to={ROUTES.HOME}
                    >
                        RE-STORE
                    </Typography>
                    <Switch onChange={onThemeChange} />
                </Box>

                <List sx={{ display: "flex" }}>
                    {navigationLinksMiddle.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navigationStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                <Box display="flex" alignItems="center">
                    <IconButton size="large" sx={{ color: "inherit" }}>
                        <Badge badgeContent={4} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    <List sx={{ display: "flex" }}>
                        {navigationLinksRight.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navigationStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;