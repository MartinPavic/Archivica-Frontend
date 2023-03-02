import { useRouter } from "next/router";
import { createContext, useContext, useMemo, useState } from "react";
import { User, UserLogin, UserRegister } from "../models/user";
import { Api } from "../services/api";
import * as constants from "../constants/localStorage"
import { AuthData } from "../models/auth";
import { AxiosError } from "axios";

interface IAuth {
    user: User | null;
	authData: AuthData | null;
	error: AxiosError<Error> | null;
    loading: boolean;
    signUp: (userRegister: UserRegister) => Promise<void>;
    signIn: (userLogin: UserLogin) => Promise<void>;
    logout: () => Promise<void>;
    getCurrentUser: () => Promise<User | null>;
}

const AuthContext = createContext<IAuth>({
    user: null,
	authData: null,
	error: null,
    loading: false,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    getCurrentUser: async () => null,
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
	const [authData, setAuthData] = useState<AuthData | null>(null);
    const [error, setError] = useState<AxiosError<Error> | null>(null);
    const [loading, setLoading] = useState(false);
	const getAuthData = (): AuthData | null => {
		try {
			const data = localStorage.getItem(constants.authKey);
			const parsed = JSON.parse(data!) as AuthData;
			setAuthData(parsed);
			return parsed;
		} catch (e) {
			setAuthData(null);
			return null;
		}
	}

    const memoedValue = useMemo(() => {
		const signUp = async (userRegister: UserRegister) => {
			setLoading(true);

			await Api.postRegister(userRegister)
				.then((user) => {
					setUser(user);
					setError(null);
					router.push("/login");
				})
				.catch((error) => setError(error))
				.finally(() => setLoading(false));
		};
	
		const signIn = async (userLogin: UserLogin) => {
			setLoading(true);
	
			await Api.postLogin(userLogin)
				.then((userAndAuthData) => {
					const user = {
						email: userAndAuthData.email,
						firstName: userAndAuthData.firstName,
						lastName: userAndAuthData.lastName,
						image: userAndAuthData.image
					}
					const authData = {
						accessToken: userAndAuthData.accessToken,
						refreshToken: userAndAuthData.refreshToken,
						expiresIn: userAndAuthData.expiresIn,
						expiresOn: userAndAuthData.expiresOn
					}
					setUser(user);
					setAuthData(authData);
					setError(null);
					localStorage.setItem(constants.authKey, JSON.stringify(authData));
					router.push("/");
				})
				.catch((error) => setError(error))
				.finally(() => setLoading(false));
		};
	
		const logout = async () => {
			setLoading(true);

			await Api.deleteLogout(authData?.accessToken!)
				.then(() => {
					setUser(null);
					setAuthData(null);
					setError(null);
					localStorage.removeItem(constants.authKey);
					router.push("/login");
				})
				.catch((error) => setError(error))
				.finally(() => setLoading(false));
		};

		const getCurrentUser = async (): Promise<User | null> => {
			if (user) return user;
			setLoading(true);
			const authData = getAuthData();
			if (!authData) {
				setUser(null);
				setLoading(false);
				return null;
			};
			const response: User | null = await Api.getCurrentUser(authData.accessToken).catch((error) => { setError(error); return null; });
			setUser(response);
			setLoading(false);
			return response;
		}

		return { user, authData, signUp, signIn, error, loading, logout, getCurrentUser };
	}, [user, authData, loading, error, router]);

    return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>;
};

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context comopnent.
export default function useAuth() {
    return useContext(AuthContext);
}
