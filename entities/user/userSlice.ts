import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API } from '@/api/api';
import { User, UserState } from './user.model';
import axiosInstance from '@/api/axiosInstance';
import { AxiosError } from 'axios';

// Начальное состояние
const initialState: UserState = {
	user: null,
	isLoading: false,
	error: null,
};

// ✅ Thunk для получения текущего пользователя
export const fetchUser = createAsyncThunk<User, void, { rejectValue: string }>(
	'user/fetchUser',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(API.user_me);
			return response.data; // Возвращаем данные пользователя
		} catch (error) {
			if (error instanceof AxiosError) {
				return rejectWithValue(
					error.response?.data?.message || 'Ошибка при получении данных пользователя',
				);
			}
			throw error;
		}
	},
);

// ✅ Создаем slice
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearUserData: (state) => {
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload || 'Неизвестная ошибка';
			});
	},
});

// ✅ Экспортируем actions и reducer
export const { clearUserData } = userSlice.actions;

export default userSlice.reducer;
