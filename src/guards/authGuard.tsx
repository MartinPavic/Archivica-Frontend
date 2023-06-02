import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import useAuth from "../contexts/useAuth";


const AuthGuard = (props: { children: JSX.Element[] | JSX.Element }): JSX.Element | null => {
    const { children } = props;
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
	const { user } = useAuth();

	const authCheck = useCallback(async (url: string) => {
        // redirect to login page if accessing a private page and not logged in
        const publicPaths = ["/login", "/register", "/forgot-password", "/reset-password"];
        const path = url.split("?")[0];
        if (!user && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: "/login",
                query: { returnUrl: router.asPath },
            });
        } else if (user && publicPaths.includes(path)) {
            setAuthorized(true);
			router.push("/");
        } else {
			setAuthorized(true);
		}
	}, [user, router])
	
    useEffect(() => {
        // on initial load - run auth check
		authCheck(router.asPath)

        // on route change start - hide page content by setting authorized to false
        const hideContent = () => setAuthorized(false);
        router.events.on("routeChangeStart", hideContent);

        // on route change complete - run auth check
        router.events.on("routeChangeComplete", authCheck);

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off("routeChangeStart", hideContent);
            router.events.off("routeChangeComplete", authCheck);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authCheck]);

    return authorized ? <>{children}</> : null;
}

export default AuthGuard;