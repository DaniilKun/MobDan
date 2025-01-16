import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/api/axiosInstance';
import { API } from '@/api/api';
import { AxiosError } from 'axios';
import { StatusState, TaskStatus } from './status.model';

// Начальное состояние
const initialState: StatusState = {
	statuses: [],
	isLoading: false,
	error: null,
};

// ✅ Thunk для получения статусов задач
export const fetchStatuses = createAsyncThunk<TaskStatus[], void, { rejectValue: string }>(
	'status/fetchStatuses',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(API.status_tasks);
			return response.data; // Возвращаем массив статусов
		} catch (error) {
			if (error instanceof AxiosError) {
				return rejectWithValue(error.response?.data?.message || 'Error receiving statuses');
			}
			throw error;
		}
	},
);

// ✅ Создаем slice
const statusSlice = createSlice({
	name: 'status',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchStatuses.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchStatuses.fulfilled, (state, action: PayloadAction<TaskStatus[]>) => {
				state.isLoading = false;
				state.statuses = action.payload;
			})
			.addCase(fetchStatuses.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload ?? 'Unknown error';
			});
	},
});

// ✅ Экспортируем reducer
export default statusSlice.reducer;
