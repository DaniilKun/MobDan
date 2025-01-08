import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter, Slot } from 'expo-router';
import { View, Text } from 'react-native';

export default function AuthLayout() {
	const router = useRouter();
	const access_token = useSelector((state: RootState) => state.auth.access_token);

	// Если токен отсутствует, перенаправляем на страницу логина
	React.useEffect(() => {
		if (!access_token) {
			router.replace('/login');
		}
	}, [access_token]);

	// Пока проверяется токен, показываем загрузку
	if (!access_token) {
		return (
			<View>
				<Text>Перенаправление на страницу входа...</Text>
			</View>
		);
	}

	return <Slot />;
}
