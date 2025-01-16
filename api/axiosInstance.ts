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

// ✅ Интерсептор для добавления токена в каждый запрос
axiosInstance.interceptors.request.use(
	async (config) => {
		let token: string | null = store.getState().auth.access_token;

		// Если токена нет в Redux, берем из AsyncStorage
		if (!token) {
			token = await AsyncStorage.getItem('access_token');
		}

		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		console.log('🔍 Using the token for the request:', token);
		return config;
	},
	(error) => Promise.reject(error),
);

// ✅ Интерсептор для обработки ошибок и обновления токена
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		// Если ошибка 401 (Unauthorized) и запрос еще не повторялся
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// ✅ Запрашиваем новый токен
				const result = (await store.dispatch(refreshToken())) as { payload: IAuthResponse };

				if (result.payload?.access) {
					// ✅ Обновляем токен в заголовках оригинального запроса
					originalRequest.headers['Authorization'] = `Bearer ${result.payload.access}`;

					// ✅ Повторяем запрос с новым токеном
					return axiosInstance(originalRequest);
				}
			} catch (refreshError) {
				console.error('❌ Token update error:', refreshError);
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	},
);

export default axiosInstance;
