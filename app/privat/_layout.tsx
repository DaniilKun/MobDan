import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { useRouter, Slot } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { logout } from '@/entities/auth/model/authSlice';
import { COLORS, FONTS, GAPS, RADIUS } from '@/shared/tokens';

export default function AuthLayout() {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();

	const access_token = useSelector((state: RootState) => state.auth.access_token);
	const organization = useSelector((state: RootState) => state.user.organization);

	// Если токен отсутствует, перенаправляем на страницу логина
	React.useEffect(() => {
		if (!access_token) {
			router.replace('/login');
		}
	}, [access_token]);

	// Обработка выхода из учетной записи
	const handleLogout = () => {
		dispatch(logout());
		router.replace('/login');
	};

	// Пока проверяется токен, показываем загрузку
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
				{organization && <Text style={styles.organizationName}>{organization.name}</Text>}
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
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: GAPS.g16,
		// backgroundColor: COLORS.violetDark,
	},
	organizationName: {
		color: COLORS.white,
		fontSize: FONTS.f18,
		fontFamily: FONTS.semibold,
		textAlign: 'center',
		flex: 1,
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
