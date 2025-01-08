import { Redirect } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function Index() {
	// Получаем токен из Redux Store
	const accessToken = useSelector((state: RootState) => state.auth.access_token);

	// Если токен есть, перенаправляем на защищенные страницы
	if (accessToken) {
		return <Redirect href="/privat" />;
	}

	// Если токена нет, перенаправляем на страницу логина
	return <Redirect href="/login" />;
}
