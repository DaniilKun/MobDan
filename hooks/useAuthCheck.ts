/* eslint-disable @typescript-eslint/no-unused-vars */
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
		if (access_token === null) {
			return;
		}

		if (!access_token) {
			router.replace('/login');
			return;
		}

		try {
			const decoded: DecodedToken = jwtDecode(access_token);

			const currentTime = Date.now();
			const expirationTime = decoded.exp * 1000;

			if (expirationTime - currentTime < 60 * 1000) {
				dispatch(refreshToken());
			}

			if (expirationTime < currentTime) {
				dispatch(logout());
				router.replace('/login');
			}
		} catch (error) {
			dispatch(logout());
			router.replace('/login');
		}
	}, [access_token, dispatch, router]);
}
