import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // ✅ Используем простой axios
import { IRegistrationRequest, IRegistrationResponse, RegistrationState } from './auth.model';
import { API } from '@/api/api';
import axiosPublicInstance from '@/api/axiosPublicInstance';

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
			console.log('📤 Отправка запроса на регистрацию...');
			const { data } = await axiosPublicInstance.post<IRegistrationResponse>(API.registration, {
				username,
				password,
				email,
			});

			console.log('✅ Ответ от сервера:', data);
			return data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error('❌ Registration error:', error.response?.data);
				return rejectWithValue(error.response?.data?.message || 'Registration error');
			}
			throw error;
		}
	},
);

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
