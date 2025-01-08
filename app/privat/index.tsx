import { useAuthCheck } from '@/hooks/useAuthCheck';
import { COLORS } from '@/shared/tokens';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'expo-router';

export default function HomePage() {
	// Проверка авторизации
	useAuthCheck();

	// Используем роутер для навигации
	const router = useRouter();

	// Получаем информацию о наличии организации из Redux
	const organization = useSelector((state: RootState) => state.user.organization);

	// Перенаправление в зависимости от наличия организации
	useEffect(() => {
		if (organization) {
			router.replace('/tasks'); // Если есть организация, перенаправляем на страницу задач
		} else {
			router.replace('/create-organization'); // Если организации нет, перенаправляем на создание организации
		}
	}, [organization, router]);

	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color={COLORS.violet} />
			<Text style={styles.text}>Проверяем информацию...</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.black,
	},
	text: {
		color: COLORS.white,
		marginTop: 20,
		fontSize: 16,
	},
});
