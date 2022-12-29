import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import * as ROUTES from "../../routes/constants";

export default function ServerError() {

    const history = useHistory();

    const { state } = useLocation<any>();

    return (
        <Container component={Paper}>
            {state?.error ?
                <>
                    <Typography variant="h4" color="error">{state.error.title}</Typography>
                    <Divider />
                    <Typography>{state.error.detail || "Internal Server Error"}</Typography>
                </> :
                <Typography variant="h5">Server Error</Typography>
            }
            <Button onClick={() => history.push(ROUTES.CATALOG)}>Go Back to the Store</Button>
        </Container>
    );
}
