export interface Task {
	title: string;
	id: number;
	status_task: number;
	description?: string;
	created_at?: string;
	user: number;
	organization: number;
}
export interface TaskUpdate {
	title: string;
	id: number;
	status_task: number;
	description?: string;
}

export interface TaskCreationPayload {
	user: number;
	organization: number;
	title: string;
	description?: string;
}

export interface TasksState {
	tasks: Task[];
	isLoading: boolean;
	error: string | null;
}
