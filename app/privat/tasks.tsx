import { COLORS, GAPS, FONTS } from '@/shared/tokens';
import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';

export default function TasksPage() {
	const [tasks, setTasks] = useState<string[]>([]);
	const [taskName, setTaskName] = useState('');

	// Добавление новой задачи
	const addTask = () => {
		if (taskName.trim()) {
			setTasks((prevTasks) => [...prevTasks, taskName.trim()]);
			setTaskName('');
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Ваши задачи</Text>

			{/* Форма создания задачи */}
			<View style={styles.form}>
				<TextInput
					placeholder="Название задачи"
					value={taskName}
					onChangeText={setTaskName}
					style={styles.input}
					placeholderTextColor={COLORS.grey}
				/>
				<TouchableOpacity onPress={addTask} style={styles.button}>
					<Text style={styles.buttonText}>Добавить</Text>
				</TouchableOpacity>
			</View>
			{/* Список задач */}
			<FlatList
				data={tasks}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<View style={styles.taskItem}>
						<Text style={styles.taskText}>{item}</Text>
					</View>
				)}
				ListEmptyComponent={<Text style={styles.emptyText}>Задач пока нет. Создайте первую!</Text>}
			/>
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
		marginTop: GAPS.g16,
		marginBottom: GAPS.g16,
	},
	taskItem: {
		backgroundColor: COLORS.violetDark,
		padding: GAPS.g16,
		borderRadius: GAPS.g16,
		marginBottom: GAPS.g16,
	},
	taskText: {
		color: COLORS.white,
		fontSize: FONTS.f18,
		fontFamily: FONTS.regular,
	},
	emptyText: {
		color: COLORS.grey,
		fontSize: FONTS.f16,
		fontFamily: FONTS.regular,
		textAlign: 'center',
		marginTop: GAPS.g50,
	},
	form: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: GAPS.g16,
		marginTop: GAPS.g16,
	},
	input: {
		flex: 1,
		height: 50,
		backgroundColor: COLORS.violetDark,
		borderRadius: GAPS.g16,
		paddingHorizontal: GAPS.g16,
		color: COLORS.white,
		fontFamily: FONTS.regular,
	},
	button: {
		backgroundColor: COLORS.primary,
		paddingHorizontal: GAPS.g16,
		paddingVertical: GAPS.g16,
		borderRadius: GAPS.g16,
	},
	buttonText: {
		color: COLORS.white,
		fontSize: FONTS.f16,
		fontFamily: FONTS.semibold,
	},
});
