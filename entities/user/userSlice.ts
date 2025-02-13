import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API } from '@/api/api';
import { User, UserState, PasswordChangePayload } from './user.model';
import axiosInstance from '@/api/axiosInstance';
import { AxiosError } from 'axios';

const initialState: UserState = {
	user: null,
	isLoading: false,
	error: null,
};

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

export const forgotPassword = createAsyncThunk<void, { email: string }, { rejectValue: string }>(
	'user/forgotPassword',
	async ({ email }, { rejectWithValue }) => {
		try {
			await axiosInstance.post(API.forgot_password, { email });
		} catch (error) {
			if (error instanceof AxiosError) {
				return rejectWithValue(error.response?.data || 'Error when requesting password recovery');
			}
			throw error;
		}
	},
);

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
				state.error = action.payload || 'Unknown error';
			})

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

			.addCase(changePassword.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(changePassword.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(changePassword.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload || 'Password change error';
			})
			.addCase(forgotPassword.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(forgotPassword.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(forgotPassword.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload || 'Password recovery error';
			});
	},
});

export const { clearUserData } = userSlice.actions;

export default userSlice.reducer;
