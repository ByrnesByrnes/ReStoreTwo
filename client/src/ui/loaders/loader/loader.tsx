import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props {
    message?: string;
}

const Loader: React.FC<Props> = ({ message }) => {
    return (
        <Backdrop open invisible>
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh" flexDirection="column">
                <CircularProgress size={100} color="secondary" />
                {message && <Typography mt={4} variant="h4">{message}</Typography>}
            </Box>
        </Backdrop>
    );
};

export default Loader;