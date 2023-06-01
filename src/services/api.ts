import axios, { AxiosInstance, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { AuthData } from "../models/auth";
import { Filter } from "../models/filter";
import { Post } from "../models/post";
import { User, UserLogin, UserRegister } from "../models/user";

export interface ApiRequestData<T> {
	data?: T
	headers?: RawAxiosRequestHeaders
}

class Api {
	private readonly axiosInstance: AxiosInstance;

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: process.env.NEXT_PUBLIC_API_URL,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
		});
	}

    postRegister = async (apiRequestData: ApiRequestData<UserRegister>): Promise<AxiosResponse<User>> => {
        return await this.axiosInstance.post<User>("users/register", apiRequestData.data, { headers: apiRequestData.headers });
    }

    postLogin = async (apiRequestData: ApiRequestData<UserLogin>): Promise<AxiosResponse<User & AuthData>> => {
        return await this.axiosInstance.post<User & AuthData>("users/login", apiRequestData.data, { headers: apiRequestData.headers });
    }

    deleteLogout = async (apiRequestData: ApiRequestData<null>): Promise<AxiosResponse<string>> => {
        return await this.axiosInstance.delete<string>("users/logout", { headers: apiRequestData.headers });
    }

    getCurrentUser = async (apiRequestData: ApiRequestData<null>): Promise<AxiosResponse<User>> => {
        return await this.axiosInstance.get<User>("users/current", { headers: apiRequestData.headers });
    }

    getPosts = async (apiRequestData: ApiRequestData<{ filters: Filter[], page: number }>): Promise<AxiosResponse<Post[]>> => {
        const { filters } = apiRequestData.data!;
		const url =
            "/posts" +
            (filters.length > 0 ? "?" : "") +
            filters.map((filter) => `filter=${filter.property},${filter.operator},${filter.value}`).join("&");

        return await this.axiosInstance.get(url, { headers: apiRequestData.headers });
    }

	getNewAccessToken = async (apiRequestData: ApiRequestData<string>): Promise<AxiosResponse<AuthData>> => {
		return await this.axiosInstance.post<AuthData>("users/refresh-token", { refreshToken: apiRequestData.data });
	}

    postPost = async(apiRequestData: ApiRequestData<Post>) : Promise<AxiosResponse<Post>> => {
        console.log('test')
        return await this.axiosInstance.post<Post>("/posts", apiRequestData.data, { headers: apiRequestData.headers })
    }
}

const apiService = new Api();

export default apiService;

