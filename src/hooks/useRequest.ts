import { AxiosResponse, AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import useAuth, { authHeader } from "../contexts/useAuth";
import { ApiRequestData } from "../services/api";

interface UseRequestProps<Rq, Rs> {
    request: (data: ApiRequestData<Rq>, ...args: any) => Promise<AxiosResponse<Rs>>;
    requestData?: Rq;
    callImmediately?: boolean;
}

const useRequest = <Rq, Rs>(props: UseRequestProps<Rq, Rs>, ...args: any): [() => Promise<void>, Rs | null, boolean, string | null] => {
	const { request, requestData, callImmediately } = props;

	const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Rs | null>(null);

	const callRequest = useCallback(async () => {
        setLoading(true);
        await request({ data: requestData }, ...args)
            .then((response) => {
                setData(response.data);
                setError(null);
            })
            .catch((error) => {
                setData(null);
                setError(error.toString());
            })
            .finally(() => setLoading(false));
    }, [request, requestData, args]);

	useEffect(() => {
        if (callImmediately) {
            callRequest();
        }
    }, []);

    return [callRequest, data, loading, error];
}

const useAuthenticatedRequest = <Rq, Rs>(
    props: UseRequestProps<Rq, Rs>,
    ...args: any
): [() => Promise<void>, Rs | null, boolean, string | null] => {
    const { request, requestData, callImmediately } = props;

    const { authData, getNewAccessToken } = useAuth();

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Rs | null>(null);

    const callRequest = useCallback(async () => {
        setLoading(true);
        await request({ data: requestData, headers: authHeader(authData?.accessToken!) }, ...args)
            .then((response) => {
                setData(response.data);
                setError(null);
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
                    return;
                }
                setData(null);
                setError(error.toString());
            })
            .finally(() => setLoading(false));
    }, [request, requestData, authData?.accessToken, args, getNewAccessToken]);

    useEffect(() => {
        if (callImmediately) {
            callRequest();
        }
    }, []);

    return [callRequest, data, loading, error];
};

export { useAuthenticatedRequest, useRequest };
