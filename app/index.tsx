import { Redirect } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function Index() {
	const accessToken = useSelector((state: RootState) => state.auth.access_token);

	if (accessToken) {
		return <Redirect href="/privat" />;
	}

	return <Redirect href="/login" />;
}
