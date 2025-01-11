import { useAuthCheck } from '@/hooks/useAuthCheck';
import { COLORS, FONTS, GAPS } from '@/shared/tokens';
import React, { useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '@/shared/input/Input';
import Button from '@/shared/button/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { createOrganization } from '@/entities/user/model/userSlice';

interface OrganizationForm {
	name: string;
}

export default function CreateOrganizationPage() {
	// Проверка авторизации
	useAuthCheck();

	// Используем Redux Dispatch
	const dispatch = useDispatch<AppDispatch>();

	// Локальное состояние загрузки
	const [isLoading, setIsLoading] = useState(false);

	// Инициализация формы
	const { control, handleSubmit, reset } = useForm<OrganizationForm>({
		defaultValues: {
			name: '',
		},
	});

	// Обработка отправки формы
	const onSubmit: SubmitHandler<OrganizationForm> = async (data) => {
		setIsLoading(true);
		try {
			await dispatch(createOrganization(data)).unwrap();
			Alert.alert('Успех!', 'Организация успешно создана.');
			reset();
		} catch (err) {
			const errorMessage =
				(err as { message?: string }).message || 'Не удалось создать организацию.';
			Alert.alert('Ошибка!', errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Создание организации</Text>
			<Text style={styles.description}>
				Придумайте название своей организации и после этого Вы сможете управлять и создавать задачки
				для себя
			</Text>
			<View style={styles.form}>
				<Input
					placeholder="Название организации"
					name="name"
					control={control}
					rules={{ required: 'Название обязательно' }}
				/>
				{isLoading ? (
					<ActivityIndicator size="large" color={COLORS.primary} />
				) : (
					<Button text="Создать организацию" onPress={handleSubmit(onSubmit)} />
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.black,
		padding: 20,
		justifyContent: 'center',
	},
	title: {
		color: COLORS.white,
		fontSize: FONTS.f24,
		fontFamily: FONTS.semibold,
		textAlign: 'center',
		marginBottom: GAPS.g50,
	},
	description: {
		color: COLORS.white,
		fontSize: FONTS.f18,
		fontFamily: FONTS.regular,
		textAlign: 'center',
		marginBottom: GAPS.g50,
	},
	form: {
		gap: GAPS.g16,
	},
});
