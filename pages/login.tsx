import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../src/components/UI/copyright";
import useAuth from "../src/contexts/useAuth";
import { UserLogin } from "../src/models/user";
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const theme = createTheme();

const LoginPage: NextPage = (): JSX.Element => {
    const { signIn, error, loading } = useAuth();
    const [showSnackBar, setShowSnackBar] = useState(false);
    // const [ rememberMe, setRememberMe ] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, touchedFields },
    } = useForm<UserLogin>();

    const onSubmit = async (values: FieldValues) => isValid ? await signIn(values as UserLogin) : null;

    // const handleRememberMe = (ev: React.ChangeEvent<HTMLInputElement>) => {
    // 	ev.preventDefault();
    // 	setRememberMe(ev.target.checked);
    // }

    useEffect(() => setShowSnackBar(!!error), [error]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setShowSnackBar(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xs">
                <CssBaseline />
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
                            helperText={errors.email?.message}
                            {...register("email", {
                                required: "E-mail address is required",
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "Invalid e-mail address",
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
                                minLength: {
                                    value: 4,
                                    message: "Min length is 4",
                                },
                            })}
                        />
                        {/* <FormControlLabel control={<Checkbox checked={rememberMe} onChange={handleRememberMe} color="primary" />} label="Remember me" /> */}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={!isValid}>
                            Sign In
                        </Button>
                        {loading && <LinearProgress />}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                Dont have an account?
                                <Link className="pl-1 underline" href="/register">
                                    Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    <Snackbar open={showSnackBar} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                            {error?.response?.data.message}
                        </Alert>
                    </Snackbar>
                </Box>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
};

export default LoginPage;