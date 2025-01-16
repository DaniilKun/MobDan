import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { useRouter, Slot, useSegments } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { COLORS, FONTS, GAPS } from '@/shared/tokens';
import { fetchStatuses } from '@/entities/status/statusSlice';
import { fetchUser } from '@/entities/user/userSlice';

export default function AuthLayout() {
	const router = useRouter();
	const segments = useSegments();
	const dispatch = useDispatch<AppDispatch>();

	const access_token = useSelector((state: RootState) => state.auth.access_token);
	const username = useSelector((state: RootState) => state.user.user?.username);
	const { isLoading } = useSelector((state: RootState) => state.organization);

	// ✅ Если токен отсутствует, перенаправляем на страницу логина
	useEffect(() => {
		if (!access_token) {
			router.replace('/login');
		}
	}, [access_token]);

	// ✅ Загружаем статусы задач при первом рендере
	useEffect(() => {
		dispatch(fetchStatuses());
		dispatch(fetchUser());
	}, [dispatch]);

	// ✅ Обработчик перехода на страницу профиля
	const handleProfilePress = () => {
		router.push('/privat/profile');
	};

	// ✅ Проверяем текущий маршрут и скрываем хедер на странице профиля
	const isProfilePage = segments.join('/') === 'privat/profile';

	// ✅ Если идет загрузка организации, показываем лоадер
	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={COLORS.primary} />
				<Text style={styles.loadingText}>Uploading an organization...</Text>
			</View>
		);
	}

	// ✅ Если токен отсутствует, показываем сообщение о перенаправлении на страницу входа
	if (!access_token) {
		return (
			<View style={styles.loadingContainer}>
				<Text style={styles.loadingText}>Redirection to the login page...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{/* Хедер с названием организации и кнопкой выхода */}
			{!isProfilePage && (
				<View style={styles.header}>
					{/* ✅ Добавляем TouchableOpacity вокруг иконки профиля */}
					<TouchableOpacity onPress={handleProfilePress} style={styles.profile}>
						<Image source={require('@/assets/images/Profile.png')} style={styles.profileIcon} />
						{username ? (
							<Text style={styles.profileText}>{username}</Text>
						) : (
							<Text style={styles.profileText}>User not found</Text>
						)}
					</TouchableOpacity>
				</View>
			)}

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
});
