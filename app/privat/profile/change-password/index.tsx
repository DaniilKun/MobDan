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
			Alert.alert('Error', 'The new passwords dont match');
			return;
		}

		setIsLoading(true); // ✅ Показываем лоадер перед началом запроса

		dispatch(changePassword(data))
			.unwrap()
			.then(() => {
				Alert.alert('Password changed successfully');
				reset(); // Сброс формы после успешной смены пароля
				router.push('/privat/profile');
			})
			.catch((error) => {
				Alert.alert('Error', error || 'Error when changing the password');
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
				placeholder="Enter your current password"
				isPassword
				rules={{ required: 'The current password is required' }}
			/>

			<Input
				name="new_password"
				control={control}
				placeholder="Enter a new password"
				isPassword
				rules={{
					required: 'A new password is required',
					minLength: { value: 8, message: 'The password must contain at least 8 characters.' },
				}}
			/>

			<Input
				name="confirm_password"
				control={control}
				placeholder="Confirm the new password"
				isPassword
				rules={{ required: 'Password confirmation is required' }}
			/>

			{/* Если идет загрузка, показываем лоадер */}
			{isLoading ? (
				<ActivityIndicator size="large" color={COLORS.primary} />
			) : (
				// Кнопки на одном уровне
				<View style={styles.buttonRow}>
					<TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.saveButton}>
						<Text style={styles.saveButtonText}>Change password</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => router.back()} style={styles.cancelButton}>
						<Text style={styles.cancelButtonText}>Cancel</Text>
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
