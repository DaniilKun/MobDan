import { useAuthCheck } from '@/hooks/useAuthCheck';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { fetchOrganization } from '@/entities/organization/model/organizationSlice';

export default function HomePage() {
	useAuthCheck();

	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchOrganization())
			.unwrap()
			.then((res) => {
				if (res) {
					router.replace('/privat/tasks');
				} else {
					router.replace('/privat/create-organization');
				}
			})
			.catch(() => {
				router.replace('/login');
			});
	}, [dispatch, router]);

	return null;
}
