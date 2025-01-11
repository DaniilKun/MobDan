import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { AxiosError } from 'axios';
import { IRegistrationRequest, IRegistrationResponse, RegistrationState } from './auth.model';
import { API } from '@/api/api';
// import axiosInstance from '@/api/axiosInstance';

// Начальное состояние
const initialState: RegistrationState = {
	message: '',
	isLoading: false,
	error: null,
};

// ✅ Асинхронный thunk для регистрации
export const registration = createAsyncThunk<IRegistrationResponse, IRegistrationRequest>(
	'auth/registration',
	async ({ username, password, email }, { rejectWithValue }) => {
		try {
			// Используем отдельный запрос axios без токена
			const { data } = await axiosInstance.post<IRegistrationResponse>(API.registration, {
				username,
				password,
				email,
			});

			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				return rejectWithValue(error.response?.data?.message || 'Ошибка регистрации');
			}
			throw error;
		}
	},
);

// ✅ Создаем Slice
const registrationSlice = createSlice({
	name: 'registration',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registration.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(registration.fulfilled, (state, action) => {
				state.isLoading = false;
				state.message = action.payload.message;
				state.error = null;
			})
			.addCase(registration.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export default registrationSlice.reducer;
