import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API } from '@/api/api';
import { User, UserState, PasswordChangePayload } from './user.model';
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
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				return rejectWithValue(error.response?.data?.message || 'Error when receiving user data');
			}
			throw error;
		}
	},
);

// ✅ Thunk для удаления пользователя
export const deleteUser = createAsyncThunk<void, void, { rejectValue: string }>(
	'user/deleteUser',
	async (_, { rejectWithValue }) => {
		try {
			await axiosInstance.delete(API.delete_user_me);
		} catch (error) {
			if (error instanceof AxiosError) {
				return rejectWithValue(error.response?.data?.message || 'Error when deleting a user');
			}
			throw error;
		}
	},
);

// ✅ Thunk для редактирования пользователя
export const updateUser = createAsyncThunk<User, Partial<User>, { rejectValue: string }>(
	'user/updateUser',
	async (updatedData, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.put(API.user_me_edit, updatedData);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				return rejectWithValue(error.response?.data?.message || 'Error when updating the user');
			}
			throw error;
		}
	},
);

// ✅ Thunk для изменения пароля
export const changePassword = createAsyncThunk<
	void,
	PasswordChangePayload,
	{ rejectValue: string }
>('user/changePassword', async (passwordData, { rejectWithValue }) => {
	try {
		await axiosInstance.put(API.change_password, passwordData);
	} catch (error) {
		if (error instanceof AxiosError) {
			return rejectWithValue(error.response?.data?.message || 'Password change error');
		}
		throw error;
	}
});

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
		// ✅ Обработка получения текущего пользователя
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
				state.error = action.payload || 'Unknown error';
			})

			// ✅ Обработка удаления пользователя
			.addCase(deleteUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(deleteUser.fulfilled, (state) => {
				state.isLoading = false;
				state.user = null;
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload || 'Unknown error';
			})

			// ✅ Обработка редактирования пользователя
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload || 'Unknown error';
			})

			// ✅ Обработка изменения пароля
			.addCase(changePassword.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(changePassword.fulfilled, (state) => {
				state.isLoading = false;
				alert('Password changed successfully');
			})
			.addCase(changePassword.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload || 'Password change error';
			});
	},
});

// ✅ Экспортируем actions и reducer
export const { clearUserData } = userSlice.actions;

export default userSlice.reducer;
