import { COLORS, FONTS, GAPS, RADIUS } from '@/shared/tokens';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import DeleteTaskModal from './delete-task-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'expo-router'; // ✅ Добавляем роутер

interface TaskItemProps {
	id: number;
	title: string;
	description?: string;
	statusId: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, description, statusId }) => {
	const [isModalVisible, setModalVisible] = useState(false);
	const router = useRouter(); // ✅ Инициализация роутера

	// ✅ Получаем список статусов задач из Redux-стора
	const statuses = useSelector((state: RootState) => state.status.statuses);

	// ✅ Находим статус по переданному ID
	const statusName =
		statuses.find((s) => s.status_task[0] === statusId)?.status_task[1] || 'Неизвестно';

	// ✅ Функция для определения цвета статуса
	const getStatusColor = (statusId: number) => {
		switch (statusId) {
			case 0:
				return COLORS.yellow;
			case 1:
				return COLORS.green;
			case 2:
				return COLORS.orange;
			case 3:
				return COLORS.Aqua;
			default:
				return COLORS.grey;
		}
	};

	// ✅ Обработчик клика на задачу для перехода на страницу деталей
	const handleTaskPress = () => {
		router.push(`/privat/task/${id}`);
	};

	return (
		<TouchableOpacity onPress={handleTaskPress} style={styles.taskItem}>
			<View style={styles.taskContent}>
				{/* Текстовый блок */}
				<View style={styles.textBlock}>
					{/* ✅ Ограничение заголовка до 2 строк с многоточием */}
					<Text style={styles.taskTitle} numberOfLines={2} ellipsizeMode="tail">
						{title}
					</Text>
					{/* ✅ Ограничение описания до 4 строк с многоточием */}
					{description && (
						<Text style={styles.taskDescription} numberOfLines={4} ellipsizeMode="tail">
							{description}
						</Text>
					)}
				</View>

				{/* Статус и кнопка удаления */}
				<View style={styles.statusContainer}>
					<Text style={[styles.taskStatus, { backgroundColor: getStatusColor(statusId) }]}>
						{statusName}
					</Text>

					<TouchableOpacity onPress={() => setModalVisible(true)} style={styles.deleteButton}>
						<Image source={require('@/assets/images/delete.png')} style={styles.deleteIcon} />
					</TouchableOpacity>
				</View>
			</View>

			{/* Модалка подтверждения удаления */}
			<DeleteTaskModal
				visible={isModalVisible}
				onClose={() => setModalVisible(false)}
				id={id}
				taskTitle={title}
			/>
		</TouchableOpacity>
	);
};

export default TaskItem;

const styles = StyleSheet.create({
	taskItem: {
		backgroundColor: COLORS.violetDark,
		padding: GAPS.g16,
		borderRadius: RADIUS.r10,
		marginBottom: GAPS.g16,
	},
	taskContent: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	textBlock: {
		flex: 1,
		marginRight: GAPS.g8,
	},
	taskTitle: {
		color: COLORS.white,
		fontSize: FONTS.f18,
		fontFamily: FONTS.semibold,
		marginBottom: 4,
	},
	taskDescription: {
		color: COLORS.grey,
		fontSize: FONTS.f16,
		fontFamily: FONTS.regular,
		marginBottom: 4,
	},
	statusContainer: {
		alignItems: 'flex-end',
	},
	taskStatus: {
		color: COLORS.black,
		fontSize: FONTS.f16,
		fontFamily: FONTS.semibold,
		paddingVertical: GAPS.g4,
		paddingHorizontal: GAPS.g8,
		borderRadius: RADIUS.r10,
		marginBottom: GAPS.g8,
		textAlign: 'center',
	},
	deleteButton: {
		alignSelf: 'flex-end',
		padding: GAPS.g8,
	},
	deleteIcon: {
		width: 30,
		height: 30,
		resizeMode: 'contain',
	},
});
