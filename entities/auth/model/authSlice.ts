import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, IAuthResponse, ILoginRequest } from './auth.model';
import { API } from '@/api/api';

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const initialState: AuthState = {
	access_token: null,
	refresh_token: null,
	isLoading: false,
	error: null,
};

export const login = createAsyncThunk<IAuthResponse, ILoginRequest>(
	'auth/login',
	async ({ username, password }, { rejectWithValue }) => {
		try {
			const { data } = await axiosInstance.post<IAuthResponse>(API.login, { username, password });

			await AsyncStorage.setItem(TOKEN_KEY, data.access);
			await AsyncStorage.setItem(REFRESH_TOKEN_KEY, data.refresh);

			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				return rejectWithValue(error.response?.data || { detail: 'Authorization error' });
			}
			throw error;
		}
	},
);

export const loadToken = createAsyncThunk('auth/loadToken', async (_, { dispatch }) => {
	const accessToken = await AsyncStorage.getItem(TOKEN_KEY);
	const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);

	if (accessToken && refreshToken) {
		axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
		dispatch(setAccessToken({ access: accessToken, refresh: refreshToken }));
	} else {
		console.log('❌ Tokens not found.');
	}
});

export const refreshToken = createAsyncThunk<IAuthResponse>(
	'auth/refreshToken',
	async (_, { getState, rejectWithValue }) => {
		const state = getState() as { auth: AuthState };
		const refresh_token = state.auth.refresh_token;

		if (!refresh_token) {
			return rejectWithValue('There is no refresh token');
		}

		try {
			const { data } = await axiosInstance.post<IAuthResponse>(API.refresh, {
				refresh: refresh_token,
			});

			await AsyncStorage.setItem(TOKEN_KEY, data.access);

			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				return rejectWithValue(error.response?.data?.message || 'Token update error');
			}
			throw error;
		}
	},
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAccessToken: (state, action) => {
			state.access_token = action.payload.access;
			state.refresh_token = action.payload.refresh;
		},
		logout: (state) => {
			state.access_token = null;
			state.refresh_token = null;
			state.isLoading = false;
			state.error = null;

			AsyncStorage.removeItem(TOKEN_KEY);
			AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.access_token = action.payload.access;
				state.refresh_token = action.payload.refresh;
				state.error = null;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				if (action.payload && typeof action.payload === 'object') {
					state.error = action.payload as Record<string, string[]>;
				} else {
					state.error = { detail: ['An unexpected error occurred'] };
				}
			})
			.addCase(loadToken.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loadToken.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(loadToken.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(refreshToken.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(refreshToken.fulfilled, (state, action) => {
				state.isLoading = false;
				state.access_token = action.payload.access;
				state.error = null;
			})
			.addCase(refreshToken.rejected, (state, action) => {
				state.isLoading = false;
				state.access_token = null;
				state.refresh_token = null;
				state.error = action.payload as string;
			});
	},
});

export const { setAccessToken, logout } = authSlice.actions;

export default authSlice.reducer;
