export interface User {
	id: number;
	username: string;
	email: string;
}
export interface PasswordChangePayload {
	old_password: string;
	new_password: string;
	confirm_password: string;
}

export interface UserState {
	user: User | null;
	isLoading: boolean;
	error: string | null;
}
