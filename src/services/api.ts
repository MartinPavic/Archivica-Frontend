import axios from "axios";
import { AuthData } from "../models/auth";
import { Filter } from "../models/filter";
import { Post } from "../models/post";
import { User, UserLogin, UserRegister } from "../models/user";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

const authHeader = (accessToken: string) => ({ Authorization: "Bearer " + accessToken })

export class Api {
    static async postRegister(userRegister: UserRegister): Promise<User> {
        const response = await axiosInstance.post<User>("users/register", userRegister);
        return response.data;
    }

    static async postLogin(userLogin: UserLogin): Promise<User & AuthData> {
        const response = await axiosInstance.post<User & AuthData>("users/login", userLogin);
        return response.data;
    }

    static async deleteLogout(accessToken: string): Promise<string> {
        const response = await axiosInstance.delete<string>("users/logout", { headers: authHeader(accessToken) });
        return response.data;
    }

    static async getCurrentUser(accessToken: string): Promise<User> {
        const response = await axiosInstance.get<User>("users/current", { headers: authHeader(accessToken) });
        return response.data;
    }

    static async getPosts(filters: Filter[], accessToken: string): Promise<Post[]> {
        const url =
            "/posts" +
            (filters.length > 0 ? "?" : "") +
            filters.map((filter) => `filter=${filter.property},${filter.operator},${filter.value}`).join("&");

        const response = await axiosInstance.get(url, { headers: authHeader(accessToken) });
        return response.data;
    }
}
