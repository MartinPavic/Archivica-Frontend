import { CircularProgress, ThemeProvider, createTheme } from "@mui/material";
import { useRouter } from "next/router";
import { useRequest } from "../../../src/hooks/useRequest";
import apiService from "../../../src/services/api";
import { NotFound } from "../../../src/components/notFound";
import { ResetPasswordForm } from "../../../src/components/resetPassword";
import { NextPage } from "next";
import { useEffect } from "react";

const theme = createTheme();

const ResetPasswordPage: NextPage = (): JSX.Element => {
    const { query, isReady } = useRouter();
    const email = query.email as string;
    const token = query.token as string;

    if (!isReady) {
        return <CircularProgress />;
    }

    if (!email || !token) {
        return <NotFound></NotFound>;
    }

    return (
        <ThemeProvider theme={theme}>
            <ResetPasswordFormOrNotFound email={email} token={token}></ResetPasswordFormOrNotFound>
        </ThemeProvider>
    );
};

const ResetPasswordFormOrNotFound = ({ email, token }: { email: string; token: string }): JSX.Element => {
    const validateTokenRequest = useRequest({ request: apiService.postValidateToken });

    useEffect(() => {
        validateTokenRequest.call({ email, token });
    }, [email, token]);

    if (validateTokenRequest.loading) {
        return <CircularProgress />;
    }

    if (validateTokenRequest.error) {
        return <NotFound></NotFound>;
    }

    return validateTokenRequest.data ? (
        <ResetPasswordForm email={email} token={token}></ResetPasswordForm>
    ) : (
        <NotFound></NotFound>
    );
};

export default ResetPasswordPage;
