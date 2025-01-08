import { Link, LinkProps } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { COLORS, FONTS } from '../tokens';

export default function CustomLink({ text, ...props }: LinkProps & { text: string }) {
	return (
		<Link {...props}>
			<Text style={styles.link}>{text}</Text>
		</Link>
	);
}

const styles = StyleSheet.create({
	link: {
		fontSize: FONTS.f18,
		color: COLORS.link,
		fontFamily: FONTS.regular,
	},
});
