import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "../contexts/useAuth";


function AuthGuard(props: { children: JSX.Element[] | JSX.Element }): JSX.Element | null {
    const { children } = props;
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
	const { getCurrentUser } = useAuth();
	
    useEffect(() => {
        // on initial load - run auth check
        authCheck(router.asPath);

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
    }, []);

    async function authCheck(url: string) {
        // redirect to login page if accessing a private page and not logged in
        const publicPaths = ["/login", "/register"];
        const path = url.split("?")[0];
		const user = await getCurrentUser();
        if (!user && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: "/login",
                query: { returnUrl: router.asPath },
            });
        } else {
            setAuthorized(true);
        }
    }

    return authorized ? <>{children}</> : null;
}

export default AuthGuard;