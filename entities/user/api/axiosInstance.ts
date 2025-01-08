import axios from 'axios';
import { PREFIX } from './api';
import store from '@/store/store';
import { refreshToken } from '@/entities/auth/model/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAuthResponse } from '@/entities/auth/model/auth.model'; // ✅ Импорт типа

const axiosInstance = axios.create({
	baseURL: PREFIX,
	headers: {
		'Content-Type': 'application/json',
	},
});

// ✅ Интерсептор для добавления токена в каждый запрос
axiosInstance.interceptors.request.use(
	async (config) => {
		const state = store.getState();
		let token = state.auth.access_token;

		// Если токен отсутствует в Redux, пробуем получить его из AsyncStorage
		if (!token) {
			token = await AsyncStorage.getItem('access_token');
		}

		console.log('🔍 Используем токен для запроса:', token);

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

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
				// ✅ Типизируем результат вызова refreshToken
				const result = (await store.dispatch(refreshToken())) as { payload: IAuthResponse };

				if (result.payload?.access) {
					// Обновляем заголовки с новым токеном
					axiosInstance.defaults.headers['Authorization'] = `Bearer ${result.payload.access}`;
					return axiosInstance(originalRequest); // Повторяем оригинальный запрос
				}
			} catch (refreshError) {
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	},
);

export default axiosInstance;
