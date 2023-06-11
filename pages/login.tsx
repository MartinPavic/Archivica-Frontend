import React, {  } from "react";
import { FieldValues, useForm } from "react-hook-form";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../src/components/UI/copyright";
import useAuth from "../src/contexts/useAuth";
import { UserLogin } from "../src/models/user";
import LinearProgress from "@mui/material/LinearProgress";
import { SnackbarWrapper } from "../src/components/snackbarWrapper";

const theme = createTheme();

const LoginPage: NextPage = (): JSX.Element => {
    const { signIn, loading, error } = useAuth();
    const {
        register,
        handleSubmit,
		watch,
        formState: { errors, isValid, touchedFields },
    } = useForm<UserLogin>({ mode: "onChange" });

    const onSubmit = async (values: FieldValues) => (isValid ? await signIn(values as UserLogin) : null);
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xs">
                <CssBaseline />
                <SnackbarWrapper show={error?.response! && error.response.status === 401} message={"Your session expired, please log in again"} success={false}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Image src="/assets/images/logo.png" width={150} height={100} alt={""} />
                        <Typography component="h1" variant="h5" sx={{ mt: 5 }}>
                            Sign in
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                                autoFocus
                                error={touchedFields.email && !!errors.email}
                                helperText={touchedFields.email && !!errors.email && errors.email?.message}
                                {...register("email", {
                                    required: "E-mail address is required",
                                    pattern: {
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: "Invalid e-mail address.",
                                    },
                                })}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={touchedFields.password && !!errors.password}
                                helperText={errors.password?.message}
                                {...register("password", {
                                    required: "Password is required",
                                })}
                            />
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link className="underline" href={"/forgot-password"}>
                                        Forgot password?
                                    </Link>
                                </Grid>
                            </Grid>
                            {/* <FormControlLabel control={<Checkbox checked={rememberMe} onChange={handleRememberMe} color="primary" />} label="Remember me" /> */}
                            <Button
                                type="submit"
                                className="bg-primary"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={!isValid}
                            >
                                Sign In
                            </Button>
                            {loading && <LinearProgress></LinearProgress>}
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    Dont have an account?
                                    <Link className="pl-1 underline" href="/register">
                                        Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </SnackbarWrapper>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
};

export default LoginPage;
