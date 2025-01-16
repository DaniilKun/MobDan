/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import { COLORS, GAPS } from '@/shared/tokens';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { registration } from '@/entities/auth/model/registrationSlice';
import Input from '@/shared/input/Input';
import ErrorNotification from '@/shared/errorNotification/ErrorNotification';
import CustomLink from '@/shared/customLink/CustomLink';
import { useRouter } from 'expo-router';

interface RegistrationForm {
	username: string;
	email: string;
	password: string;
}

const Registration = () => {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, error, message } = useSelector((state: RootState) => state.registration);

	const { handleSubmit, control, reset } = useForm<RegistrationForm>({
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
	});

	const [isAgreed, setIsAgreed] = useState(false);

	const onSubmit: SubmitHandler<RegistrationForm> = async (data) => {
		try {
			await dispatch(registration(data)).unwrap();
			reset();
			await setTimeout(() => {
				router.replace('/login');
			}, 1000);
		} catch (error) {
			/* empty */
		}
	};

	return (
		<View style={styles.container}>
			<ErrorNotification error={error} />
			{message && <Text style={styles.successMessage}>{message}</Text>}

			<View style={styles.content}>
				<View style={styles.logo}>
					<Image source={require('../assets/images/logo.png')} style={styles.logoImg} />
					<Text style={styles.logoTxt}>MobDan</Text>
				</View>

				<View style={styles.form}>
					<Input
						placeholder="Username"
						name="username"
						control={control}
						rules={{ required: 'Username is required' }}
					/>
					<Input
						placeholder="Email"
						name="email"
						control={control}
						rules={{
							required: 'Email is required',
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: 'Incorrect Email Address',
							},
						}}
					/>
					<Input
						isPassword
						placeholder="Password"
						name="password"
						control={control}
						rules={{ required: 'A password is required', minLength: 6 }}
					/>

					<View style={styles.checkboxContainer}>
						<TouchableOpacity
							style={[styles.checkbox, isAgreed && styles.checkboxChecked]}
							onPress={() => setIsAgreed(!isAgreed)}
						/>
						<Text style={styles.checkboxLabel}>
							I agree to the
							<CustomLink
								text={' terms of the privacy policy'}
								style={styles.privacyPolicyLink}
								href="https://mytasksapp.pythonanywhere.com/politics/"
							></CustomLink>
						</Text>
					</View>

					<TouchableOpacity
						style={[styles.registerButton, !isAgreed && styles.registerButtonDisabled]}
						onPress={handleSubmit(onSubmit)}
						disabled={!isAgreed || isLoading}
					>
						<Text style={styles.registerButtonText}>
							{isLoading ? 'Registering...' : 'Register'}
						</Text>
					</TouchableOpacity>
				</View>

				<CustomLink
					style={styles.loginLink}
					href="/login"
					text="I already have an account. Login..."
				/>
			</View>
		</View>
	);
};

export default Registration;

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
	form: {
		alignSelf: 'stretch',
	},
	successMessage: {
		color: COLORS.green,
		textAlign: 'center',
		marginBottom: 10,
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: GAPS.g16,
	},
	checkbox: {
		width: 20,
		height: 20,
		borderWidth: 2,
		borderColor: COLORS.grey,
		marginRight: GAPS.g8,
		borderRadius: 4,
	},
	checkboxChecked: {
		backgroundColor: COLORS.primary,
		borderColor: COLORS.primary,
	},
	checkboxLabel: {
		color: COLORS.grey,
		fontSize: 14,
	},
	privacyPolicyLink: {
		color: COLORS.primary,
		textDecorationLine: 'underline',
	},
	registerButton: {
		backgroundColor: COLORS.primary,
		paddingVertical: GAPS.g16,
		borderRadius: 10,
		alignItems: 'center',
		marginTop: GAPS.g16,
	},
	registerButtonDisabled: {
		backgroundColor: COLORS.grey,
	},
	registerButtonText: {
		color: COLORS.white,
		fontSize: 16,
	},
	loginLink: {
		color: COLORS.primary,
		textAlign: 'center',
		marginTop: GAPS.g16,
	},
});
