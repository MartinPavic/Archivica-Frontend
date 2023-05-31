import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "../contexts/useAuth";
import { CircularProgress } from "@mui/material";

const PUBLIC_PATHS = ["/login", "/register", "/forgot-password", "/reset-password"]

const AuthGuard = (props: { children: JSX.Element[] | JSX.Element }): JSX.Element | null => {
    const { children } = props;
    const router = useRouter();
    const { user, initializing } = useAuth();

    useEffect(() => {
        if (!initializing) {

            if (!user && !PUBLIC_PATHS.includes(router.route)) {
                router.push("/login");
            }

			if (user && PUBLIC_PATHS.includes(router.route)) {
				router.push("/");
			}
			
        }
    }, [initializing, user, router]);

    if (initializing) {
        return <CircularProgress></CircularProgress>;
    }

    if (!initializing && (user || PUBLIC_PATHS.includes(router.route))) {
        return <>{children}</>;
    }

    return null;
};

export default AuthGuard;
