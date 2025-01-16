export interface IAuthResponse {
	refresh: string;
	access: string;
}
export interface ILoginRequest {
	password: string;
	username: string;
}
export interface IRegistrationResponse {
	message: string;
}
export interface IRegistrationRequest {
	email: string;
	password: string;
	username: string;
}

export interface AuthState {
	access_token: string | null;
	refresh_token: string | null;
	isLoading: boolean;
	error: string | Record<string, string[]> | null;
}

export interface RegistrationState {
	message: string;
	isLoading: boolean;
	error: string | Record<string, string[]> | null;
}
