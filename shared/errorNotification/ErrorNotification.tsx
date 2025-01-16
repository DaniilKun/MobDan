import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../tokens';
import { ErrorNotificationProps } from './ErrorNotification.props';
import { useEffect, useState } from 'react';

const ErrorNotification = ({ error }: ErrorNotificationProps) => {
	const [isShown, setIsShown] = useState<boolean>(false);
	const animatedValue = new Animated.Value(-100);

	const onEnter = () => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start();
	};

	useEffect(() => {
		if (!error) {
			return;
		}
		setIsShown(true);

		const timerId = setTimeout(() => {
			setIsShown(false);
		}, 3000);
		return () => {
			clearTimeout(timerId);
		};
	}, [error]);

	if (!isShown) {
		return null;
	}

	// Если ошибка - объект, отображаем список ошибок
	const renderErrors = () => {
		if (error && typeof error === 'object' && !Array.isArray(error)) {
			return Object.entries(error).map(([field, messages]) => (
				<View key={field}>
					<Text style={styles.errorField}>
						{field} : {messages}
					</Text>
					{/* {Array.isArray(messages) &&
						messages.map((msg, idx) => (
							<Text key={idx} style={styles.errorTxt}>
								- {msg}
							</Text>
						))} */}
				</View>
			));
		}

		// Если ошибка - строка
		if (typeof error === 'string') {
			return <Text style={styles.errorTxt}>{error}</Text>;
		}

		// Если ошибка не распознается, возвращаем null
		return null;
	};

	return (
		<Animated.View
			style={{ ...styles.error, transform: [{ translateY: animatedValue }] }}
			onLayout={onEnter}
		>
			{renderErrors()}
		</Animated.View>
	);
};

export default ErrorNotification;

const styles = StyleSheet.create({
	error: {
		position: 'absolute',
		top: 0,
		width: Dimensions.get('screen').width,
		backgroundColor: COLORS.red,
		padding: 15,
	},
	errorField: {
		color: COLORS.white,
		fontSize: FONTS.f16,
		textTransform: 'capitalize',
	},
	errorTxt: {
		color: COLORS.white,
		fontSize: FONTS.f16,
	},
});
