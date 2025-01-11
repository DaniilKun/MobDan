import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchTasks } from '@/entities/tasks/tasksSlice';
import { COLORS, FONTS, GAPS } from '@/shared/tokens';

export default function TaskDetails() {
	const { id } = useLocalSearchParams(); // Получаем параметр id из маршрута
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();

	// Получаем задачу из Redux-стора
	const task = useSelector((state: RootState) =>
		state.tasks.tasks.find((t) => t.id === Number(id)),
	);

	// Загружаем задачи при первом рендере
	useEffect(() => {
		if (!task) {
			dispatch(fetchTasks());
		}
	}, [dispatch, task]);

	// ✅ Если задача загружается, показываем лоадер
	if (!task) {
		return (
			<View style={styles.loaderContainer}>
				<ActivityIndicator size="large" color={COLORS.primary} />
				<Text style={styles.loaderText}>Загрузка задачи...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{/* ✅ Кнопка "Назад" */}
			<TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
				<Text style={styles.backButtonText}>← Назад</Text>
			</TouchableOpacity>

			<Text style={styles.title}>Название: {task.title}</Text>
			<Text style={styles.description}>Описание: {task.description || 'Описание отсутствует'}</Text>
			<Text style={styles.status}>Статус: {task.status_task}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.black,
		padding: GAPS.g16,
	},
	backButton: {
		backgroundColor: COLORS.violetDark,
		padding: GAPS.g8,
		borderRadius: GAPS.g8,
		alignSelf: 'flex-start',
		marginBottom: GAPS.g16,
	},
	backButtonText: {
		color: COLORS.white,
		fontSize: FONTS.f16,
		fontFamily: FONTS.semibold,
	},
	title: {
		color: COLORS.white,
		fontSize: FONTS.f24,
		fontFamily: FONTS.semibold,
		marginBottom: GAPS.g8,
	},
	description: {
		color: COLORS.grey,
		fontSize: FONTS.f18,
		fontFamily: FONTS.regular,
		marginBottom: GAPS.g16,
	},
	status: {
		color: COLORS.white,
		fontSize: FONTS.f16,
		fontFamily: FONTS.semibold,
	},
	loaderContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.black,
	},
	loaderText: {
		color: COLORS.white,
		fontSize: FONTS.f18,
		fontFamily: FONTS.regular,
		marginTop: GAPS.g16,
	},
});
