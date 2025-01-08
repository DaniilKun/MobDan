import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { jwtDecode } from 'jwt-decode';
import { refreshToken, logout } from '@/entities/auth/model/authSlice';

interface DecodedToken {
	exp: number;
}

export function useAuthCheck() {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();
	const access_token = useSelector((state: RootState) => state.auth.access_token);

	useEffect(() => {
		console.log('🔎 Хук useAuthCheck вызван');
		console.log('Текущий токен:', access_token);

		if (access_token === null) {
			console.log('⚠️ Токен еще не загружен');
			return;
		}

		if (!access_token) {
			console.log('❌ Токен отсутствует. Редирект на /login');
			router.replace('/login');
			return;
		}

		try {
			const decoded: DecodedToken = jwtDecode(access_token);

			const currentTime = Date.now();
			const expirationTime = decoded.exp * 1000;

			if (expirationTime - currentTime < 60 * 1000) {
				console.log('⏳ Токен скоро истечет. Обновляем токен.');
				dispatch(refreshToken());
			}

			if (expirationTime < currentTime) {
				console.log('❌ Токен истек. Выполняем выход.');
				dispatch(logout());
				router.replace('/login');
			}
		} catch (error) {
			console.error('❌ Ошибка при декодировании токена:', error);
			dispatch(logout());
			router.replace('/login');
		}
	}, [access_token, dispatch, router]);
}
