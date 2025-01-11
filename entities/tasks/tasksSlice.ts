import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/api/axiosInstance';
import { API } from '@/api/api';
import { Task, TaskCreationPayload, TasksState } from './tasks.model';
import { AxiosError } from 'axios';

// Начальное состояние
const initialState: TasksState = {
	tasks: [],
	isLoading: false,
	error: null,
};

// ✅ Thunk для создания задачи
export const createTask = createAsyncThunk<Task, TaskCreationPayload, { rejectValue: string }>(
	'tasks/createTask',
	async (taskData, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post(API.create_tasks, taskData);
			return response.data; // Возвращаем созданную задачу
		} catch (error) {
			if (error instanceof AxiosError) {
				return rejectWithValue(error.response?.data?.message || 'Ошибка создания задачи');
			}
			throw error;
		}
	},
);

// ✅ Thunk для получения списка задач
export const fetchTasks = createAsyncThunk<Task[], void, { rejectValue: string }>(
	'tasks/fetchTasks',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(API.list_tasks);
			return response.data; // Возвращаем список задач
		} catch (error) {
			if (error instanceof AxiosError) {
				return rejectWithValue(error.response?.data?.message || 'Ошибка получения задач');
			}
			throw error;
		}
	},
);

// ✅ Thunk для удаления задачи
export const deleteTask = createAsyncThunk<void, number, { rejectValue: string }>(
	'tasks/deleteTask',
	async (id, { rejectWithValue }) => {
		try {
			await axiosInstance.delete(API.delete_task(id)); // Используем функцию delete_task с taskId
		} catch (error) {
			if (error instanceof AxiosError) {
				return rejectWithValue(error.response?.data?.message || 'Ошибка удаления задачи');
			}
			throw error;
		}
	},
);

// ✅ Создаем slice
const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		clearTasks: (state) => {
			state.tasks = [];
		},
	},
	extraReducers: (builder) => {
		builder
			// ✅ Обработка создания задачи
			.addCase(createTask.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
				state.isLoading = false;
				state.tasks.push(action.payload);
			})
			.addCase(createTask.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload ?? 'Неизвестная ошибка';
			})
			// ✅ Обработка получения списка задач
			.addCase(fetchTasks.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
				state.isLoading = false;
				state.tasks = action.payload;
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload ?? 'Неизвестная ошибка';
			})
			// ✅ Обработка удаления задачи
			.addCase(deleteTask.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				state.isLoading = false;
				// Удаляем задачу из списка по её ID
				state.tasks = state.tasks.filter((task) => task.id !== action.meta.arg);
			})
			.addCase(deleteTask.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload ?? 'Неизвестная ошибка';
			});
	},
});

// ✅ Экспортируем actions и reducer
export const { clearTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
