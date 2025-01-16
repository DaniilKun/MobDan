import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/api/axiosInstance';
import { API } from '@/api/api';
import { Task, TaskCreationPayload, TasksState, TaskUpdate } from './tasks.model';
import { AxiosError } from 'axios';

const initialState: TasksState = {
	tasks: [],
	isLoading: false,
	error: null,
};

export const createTask = createAsyncThunk<Task, TaskCreationPayload, { rejectValue: string }>(
	'tasks/createTask',
	async (taskData, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post(API.create_tasks, taskData);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				return rejectWithValue(error.response?.data?.message || 'Issue creation error');
			}
			throw error;
		}
	},
);

export const fetchTasks = createAsyncThunk<Task[], void, { rejectValue: string }>(
	'tasks/fetchTasks',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(API.list_tasks);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				return rejectWithValue(error.response?.data?.message || 'Error receiving tasks');
			}
			throw error;
		}
	},
);

export const deleteTask = createAsyncThunk<void, number, { rejectValue: string }>(
	'tasks/deleteTask',
	async (id, { rejectWithValue }) => {
		try {
			await axiosInstance.delete(API.delete_task(id));
		} catch (error) {
			if (error instanceof AxiosError) {
				return rejectWithValue(error.response?.data?.message || 'Issue deletion error');
			}
			throw error;
		}
	},
);

export const updateTask = createAsyncThunk<
	Task,
	{ id: number; taskData: Partial<TaskUpdate> },
	{ rejectValue: string }
>('tasks/updateTask', async ({ id, taskData }, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.put(API.update_task(id), taskData);
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			return rejectWithValue(error.response?.data?.message || 'Issue update error');
		}
		throw error;
	}
});

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
				state.error = action.payload ?? 'Unknown error';
			})

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
				state.error = action.payload ?? 'Unknown error';
			})

			.addCase(deleteTask.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				state.isLoading = false;
				state.tasks = state.tasks.filter((task) => task.id !== action.meta.arg);
			})
			.addCase(deleteTask.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload ?? 'Unknown error';
			})

			.addCase(updateTask.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
				state.isLoading = false;
				const index = state.tasks.findIndex((task) => task.id === action.payload.id);
				if (index !== -1) {
					state.tasks[index] = action.payload;
				}
			})
			.addCase(updateTask.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload ?? 'Unknown error';
			});
	},
});

export const { clearTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
