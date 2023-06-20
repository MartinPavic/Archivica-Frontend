import axios, { AxiosInstance, AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { AuthData } from "../models/auth";
import { Filter, FilterPageSortLimit } from "../models/filterPageSort";
import { Post } from "../models/post";
import { User, UserLogin, UserRegister, UserResetPassword, UserValidateToken } from "../models/user";
import { Architect } from "../models/architect";
import { Country } from "../models/country";

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

	private getFilteredSortedPaginated = <T>(endpoint: string, filterPageSort: FilterPageSortLimit, headers: RawAxiosRequestHeaders): Promise<AxiosResponse<T[]>> => {
		const { filters, page, sort, limit } = filterPageSort;		
		const url =
            endpoint + "?page=" + page +
            (filters.length > 0 ? "&" : "") +
            filters.map((filter) => `filter=${filter.property},${filter.operator},${filter.value}`).join("&") + `&sort=${sort.property},${sort.operator}` + `&limit=${limit}`;

        return this.axiosInstance.get<T[]>(url, { headers });
	} 

	// USER & AUTH // 

    postRegister = async (apiRequestData: ApiRequestData<UserRegister>): Promise<AxiosResponse<User & AuthData>> => {
        return await this.axiosInstance.post<User & AuthData>("users/register", apiRequestData.data, { headers: apiRequestData.headers });
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
	
	getNewAccessToken = async (apiRequestData: ApiRequestData<string>): Promise<AxiosResponse<AuthData>> => {
		return await this.axiosInstance.post<AuthData>("users/refresh-token", { refreshToken: apiRequestData.data });
	}

	postForgotPassword = async (apiRequestData: ApiRequestData<string>): Promise<AxiosResponse<string>> => {
		return await this.axiosInstance.post<string>("users/forgot-password", { email: apiRequestData.data });
	}

	postValidateToken = async (apiRequestData: ApiRequestData<UserValidateToken>): Promise<AxiosResponse<boolean>> => {
		return await this.axiosInstance.post<boolean>("users/validate-token", { email: apiRequestData.data?.email, token: apiRequestData.data?.token});
	}

	postResetPassword = async (apiRequestData: ApiRequestData<UserResetPassword>): Promise<AxiosResponse<string>> => {
		return await this.axiosInstance.post<string>("users/reset-password", apiRequestData.data)
	}

	// POSTS //

    getPosts = async (apiRequestData: ApiRequestData<FilterPageSortLimit>): Promise<AxiosResponse<Post[]>> => {
        return await this.getFilteredSortedPaginated("/posts", apiRequestData.data!, apiRequestData.headers!);
    }

	postPost = async (apiRequestData: ApiRequestData<Post>): Promise<AxiosResponse<Post>> => {
		return await this.axiosInstance.post<Post>("/posts", apiRequestData.data, { headers: apiRequestData.headers })
	}

	// ARCHITECTS //

	getArchitects = async (apiRequestData: ApiRequestData<FilterPageSortLimit>): Promise<AxiosResponse<Architect[]>> => {
		return await this.getFilteredSortedPaginated("/architects", apiRequestData.data!, apiRequestData.headers!);
	}

	postArchitect = async (apiRequestData: ApiRequestData<Architect>): Promise<AxiosResponse<Architect>> => {
		return await this.axiosInstance.post<Architect>("/architects", apiRequestData.data!, { headers: apiRequestData.headers });
	}

	// COUNTRIES //

	getCountries = async (apiRequestData: ApiRequestData<FilterPageSortLimit>): Promise<AxiosResponse<Country[]>> => {
		return await this.getFilteredSortedPaginated("/countries", apiRequestData.data!, apiRequestData.headers!);
	}

}

const apiService = new Api();

export default apiService;

