import { ILoginRequest } from '@/entities/auth/model/auth.model';
import Button from '@/shared/button/Button';
import CustomLink from '@/shared/customLink/CustomLink';
import ErrorNotification from '@/shared/errorNotification/ErrorNotification';
import Loader from '@/shared/loader/Loader';
import Input from '@/shared/input/Input';
import { COLORS, GAPS } from '@/shared/tokens';
import { useForm, SubmitHandler } from 'react-hook-form';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { login } from '@/entities/auth/model/authSlice';
import { useRouter } from 'expo-router';
import React from 'react';

const Login = () => {
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const { isLoading, error } = useSelector((state: RootState) => state.auth);

	const { handleSubmit, control } = useForm<ILoginRequest>({
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const onSubmit: SubmitHandler<ILoginRequest> = async (data) => {
		try {
			const result = await dispatch(login(data)).unwrap();
			console.log('✅ Authorization is successful:', result);
			router.replace('/privat');
		} catch (err) {
			console.error('❌ Authorization error:', err);
		}
	};

	return (
		<View style={styles.container}>
			<ErrorNotification error={error} />
			<View style={styles.content}>
				<View style={styles.logo}>
					<Image source={require('../assets/images/logo.png')} style={styles.logoImg} />
					<Text style={styles.logoTxt}>MobDan</Text>
				</View>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<View style={styles.form}>
							<Input
								name="username"
								control={control}
								placeholder="Username"
								rules={{ required: 'The user name is required' }}
							/>
							<Input
								name="password"
								control={control}
								placeholder="Password"
								isPassword
								rules={{ required: 'A password is required' }}
							/>
							<Button text="Login" onPress={handleSubmit(onSubmit)} />
						</View>
						<CustomLink href="/registration" text="No account? To create..." />
					</>
				)}
			</View>
		</View>
	);
};

export default Login;

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
});
