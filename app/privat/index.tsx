import { useAuthCheck } from '@/hooks/useAuthCheck';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { fetchOrganization } from '@/entities/organization/model/organizationSlice';

export default function HomePage() {
	// Проверка авторизации
	useAuthCheck();

	// Используем роутер и dispatch
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		// Загружаем данные о существующей организации при старте приложения
		dispatch(fetchOrganization())
			.unwrap()
			.then((res) => {
				if (res) {
					router.replace('/privat/tasks'); // Если организация есть, перенаправляем на задачи
				} else {
					router.replace('/privat/create-organization'); // Если нет, перенаправляем на создание организации
				}
			})
			.catch((err) => {
				console.error('❌ Error receiving the organization:', err);
				router.replace('/login');
			});
	}, [dispatch, router]);

	return null;
}
