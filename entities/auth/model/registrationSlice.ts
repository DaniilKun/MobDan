import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IRegistrationRequest, IRegistrationResponse, RegistrationState } from './auth.model';
import { API } from '@/entities/auth/api/api';

// Начальное состояние
const initialState: RegistrationState = {
	message: '',
	isLoading: false,
	error: null,
};

export const registration = createAsyncThunk<IRegistrationResponse, IRegistrationRequest>(
	'auth',
	async ({ username, password, email }, { rejectWithValue }) => {
		try {
			const { data } = await axios.post<IRegistrationResponse>(
				API.registration,
				{
					username,
					password,
					email,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				},
			);
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				return rejectWithValue(error.response?.data?.message || 'Ошибка регистрации');
			}
			throw error;
		}
	},
);

// Создаём Slice
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
