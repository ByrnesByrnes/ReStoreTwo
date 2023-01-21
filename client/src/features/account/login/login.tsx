import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Paper, Typography, Box, Grid, TextField, Avatar, Container } from "@mui/material";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as ROUTES from "../../../routes/constants";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../../app/store/configure-store";
import { signInUser } from "../data/account-slice";

const Login = () => {
    const history = useHistory();
    const location = useLocation<any>();
    const dispatch = useAppDispatch();

    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: "onTouched",
        defaultValues: { username: "", password: "" }
    }
    );

    const submitForm = async (data: FieldValues) => {
        try {
            await dispatch(signInUser(data));
            history.push(location.state?.from?.pathname || ROUTES.CATALOG);
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <Container
            component={Paper}
            maxWidth="sm"
            sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4 }}
        >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    autoFocus
                    autoComplete="username"
                    {...register("username", { required: "Username is required" })}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    {...register("password", { required: "Password is required" })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <LoadingButton
                    disabled={!isValid}
                    loading={isSubmitting}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to={ROUTES.REGISTER}>
                            "Don"t have an account? Sign Up"
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Login;