export interface UserState {
	organization: Organization | null;
	isLoading: boolean;
	error: string | null;
}
export interface Organization {
	id: string | null;
	name: string | null;
	created_at: string | null;
}
