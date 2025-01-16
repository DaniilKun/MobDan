import React from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '@/shared/input/Input';
import Button from '@/shared/button/Button';
import { COLORS, FONTS, GAPS } from '@/shared/tokens';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { forgotPassword } from '@/entities/user/userSlice';
import ErrorNotification from '@/shared/errorNotification/ErrorNotification';
import { router } from 'expo-router';

interface ForgotPasswordForm {
	email: string;
}

const ForgotPassword = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, error } = useSelector((state: RootState) => state.user);

	const { handleSubmit, control, reset } = useForm<ForgotPasswordForm>({
		defaultValues: {
			email: '',
		},
	});

	// Обработка отправки формы
	const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
		try {
			console.log('📧 Email для восстановления:', data.email); // Лог для проверки
			await dispatch(forgotPassword({ email: data.email })).unwrap();
			Alert.alert('The email has been sent.');
			reset(); // Сброс формы после успешной отправки
			router.replace('/login');
		} catch (err) {
			console.error('❌ Password recovery error:', err);
		}
	};

	return (
		<View style={styles.container}>
			{/* Показываем уведомление об ошибке */}
			<ErrorNotification error={error} />

			<TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
				<Text style={styles.backButtonText}>← Back</Text>
			</TouchableOpacity>
			<View style={styles.content}>
				<View style={styles.logo}>
					<Image source={require('../assets/images/logo.png')} style={styles.logoImg} />
					<Text style={styles.logoTxt}>MobDan</Text>
				</View>
				<Text style={styles.description}>
					If you forgot your password, enter the email address that you provided during registration
					and an SMS will be sent there.
				</Text>
				<View style={styles.form}>
					{/* Поле ввода email */}
					<Input
						name="email"
						control={control}
						placeholder="Enter your email"
						rules={{
							required: 'Email is required',
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: 'Please enter a valid email address',
							},
						}}
					/>

					{/* Кнопка отправки */}
					<Button
						text={isLoading ? 'Submitting...' : 'Submit'}
						onPress={handleSubmit(onSubmit)}
						disabled={isLoading} // Блокируем кнопку, если идет запрос
					/>
				</View>
			</View>
		</View>
	);
};

export default ForgotPassword;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 55,
		justifyContent: 'center',
		backgroundColor: COLORS.black,
	},
	content: {
		alignItems: 'center',
	},
	logo: {
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: GAPS.g16,
	},
	logoImg: {
		width: 100,
		height: 100,
	},
	logoTxt: {
		fontSize: 30,
		fontWeight: 'bold',
		color: COLORS.white,
	},
	description: {
		color: COLORS.grey,
		textAlign: 'center',
		marginBottom: GAPS.g16,
		fontSize: 16,
		lineHeight: 22,
	},
	form: {
		alignSelf: 'stretch',
		gap: GAPS.g16,
	},
	backButton: {
		position: 'absolute',
		top: 20,
		left: 20,
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
});
