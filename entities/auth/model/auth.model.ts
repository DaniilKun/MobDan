export interface IAuthResponse {
	refresh: string;
	access: string;
}
export interface ILoginRequest {
	// email: string;
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

// Типизация состояния auth
export interface AuthState {
	access_token: string | null;
	refresh_token: string | null;
	isLoading: boolean;
	error: string | Record<string, string[]> | null;
}

// Типизация состояния registration
export interface RegistrationState {
	message: string;
	isLoading: boolean;
	error: string | Record<string, string[]> | null; // Добавляем поддержку объекта ошибок
}
