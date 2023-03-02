// import axios, { AxiosResponse, Method } from "axios";
// import { AuthData } from "../models/auth";
// import { useState } from "react";

// const axiosInstance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//     },
// });

// const useRequest = <Rq, Rs>(method: Method, url: string, authData: AuthData | null = null): [(rd: Rq) => void, { data: Rs | null, loading: boolean, error: string }] => {
// 	const [data, setData] = useState<Rs | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

// 	const runRequest = (requestData: Rq) => {
// 		setLoading(true);
//         const headers = authData ? { Authorization: "Bearer " + authData.accessToken } : {};
//         axiosInstance
//             .request({ url, method, headers, data: requestData })
//             .then((response: AxiosResponse<Rs>) => setData(response.data))
//             .catch((error) => setError(error))
//             .finally(() => setLoading(false));
// 	}

// 	return [runRequest, {data, loading, error}]
// }


// export { useRequest };
