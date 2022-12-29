import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import * as ROUTES from "../../routes/constants";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Container component={Paper} sx={{ height: 400 }}>
            <Typography gutterBottom variant="h5" textAlign={"center"}>Ooooops - we could not find what you are looking for</Typography>
            <Divider />
            <Button fullWidth component={Link} to={ROUTES.CATALOG}>Back to Shop</Button>
        </Container>
    );
}
