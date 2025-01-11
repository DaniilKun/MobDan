// Модель статуса
export interface TaskStatus {
	status_task: [number, string];
	name: string;
	color: string; // Цвет статуса, если есть
}

// Тип состояния слайса
export interface StatusState {
	statuses: TaskStatus[];
	isLoading: boolean;
	error: string | null;
}
