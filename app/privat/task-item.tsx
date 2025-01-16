import { COLORS, FONTS, GAPS, RADIUS } from '@/shared/tokens';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import DeleteTaskModal from './delete-task-modal';
import { useRouter } from 'expo-router';
import StatusBadge from '@/shared/status/StatusBadge';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface TaskItemProps {
	id: number;
	title: string;
	description?: string;
	statusId: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, description, statusId }) => {
	const [isModalVisible, setModalVisible] = useState(false);
	const router = useRouter();
	const task = useSelector((state: RootState) =>
		state.tasks.tasks.find((t) => t.id === Number(id)),
	);
	const statuses = useSelector((state: RootState) => state.status.statuses);

	const statusName =
		statuses.find((s) => s.status_task[0] === task?.status_task)?.status_task[1] ||
		'Unknown status';
	const handleTaskPress = () => {
		router.push(`/privat/task/${id}`);
	};

	return (
		<TouchableOpacity onPress={handleTaskPress} style={styles.taskItem}>
			<View style={styles.taskContent}>
				<View style={styles.textBlock}>
					<Text style={styles.taskTitle} numberOfLines={2} ellipsizeMode="tail">
						{title}
					</Text>
					{description && (
						<Text style={styles.taskDescription} numberOfLines={4} ellipsizeMode="tail">
							{description}
						</Text>
					)}
				</View>

				<View style={styles.statusContainer}>
					<StatusBadge statusId={statusId} statusName={statusName} />
					<TouchableOpacity onPress={() => setModalVisible(true)} style={styles.deleteButton}>
						<Image source={require('@/assets/images/delete.png')} style={styles.deleteIcon} />
					</TouchableOpacity>
				</View>
			</View>

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
