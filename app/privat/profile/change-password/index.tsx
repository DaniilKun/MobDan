import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import { COLORS, FONTS, GAPS, RADIUS } from '@/shared/tokens';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { useRouter } from 'expo-router';
import { changePassword } from '@/entities/user/userSlice';
import Input from '@/shared/input/Input';

interface ChangePasswordForm {
	old_password: string;
	new_password: string;
	confirm_password: string;
}

export default function ChangePassword() {
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();

	// Локальное состояние для отслеживания загрузки
	const [isLoading, setIsLoading] = useState(false);

	// Используем react-hook-form для управления формой
	const { control, handleSubmit, reset } = useForm<ChangePasswordForm>({
		defaultValues: {
			old_password: '',
			new_password: '',
			confirm_password: '',
		},
	});

	// Обработка смены пароля
	const onSubmit: SubmitHandler<ChangePasswordForm> = (data) => {
		if (data.new_password !== data.confirm_password) {
			Alert.alert('Ошибка', 'Новые пароли не совпадают');
			return;
		}

		setIsLoading(true); // ✅ Показываем лоадер перед началом запроса

		dispatch(changePassword(data))
			.unwrap()
			.then(() => {
				Alert.alert('Пароль успешно изменен');
				reset(); // Сброс формы после успешной смены пароля
				router.push('/privat/profile');
			})
			.catch((error) => {
				Alert.alert('Ошибка', error || 'Ошибка при смене пароля');
			})
			.finally(() => {
				setIsLoading(false); // ✅ Скрываем лоадер после завершения запроса
			});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Смена пароля</Text>

			{/* Используем кастомный Input */}
			<Input
				name="old_password"
				control={control}
				placeholder="Введите текущий пароль"
				isPassword
				rules={{ required: 'Текущий пароль обязателен' }}
			/>

			<Input
				name="new_password"
				control={control}
				placeholder="Введите новый пароль"
				isPassword
				rules={{
					required: 'Новый пароль обязателен',
					minLength: { value: 8, message: 'Пароль должен содержать минимум 8 символов' },
				}}
			/>

			<Input
				name="confirm_password"
				control={control}
				placeholder="Подтвердите новый пароль"
				isPassword
				rules={{ required: 'Подтверждение пароля обязательно' }}
			/>

			{/* Если идет загрузка, показываем лоадер */}
			{isLoading ? (
				<ActivityIndicator size="large" color={COLORS.primary} />
			) : (
				// Кнопки на одном уровне
				<View style={styles.buttonRow}>
					<TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.saveButton}>
						<Text style={styles.saveButtonText}>Сменить пароль</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
						<Text style={styles.cancelButtonText}>Отмена</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.black,
		padding: GAPS.g16,
		justifyContent: 'center',
	},
	title: {
		color: COLORS.white,
		fontSize: FONTS.f24,
		fontFamily: FONTS.semibold,
		textAlign: 'center',
		marginBottom: GAPS.g16,
	},
	buttonRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: GAPS.g16,
	},
	saveButton: {
		backgroundColor: COLORS.green,
		paddingVertical: GAPS.g16,
		paddingHorizontal: GAPS.g16,
		borderRadius: RADIUS.r10,
		flex: 1,
		marginRight: GAPS.g8,
		alignItems: 'center',
	},
	saveButtonText: {
		color: COLORS.white,
		fontSize: FONTS.f18,
		fontFamily: FONTS.semibold,
	},
	cancelButton: {
		backgroundColor: COLORS.red,
		paddingVertical: GAPS.g16,
		paddingHorizontal: GAPS.g16,
		borderRadius: RADIUS.r10,
		flex: 1,
		marginLeft: GAPS.g8,
		alignItems: 'center',
	},
	cancelButtonText: {
		color: COLORS.white,
		fontSize: FONTS.f18,
		fontFamily: FONTS.semibold,
	},
});
