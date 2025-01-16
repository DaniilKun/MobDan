export interface TaskStatus {
	status_task: [number, string];
	name: string;
	color: string;
}

export interface StatusState {
	statuses: TaskStatus[];
	isLoading: boolean;
	error: string | null;
}
