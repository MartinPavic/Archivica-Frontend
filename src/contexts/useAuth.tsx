import { useRouter } from "next/router";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { User, UserLogin, UserRegister } from "../models/user";
import apiService from "../services/api";
import * as constants from "../constants/localStorage";
import { AuthData } from "../models/auth";
import { AxiosError } from "axios";

interface IAuth {
    user: User | null;
    authData: AuthData | null;
    error: AxiosError<Error> | null;
    loading: boolean;
	initializing: boolean;
    signUp: (userRegister: UserRegister) => Promise<void>;
    signIn: (userLogin: UserLogin) => Promise<void>;
    logout: () => Promise<void>;
    getNewAccessToken: (authData: AuthData) => Promise<AuthData | null>;
}

const AuthContext = createContext<IAuth>({
    user: null,
    authData: null,
    error: null,
    loading: false,
	initializing: true,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    getNewAccessToken: async () => null,
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const authHeader = (accessToken: string) => ({ Authorization: "Bearer " + accessToken });

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [authData, setAuthData] = useState<AuthData | null>(null);
    const [error, setError] = useState<AxiosError<Error> | null>(null);
    const [loading, setLoading] = useState(false);
	const [initializing, setInitializing] = useState(true);

    // Initial fetch of authData and user
    useEffect(() => {
		const initialAuthData = getAuthData();
		if (initialAuthData) {
			getCurrentUser(initialAuthData);
		}
    }, []);

    const getAuthData = useCallback((): AuthData | null => {
        try {
            const data = localStorage.getItem(constants.authKey);
            if (!data || data == "null") {
                setAuthData(null);
            	setInitializing(false);
                return null;
            }
            const parsed = JSON.parse(data) as AuthData;
            setAuthData(parsed);
            return parsed;
        } catch (e) {
            setInitializing(false);
            setAuthData(null);
            return null;
        }
    }, []);

    const logIn = useCallback((userAndAuthData: User & AuthData) => {
        const user: User = {
			_id: userAndAuthData._id,
            email: userAndAuthData.email,
            firstName: userAndAuthData.firstName,
            lastName: userAndAuthData.lastName,
            image: userAndAuthData.image,
        };
        const authData: AuthData = {
            accessToken: userAndAuthData.accessToken,
            refreshToken: userAndAuthData.refreshToken,
        };
        setUser(user);
        setAuthData(authData);
        setError(null);
        localStorage.setItem(constants.authKey, JSON.stringify(authData));
        router.push("/");
    }, []);

    const signUp = useCallback(
        async (userRegister: UserRegister) => {
            setLoading(true);

            await apiService
                .postRegister({ data: userRegister })
                .then((res) => res.data)
                .then(logIn)
                .catch((error) => setError(error))
                .finally(() => setLoading(false));
        },
        [logIn]
    );

    const signIn = useCallback(
        async (userLogin: UserLogin) => {
            setLoading(true);

            await apiService
                .postLogin({ data: userLogin })
                .then((res) => res.data)
                .then(logIn)
                .catch((error) => setError(error))
                .finally(() => setLoading(false));
        },
        [logIn]
    );

    const logout = useCallback(async () => {
        setLoading(true);

        await apiService
            .deleteLogout({ headers: authHeader(authData?.accessToken!) })
            .then((res) => res.data)
            .then(() => {
                setUser(null);
                setAuthData(null);
                setError(null);
                localStorage.removeItem(constants.authKey);
                router.push("/login");
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, [authData?.accessToken, router]);

    const getNewAccessToken = useCallback(async (oldAuthData: AuthData): Promise<AuthData | null> => {
        const response: AuthData | null = await apiService
            .getNewAccessToken({ data: oldAuthData.refreshToken })
            .then((res) => res.data)
            .catch((error) => {
                setError(error);
                setAuthData(null);
                setUser(null);
                return null;
            });
        setAuthData(response);
        localStorage.setItem(constants.authKey, JSON.stringify(response));
        setLoading(false);
        return response;
    }, []);

    const getCurrentUser = useCallback(
        async (authData: AuthData): Promise<User | null> => {
            if (user) return user;
            setLoading(true);
            const response: User | null = await apiService
                .getCurrentUser({ headers: authHeader(authData.accessToken) })
                .then((res) => res.data)
                .catch(async (error: AxiosError<Error>) => {
                    if (error.response && error.response.status === 401) {
                        const newAuthData = await getNewAccessToken(authData);
                        const newResponse = await apiService
                            .getCurrentUser({ headers: authHeader(newAuthData?.accessToken!) })
                            .then((res) => res.data)
                            .catch((error) => {
                                setError(error);
                                return null;
                            });
                        setUser(newResponse);
                        return newResponse;
                    }
                    setUser(null);
                    setError(error);
                    return null;
                });
            setUser(response);
            setLoading(false);
			setInitializing(false);
            return response;
        },
        [getNewAccessToken, user]
    );

    const memoedValue = useMemo(
        () => ({
            user,
            authData,
            signUp,
            signIn,
            error,
            loading,
			initializing,
            logout,
            getNewAccessToken,
        }),
        [user, authData, signUp, signIn, error, loading, initializing, logout, getNewAccessToken]
    );

    return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>;
};

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context comopnent.
export default function useAuth() {
    return useContext(AuthContext);
}
