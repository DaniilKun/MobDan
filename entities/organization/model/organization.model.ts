export interface UserState {
	organization: Organization | null;
	isLoading: boolean;
	error: string | null;
}
export interface Organization {
	id: number;
	name: string | null;
	created_at: string | null;
}
