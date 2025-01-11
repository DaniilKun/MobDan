import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { useRouter, Slot } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { logout } from '@/entities/auth/model/authSlice';
import { COLORS, FONTS, GAPS, RADIUS } from '@/shared/tokens';
import { fetchStatuses } from '@/entities/status/statusSlice';

export default function AuthLayout() {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();

	const access_token = useSelector((state: RootState) => state.auth.access_token);
	const username = useSelector((state: RootState) => state.user.user?.username);
	const { isLoading } = useSelector((state: RootState) => state.organization);

	// Если токен отсутствует, перенаправляем на страницу логина
	React.useEffect(() => {
		if (!access_token) {
			router.replace('/login');
		}
	}, [access_token]);

	// ✅ Загружаем статусы задач при первом рендере
	useEffect(() => {
		dispatch(fetchStatuses());
	}, [dispatch]);

	// Обработка выхода из учетной записи
	const handleLogout = () => {
		dispatch(logout());
		router.replace('/login');
	};

	// ✅ Если идет загрузка организации, показываем лоадер
	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={COLORS.primary} />
				<Text style={styles.loadingText}>Загрузка организации...</Text>
			</View>
		);
	}

	// ✅ Если токен отсутствует, показываем сообщение о перенаправлении на страницу входа
	if (!access_token) {
		return (
			<View style={styles.loadingContainer}>
				<Text style={styles.loadingText}>Перенаправление на страницу входа...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{/* Хедер с названием организации и кнопкой выхода */}
			<View style={styles.header}>
				<View style={styles.profile}>
					{/* ✅ Иконка профиля */}
					<Image
						source={require('@/assets/images/Profile.png')} // Замените путь на вашу картинку
						style={styles.profileIcon}
					/>
					{/* Название организации */}
					{username ? (
						<Text style={styles.profileText}>{username}</Text>
					) : (
						<Text style={styles.profileText}>User не найден</Text>
					)}
				</View>

				{/* Кнопка выхода */}
				<TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
					<Text style={styles.logoutButtonText}>Выйти</Text>
				</TouchableOpacity>
			</View>

			{/* Основное содержимое */}
			<Slot />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.black,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.black,
	},
	loadingText: {
		color: COLORS.white,
		fontSize: FONTS.f18,
		fontFamily: FONTS.regular,
		marginTop: GAPS.g16,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: GAPS.g16,
	},
	profile: {
		flexDirection: 'row',
		gap: GAPS.g16,
		alignItems: 'center',
		justifyContent: 'flex-start',
		flex: 1,
	},
	profileIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	profileText: {
		color: COLORS.white,
		fontSize: FONTS.f18,
		fontFamily: FONTS.semibold,
		textAlign: 'center',
	},
	logoutButton: {
		position: 'absolute',
		right: GAPS.g16,
		backgroundColor: COLORS.red,
		paddingHorizontal: GAPS.g16,
		paddingVertical: GAPS.g16,
		borderRadius: RADIUS.r10,
	},
	logoutButtonText: {
		color: COLORS.white,
		fontSize: FONTS.f16,
		fontFamily: FONTS.semibold,
	},
});
