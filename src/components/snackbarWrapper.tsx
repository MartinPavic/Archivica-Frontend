import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

interface SnackbarWrapperProps {
    children: React.ReactNode;
    show: boolean;
    success: boolean;
    message: string | null;
}

export const SnackbarWrapper = ({ children, show, success, message }: SnackbarWrapperProps) => {
    const [showSnackBar, setShowSnackBar] = useState(show);

    useEffect(() => setShowSnackBar(show), [show]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setShowSnackBar(false);
    };
    return (
        <>
            {children}
            <Snackbar open={showSnackBar} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={success ? "success" : "error"} sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};
