import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Paper, Typography, Box, Grid, TextField, Avatar, Container } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../../../routes/constants";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { apiService } from "../../../api-services";
import { toast } from "react-toastify";
import { emailValidation, passwordValidation } from "./validation/validation";

const Register = () => {
    const history = useHistory();

    const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: "onTouched",
        defaultValues: { username: "", email: "", password: "" }
    }
    );

    const handleApiErrors = (errors: any) => {
        if (errors.length) {
            errors.forEach((error: string) => {
                if (error.includes("Password")) {

                    setError("password", { message: error });

                } else if (error.includes("Email")) {

                    setError("email", { message: error });

                } else if (error.includes("Username")) {

                    setError("username", { message: error });
                }
            });
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
                Register
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit((data) =>
                    apiService.Account.register(data)
                        .then(() => {
                            toast.success("Registration successful - you can now login");
                            history.push(ROUTES.LOGIN);
                        })
                        .catch((error) => handleApiErrors(error))
                )}
                noValidate
                sx={{ mt: 1 }}
            >
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
                    label="Email"
                    autoComplete="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: emailValidation,
                            message: "Not a valid email address"
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    {...register("password", {
                        required: "Password is required",
                        pattern: {
                            value: passwordValidation,
                            message: "Password does not meet complexity requirements",
                        }
                    })}
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
                    Registered
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to={ROUTES.LOGIN}>
                            "Already have an account? Sign In"
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Register;