import { COLORS, FONTS, GAPS, RADIUS } from '@/shared/tokens';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { useRouter } from 'expo-router';
import { logout } from '@/entities/auth/model/authSlice';

export default function Profile() {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();

	// Получаем данные пользователя из Redux
	const user = useSelector((state: RootState) => state.user.user);

	// Обработка возврата назад
	const handleGoBack = () => {
		router.back();
	};

	// Обработка выхода из учетной записи
	const handleLogout = () => {
		dispatch(logout());
		router.replace('/login');
	};

	return (
		<View style={styles.container}>
			{/* ✅ Кнопка назад */}
			<TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
				<Text style={styles.backButtonText}>← Назад</Text>
			</TouchableOpacity>

			{/* ✅ Аватар и имя пользователя */}
			<View style={styles.profileContainer}>
				<Image
					source={require('@/assets/images/Profile.png')} // Замените путь на свою картинку
					style={styles.profileIcon}
				/>
				<Text style={styles.username}>{user?.username || 'Имя не найдено'}</Text>
			</View>

			{/* ✅ Информация о пользователе */}
			<View style={styles.infoContainer}>
				<Text style={styles.infoLabel}>Email:</Text>
				<Text style={styles.infoValue}>{user?.email || 'Email не найден'}</Text>

				<Text style={styles.infoLabel}>Username:</Text>
				<Text style={styles.infoValue}>{user?.username || 'Организация не найдена'}</Text>

				{/* <Text style={styles.infoLabel}>Дата регистрации:</Text>
				<Text style={styles.infoValue}>{user?. || 'Дата не найдена'}</Text> */}
			</View>
			{/* ✅ Кнопка выхода */}
			<TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
				<Text style={styles.logoutButtonText}>EXIT</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.black,
		padding: GAPS.g16,
	},
	backButton: {
		backgroundColor: COLORS.violetDark,
		padding: GAPS.g8,
		borderRadius: GAPS.g8,
		alignSelf: 'flex-start',
		marginBottom: GAPS.g16,
	},
	backButtonText: {
		color: COLORS.white,
		fontSize: FONTS.f16,
		fontFamily: FONTS.semibold,
	},
	profileContainer: {
		alignItems: 'center',
		marginBottom: GAPS.g16,
	},
	profileIcon: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginBottom: GAPS.g8,
	},
	username: {
		color: COLORS.white,
		fontSize: FONTS.f24,
		fontFamily: FONTS.semibold,
		textAlign: 'center',
	},
	infoContainer: {
		backgroundColor: COLORS.violetDark,
		padding: GAPS.g16,
		borderRadius: RADIUS.r10,
		marginBottom: GAPS.g16,
	},
	infoLabel: {
		color: COLORS.white,
		fontSize: FONTS.f18,
		fontFamily: FONTS.semibold,
		marginBottom: GAPS.g4,
	},
	infoValue: {
		color: COLORS.grey,
		fontSize: FONTS.f16,
		fontFamily: FONTS.regular,
		marginBottom: GAPS.g16,
	},
	logoutButton: {
		backgroundColor: COLORS.red,
		paddingVertical: GAPS.g16,
		paddingHorizontal: GAPS.g8,
		borderRadius: RADIUS.r10,
		alignItems: 'center',
		marginTop: GAPS.g8,
	},
	logoutButtonText: {
		color: COLORS.white,
		fontSize: FONTS.f18,
		fontFamily: FONTS.semibold,
	},
});
