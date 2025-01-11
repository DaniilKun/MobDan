import CustomLink from '@/shared/customLink/CustomLink';
import { COLORS, FONTS, GAPS } from '@/shared/tokens';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UnmatchedCustom() {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Image source={require('../assets/images/page404.png')} style={styles.logoImg} />
				<Text style={styles.logoTxt}>
					Ооо... что-то пошло не так. Попробуйте вернуться на главный экран приложения
				</Text>
				<CustomLink href={'/privat'} text="На главный экран" />
				<CustomLink href={'/login'} text="Login" />
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 55,
		justifyContent: 'center',
	},
	content: {
		alignItems: 'center',
		gap: GAPS.g50,
	},
	logoImg: {
		width: 300,
		height: 300,
	},
	logoTxt: {
		color: COLORS.white,
		fontFamily: FONTS.regular,
		fontSize: FONTS.f18,
		textAlign: 'center',
	},
});
