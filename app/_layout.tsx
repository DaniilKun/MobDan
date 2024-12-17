import { COLORS } from '@/shared/tokens';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const insets = useSafeAreaInsets();
	const [loaded, errorFont] = useFonts({
		FiraSans: require('../assets/fonts/FiraSans-Regular.ttf'),
		FiraSansSemiBold: require('../assets/fonts/FiraSans-SemiBold.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	useEffect(() => {
		if (errorFont) {
			throw errorFont;
		}
	}, [errorFont]);

	if (!loaded) {
		return null;
	}
	return (
		<SafeAreaProvider>
			<StatusBar barStyle={'light-content'} />
			<Stack
				screenOptions={{
					statusBarBackgroundColor: COLORS.black,
					contentStyle: { backgroundColor: COLORS.black, paddingTop: insets.top },
					headerShown: false,
				}}
			>
				<Stack.Screen name="index" />
				<Stack.Screen name="restore" options={{ presentation: 'modal' }} />
			</Stack>
		</SafeAreaProvider>
	);
}
