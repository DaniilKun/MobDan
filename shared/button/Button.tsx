import {
	Animated,
	GestureResponderEvent,
	Pressable,
	PressableProps,
	StyleSheet,
	Text,
} from 'react-native';
import { COLORS, FONTS, RADIUS } from '../tokens';

const Button = ({ text, ...props }: PressableProps & { text: string }) => {
	const animatedValue = new Animated.Value(100);
	const color = animatedValue.interpolate({
		inputRange: [0, 100],
		outputRange: [COLORS.primaryHover, COLORS.primary],
	});

	const fadeIn = (e: GestureResponderEvent) => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 100,
			useNativeDriver: true,
		}).start();
		props.onPressIn?.(e);
	};
	const fadeOut = (e: GestureResponderEvent) => {
		Animated.timing(animatedValue, {
			toValue: 100,
			duration: 100,
			useNativeDriver: true,
		}).start();
		props.onPressOut?.(e);
	};

	return (
		<Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut}>
			<Animated.View
				style={{
					...styles.btn,
					backgroundColor: color,
				}}
			>
				<Text style={styles.txt}>{text}</Text>
			</Animated.View>
		</Pressable>
	);
};

export default Button;

const styles = StyleSheet.create({
	btn: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: RADIUS.r10,
		height: 58,
	},
	txt: {
		color: COLORS.white,
		fontSize: FONTS.f18,
		fontFamily: 'FiraSans',
	},
});
