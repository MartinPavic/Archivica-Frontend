import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline, Box, Typography, TextField, LinearProgress, Grid, Snackbar, Alert, createTheme, Button, Link } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRequest } from "../src/hooks/useRequest";
import apiService from "../src/services/api";
import { FieldValues, useForm } from "react-hook-form";

const theme = createTheme();

const ForgotPassword = () => {
	const {
        register,
        handleSubmit,
        formState: { errors, isValid, touchedFields },
    } = useForm<{ email: string }>();

	const [email, setEmail] = useState("");

	const [forgotPassword, result, isLoading, error] = useRequest({ request: apiService.forgotPassword, requestData: email });

	const [showSnackBar, setShowSnackBar] = useState(false);

	useEffect(() => setShowSnackBar(!!error || !!result), [error, result]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setShowSnackBar(false);
    };


	const onSubmit = async (values: FieldValues) => {
		if (isValid) {
			const { email } = values as { email: string } 
			setEmail(email);
			await forgotPassword();
		}
	}

	return (
		<ThemeProvider theme={theme}>
            <Container maxWidth="xs">
                <CssBaseline />
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Image src="/assets/images/logo.png" width={150} height={100} alt={""} />
                    <Typography component="h1" variant="h5" sx={{ mt: 5 }}>
                        Forgot password
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
                        {isLoading && <LinearProgress />}
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={!isValid}>
                            Send email
                        </Button>
                    </form>
					<Grid container justifyContent="center">
                            <Grid item>
                                <Link href="/login">Sign in</Link>
                            </Grid>
                        </Grid>
                    <Snackbar open={showSnackBar} autoHideDuration={6000} onClose={handleClose}>
						<Alert onClose={handleClose} severity={!!error ? "error" : "success"} sx={{ width: "100%" }}>
							{!!error ? error : result}
						</Alert>
                    </Snackbar>
                </Box>
            </Container>
        </ThemeProvider>
	)
}

export default ForgotPassword;