import { ThemeProvider } from "@emotion/react";
import {
    Container,
    CssBaseline,
    Box,
    Typography,
    TextField,
    LinearProgress,
    createTheme,
    Button,
    Link,
} from "@mui/material";
import Image from "next/image";
import { useRequest } from "../src/hooks/useRequest";
import apiService from "../src/services/api";
import { FieldValues, useForm } from "react-hook-form";
import { SnackbarWrapper } from "../src/components/snackbarWrapper";

const theme = createTheme();

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, touchedFields },
        reset,
    } = useForm<{ email: string }>();

    const forgotPasswordRequest = useRequest({ request: apiService.postForgotPassword });

    const onSubmit = async (values: FieldValues) => {
        if (isValid) {
            const { email } = values as { email: string };
            forgotPasswordRequest.call(email);
            reset();
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Link className="underline" href="/login">
                Back
            </Link>
            <Container maxWidth="xs">
                <CssBaseline />
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Image src="/assets/images/logo.png" width={150} height={100} alt={""} />
                    <Typography component="h1" variant="h5" sx={{ mt: 5 }}>
                        Reset password
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="email">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            type="email"
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
                        {forgotPasswordRequest.loading && <LinearProgress />}
                        <Button
                            type="submit"
                            style={{ backgroundColor: "#1976d2", color: "white" }}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!isValid && forgotPasswordRequest.loading}
                        >
                            {forgotPasswordRequest.loading && !forgotPasswordRequest.data ? "Sending..." : "Send email"}
                        </Button>
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default ForgotPassword;
