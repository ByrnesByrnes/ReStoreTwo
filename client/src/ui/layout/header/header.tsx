import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    onThemeChange: () => void;
}

const Header: React.FC<Props> = ({ onThemeChange }) => {
    return (
        <AppBar position="sticky" sx={{ mb: 4 }}>
            <Toolbar>
                <Typography variant="h6">RE-STORE</Typography>
                <Switch onChange={onThemeChange} />
            </Toolbar>
        </AppBar>
    );
};

export default Header;