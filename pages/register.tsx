import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
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
import { NextPage } from "next";
import { UserRegister } from "../src/models/user";
import { Alert, LinearProgress, Snackbar } from "@mui/material";

const theme = createTheme();

const RegisterPage: NextPage = (): JSX.Element => {
	const { signUp, error, loading } = useAuth();
	const [showSnackBar, setShowSnackBar] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid, touchedFields },
    } = useForm<UserRegister & { confirmPassword: string }>();

    const onRegister = async (values: FieldValues) => isValid ? await signUp(values as UserRegister) : null;

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
                <Box
                    sx={{
                        // marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Image src="/assets/images/logo.png" height={100} width={150} alt={""} />
                    <Typography component="h1" variant="h5" sx={{ my: 5 }}>
                        Sign up
                    </Typography>
                    <form noValidate onSubmit={handleSubmit(onRegister)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    error={touchedFields.firstName && !!errors.firstName}
                                    helperText={errors.firstName?.message}
                                    {...register("firstName", {
                                        required: "First name is required",
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    autoComplete="family-name"
                                    error={touchedFields.lastName && !!errors.lastName}
                                    helperText={errors.lastName?.message}
                                    {...register("lastName", {
                                        required: "Last name is required",
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
									type="email"
                                    id="email"
                                    label="Email Address"
                                    autoComplete="email"
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
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    id="password"
                                    error={touchedFields.password && !!errors.password}
                                    helperText={errors.password?.message}
                                    {...register("password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                                            message:
                                                "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
                                        },
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Confirm password"
                                    type="password"
                                    id="confirmPassword"
                                    error={touchedFields.confirmPassword && !!errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
                                    {...register("confirmPassword", {
                                        required: true,
                                        validate: (val) => {
                                            if (watch("password") != val) {
                                                return "Your passwords do not match";
                                            }
                                        },
                                    })}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!isValid}
                        >
                            Sign Up
                        </Button>
						{loading && <LinearProgress />}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
							Already have an account? <Link className="underline" href="/login">Sign in</Link>
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

export default RegisterPage;
