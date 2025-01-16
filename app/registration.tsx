import Button from '@/shared/button/Button';
import CustomLink from '@/shared/customLink/CustomLink';
import ErrorNotification from '@/shared/errorNotification/ErrorNotification';
import Input from '@/shared/input/Input';
import { COLORS, GAPS } from '@/shared/tokens';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { registration } from '@/entities/auth/model/registrationSlice';

interface RegistrationForm {
	username: string;
	email: string;
	password: string;
}

const Registration = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { isLoading, error, message } = useSelector((state: RootState) => state.registration);

	const { handleSubmit, control, reset } = useForm<RegistrationForm>({
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
	});

	// ✅ Обработка отправки формы
	const onSubmit: SubmitHandler<RegistrationForm> = async (data) => {
		try {
			console.log('📤 Отправка данных формы:', data);
			const response = await dispatch(registration(data)).unwrap();
			console.log('✅ Регистрация успешна:', response);
			reset(); // Сброс формы
		} catch (error) {
			console.error('❌ Registration error:', error);
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
					<Button
						text={isLoading ? 'Registration...' : 'Register'}
						onPress={handleSubmit(onSubmit)}
						disabled={isLoading}
					/>
				</View>
				<CustomLink href="/login" text="I already have an account. Enter..." />
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
		gap: GAPS.g50,
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
		gap: GAPS.g16,
	},
	successMessage: {
		color: COLORS.green,
		textAlign: 'center',
		marginBottom: 10,
	},
});
