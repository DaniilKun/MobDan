import { COLORS } from '@/shared/tokens';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import Loader from '@/shared/loader/Loader';
import { StoreProvider } from '@/providers/StoreProvider';

export default function RootLayout() {
	const insets = useSafeAreaInsets();

	// Загружаем шрифты
	const [loaded, errorFont] = useFonts({
		FiraSans: require('../assets/fonts/FiraSans-Regular.ttf'),
		FiraSansSemiBold: require('../assets/fonts/FiraSans-SemiBold.ttf'),
	});

	// Если шрифты не загружены, показываем SplashScreen
	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	// Если произошла ошибка при загрузке шрифтов
	useEffect(() => {
		if (errorFont) {
			throw errorFont;
		}
	}, [errorFont]);

	// Если шрифты еще не загружены, показываем загрузочный экран
	if (!loaded) {
		return <Loader />;
	}

	return (
		<StoreProvider>
			<SafeAreaProvider>
				<StatusBar barStyle={'light-content'} />
				<Stack
					screenOptions={{
						statusBarBackgroundColor: COLORS.black,
						contentStyle: { backgroundColor: COLORS.black, paddingTop: insets.top },
						headerShown: false,
					}}
				>
					{/* <Stack.Screen name="index" /> */}
					<Stack.Screen name="login" />
					<Stack.Screen name="registration" />
					<Stack.Screen
						name="restore"
						// options={{ headerShown: false }}
					/>
				</Stack>
			</SafeAreaProvider>
		</StoreProvider>
	);
}
