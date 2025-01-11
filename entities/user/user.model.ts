// Типы для пользователя
export interface User {
	id: number;
	username: string;
	email: string;
}

export interface UserState {
	user: User | null;
	isLoading: boolean;
	error: string | null;
}
