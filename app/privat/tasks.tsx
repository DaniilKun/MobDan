// components/TasksPage.tsx
import { COLORS, GAPS, FONTS } from '@/shared/tokens';
import React, { useEffect, useState } from 'react';
import {
	Text,
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchTasks } from '@/entities/tasks/tasksSlice';
import AddTaskModal from './add-task-modal';
import TaskItem from './task-item';

export default function TasksPage() {
	const dispatch = useDispatch<AppDispatch>();
	const { tasks, isLoading } = useSelector((state: RootState) => state.tasks);

	const [isModalVisible, setIsModalVisible] = useState(false);

	// ✅ Загружаем список задач при первом рендере
	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch]);

	// ✅ Показываем лоадер, если идет загрузка задач
	if (isLoading) {
		return (
			<View style={styles.loaderContainer}>
				<ActivityIndicator size="large" color={COLORS.primary} />
				<Text style={styles.loaderText}>Loading tasks...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{/* Кнопка для открытия модального окна */}
			<TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.addButton}>
				<Text style={styles.addButtonText}>Create a task</Text>
			</TouchableOpacity>
			<Text style={styles.title}>Your tasks</Text>

			{/* Список задач */}
			<FlatList
				data={tasks}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<TaskItem
						statusId={item.status_task}
						id={item.id}
						title={item.title}
						description={item.description}
					/>
				)}
				ListEmptyComponent={<Text style={styles.emptyText}>There are no tasks yet. Create the first one!</Text>}
			/>

			{/* Модальное окно */}
			<AddTaskModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.black,
		padding: 20,
	},
	title: {
		color: COLORS.white,
		fontSize: FONTS.f24,
		fontFamily: FONTS.semibold,
		textAlign: 'center',
		marginBottom: GAPS.g16,
	},
	addButton: {
		backgroundColor: COLORS.primary,
		paddingVertical: GAPS.g16,
		borderRadius: GAPS.g16,
		alignItems: 'center',
		marginBottom: GAPS.g16,
	},
	addButtonText: {
		color: COLORS.white,
		fontSize: FONTS.f16,
		fontFamily: FONTS.semibold,
	},
	emptyText: {
		color: COLORS.grey,
		fontSize: FONTS.f16,
		fontFamily: FONTS.regular,
		textAlign: 'center',
		marginTop: GAPS.g16,
	},
	loaderContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.black,
	},
	loaderText: {
		color: COLORS.white,
		fontSize: FONTS.f16,
		fontFamily: FONTS.regular,
		marginTop: GAPS.g16,
	},
});
