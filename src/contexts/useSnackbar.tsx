import { Alert, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

interface ISnackbar {
    showSnackbar: (message: string, type: SnackbarType) => void;
    closeSnackbar: () => void;
}

type SnackbarType = "success" | "error";

const SnackbarContext = createContext<ISnackbar>({
    showSnackbar: (message, type) => {},
    closeSnackbar: () => {},
});

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [type, setType] = useState<SnackbarType>("success");
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setShow(false);
    };
    const showSnackbar = (message: string, type: SnackbarType = "success") => {
        setMessage(message);
        setType(type);
        setShow(true);
    };
    const closeSnackbar = () => setShow(false);

    const value: ISnackbar = {
        showSnackbar,
        closeSnackbar,
    };

    return (
        <SnackbarContext.Provider value={value}>
            {children}
            <Snackbar open={show} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};

export default function useSnackbar() {
    return useContext(SnackbarContext);
}
