import { AxiosResponse, AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import useAuth, { authHeader } from "../contexts/useAuth";
import { ApiRequestData } from "../services/api";

interface UseRequestProps<Rq, Rs> {
    request: (data: ApiRequestData<Rq>, ...args: any) => Promise<AxiosResponse<Rs>>;
}

interface UseRequestReturn<Rq, Rs> {
	call: (requestdata: Rq, ...args: any) => Promise<Rs | null>;
	data: Rs | null;
	loading: boolean;
	error: string | null;
}

const useRequest = <Rq, Rs>(props: UseRequestProps<Rq, Rs>): UseRequestReturn<Rq, Rs> => {
	const { request } = props;

	const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Rs | null>(null);

	const call = useCallback(async (requestData: Rq, ...args: any) => {
        setLoading(true);
        return await request({ data: requestData }, ...args)
            .then((response) => {
                setData(response.data);
                setError(null);
				return response.data;
            })
            .catch((error: AxiosError<{name: string, message: string}>) => {
                setData(null);
                setError(`${error.response?.data.name}: ${error.response?.data.message}`);
				return null;
            })
            .finally(() => setLoading(false));
    }, [request]);

    return { call, data, loading, error };
}

const useAuthenticatedRequest = <Rq, Rs>(props: UseRequestProps<Rq, Rs>): UseRequestReturn<Rq, Rs> => {
    const { request } = props;

    const { authData, getNewAccessToken } = useAuth();

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Rs | null>(null);

    const call = useCallback(async (requestData: Rq, ...args: any) => {
        setLoading(true);
        return await request({ data: requestData, headers: authHeader(authData?.accessToken!) }, ...args)
            .then((response) => {
                setData(response.data);
                setError(null);
				return response.data;
            })
            .catch(async (error: AxiosError) => {
                if (error.response && error.response.status === 401) {
                    const newAuthData = await getNewAccessToken();
                    const newResponse = await request(
                        { data: requestData, headers: authHeader(newAuthData?.accessToken!) },
                        ...args
                    );
                    setData(newResponse.data);
                    setError(null);
                    return newResponse.data;
                }
                setData(null);
                setError(error.toString());
				return null;
            })
            .finally(() => setLoading(false));
    }, [request, authData?.accessToken, getNewAccessToken]);

    return { call, data, loading, error };
};

export { useAuthenticatedRequest, useRequest };
