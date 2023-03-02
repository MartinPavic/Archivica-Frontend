export interface User {
	firstName: string;
	lastName: string;
	email: string;
	image?: string;
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