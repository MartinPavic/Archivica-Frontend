import { Model } from "./model";

export interface User extends Model {
    firstName: string;
    lastName: string;
    email: string;
    image?: string;
    role?: "admin" | "user";
}

export interface UserRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export type UserForgotPassword = {
    email: string;
};

export type UserValidateToken = {
    email: string;
    token: string;
};

export type UserResetPassword = UserValidateToken & {
    newPassword: string;
    confirmNewPassword: string;
};
