// components/TaskModal.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { COLORS, GAPS, FONTS, RADIUS } from '@/shared/tokens';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { createTask, fetchTasks } from '@/entities/tasks/tasksSlice';

interface AddTaskModalProps {
	visible: boolean;
	onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ visible, onClose }) => {
	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector((state: RootState) => state.user.user);
	const organization = useSelector((state: RootState) => state.organization.organization);

	const [taskName, setTaskName] = useState('');
	const [taskDescription, setTaskDescription] = useState('');

	// ✅ Функция для добавления новой задачи
	const addTask = async () => {
		if (!taskName.trim()) {
			Alert.alert('Ошибка', 'Пожалуйста, заполните название задачи.');
			return;
		}

		if (!user || !organization) {
			Alert.alert('Ошибка', 'Нет данных о пользователе или организации.');
			return;
		}

		try {
			await dispatch(
				createTask({
					user: user.id,
					organization: organization.id,
					title: taskName.trim(),
					description: taskDescription.trim(),
				}),
			).unwrap();

			Alert.alert('Успех', 'Задача успешно создана!');

			// Очищаем поля ввода после успешного создания
			setTaskName('');
			setTaskDescription('');
			onClose(); // Закрываем модалку
			dispatch(fetchTasks()); // Перезагружаем список задач
		} catch (error) {
			Alert.alert('Ошибка', error?.toString() || 'Не удалось создать задачу.');
		}
	};

	return (
		<Modal visible={visible} animationType="slide" transparent={true}>
			<View style={styles.overlay}>
				<View style={styles.modalContent}>
					<Text style={styles.title}>Создание новой задачи</Text>
					<TextInput
						placeholder="Название задачи"
						value={taskName}
						onChangeText={setTaskName}
						style={styles.input}
						placeholderTextColor={COLORS.grey}
					/>
					<TextInput
						placeholder="Описание задачи (необязательно)"
						value={taskDescription}
						onChangeText={setTaskDescription}
						style={styles.input}
						placeholderTextColor={COLORS.grey}
					/>
					<TouchableOpacity onPress={addTask} style={styles.button}>
						<Text style={styles.buttonText}>Создать</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={onClose} style={styles.closeButton}>
						<Text style={styles.closeButtonText}>Закрыть</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

export default AddTaskModal;

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.backFon,
	},
	modalContent: {
		width: '90%',
		backgroundColor: COLORS.violetDark,
		borderRadius: RADIUS.r10,
		padding: GAPS.g16,
	},
	title: {
		color: COLORS.white,
		fontSize: FONTS.f24,
		fontFamily: FONTS.semibold,
		textAlign: 'center',
		marginBottom: GAPS.g16,
	},
	input: {
		height: 50,
		backgroundColor: COLORS.black,
		borderRadius: RADIUS.r10,
		paddingHorizontal: GAPS.g16,
		color: COLORS.white,
		fontFamily: FONTS.regular,
		marginBottom: GAPS.g16,
	},
	button: {
		backgroundColor: COLORS.primary,
		paddingVertical: GAPS.g16,
		borderRadius: RADIUS.r10,
		alignItems: 'center',
	},
	buttonText: {
		color: COLORS.white,
		fontSize: FONTS.f16,
		fontFamily: FONTS.semibold,
	},
	closeButton: {
		marginTop: GAPS.g16,
		alignItems: 'center',
	},
	closeButtonText: {
		color: COLORS.grey,
		fontSize: FONTS.f16,
		fontFamily: FONTS.regular,
	},
});
