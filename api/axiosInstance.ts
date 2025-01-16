import axios from 'axios';
import { PREFIX } from './api';
import store from '@/store/store';
import { refreshToken } from '@/entities/auth/model/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAuthResponse } from '@/entities/auth/model/auth.model';

const axiosInstance = axios.create({
	baseURL: PREFIX,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use(
	async (config) => {
		let token: string | null = store.getState().auth.access_token;

		if (!token) {
			token = await AsyncStorage.getItem('access_token');
		}

		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const result = (await store.dispatch(refreshToken())) as { payload: IAuthResponse };

				if (result.payload?.access) {
					originalRequest.headers['Authorization'] = `Bearer ${result.payload.access}`;

					return axiosInstance(originalRequest);
				}
			} catch (refreshError) {
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	},
);

export default axiosInstance;
