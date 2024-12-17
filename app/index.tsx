import Button from '@/shared/button/Button';
import ErrorNotification from '@/shared/errorNotification/ErrorNotification';
import Input from '@/shared/input/Input';
import { COLORS, GAPS } from '@/shared/tokens';
import { Link } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Login = () => {
	const [error, setError] = useState<string | undefined>();

	const alert = () => {
		setError('asdfasfsafasfasf');
		setTimeout(() => {
			setError(undefined);
		}, 4000);
	};
	return (
		<View style={styles.container}>
			<ErrorNotification error={error} />
			<View style={styles.content}>
				<View style={styles.logo}>
					<Image source={require('../assets/images/logo.png')} style={styles.logoImg} />
					<Text style={styles.logoTxt}>MobDan</Text>
				</View>
				<View style={styles.form}>
					<Input placeholder="Email" />
					<Input isPassword placeholder="Password" />
					<Button text="Войти" onPress={alert} />
				</View>
				<Link href={'/restore'}>
					<Text style={styles.helpTxt}>Восстановить пароль</Text>
				</Link>
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
	helpTxt: {
		fontFamily: 'Fira Sans',
		fontSize: 18,
		fontWeight: '400',
		fontStyle: 'normal',
		textAlign: 'center',
		color: COLORS.link,
	},
});
