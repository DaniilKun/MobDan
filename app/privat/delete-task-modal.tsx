/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { COLORS, FONTS, GAPS, RADIUS } from '@/shared/tokens';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { deleteTask } from '@/entities/tasks/tasksSlice';

interface DeleteTaskModalProps {
	visible: boolean;
	onClose: () => void;
	id: number;
	taskTitle: string;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({ visible, onClose, id, taskTitle }) => {
	const dispatch = useDispatch<AppDispatch>();

	const handleDeleteTask = async () => {
		try {
			await dispatch(deleteTask(id)).unwrap();
			onClose();
		} catch (error) {
			/* empty */
		}
	};

	return (
		<Modal visible={visible} animationType="slide" transparent={true}>
			<View style={styles.overlay}>
				<View style={styles.modalContent}>
					<Text style={styles.title}>Deleting an issue</Text>
					<Text style={styles.description}>
						Are you sure you want to delete the issue? "{taskTitle}"?
					</Text>
					<TouchableOpacity onPress={handleDeleteTask} style={styles.deleteButton}>
						<Text style={styles.buttonText}>Remove</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={onClose} style={styles.cancelButton}>
						<Text style={styles.cancelButtonText}>Cancel</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

export default DeleteTaskModal;

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
	description: {
		color: COLORS.white,
		fontSize: FONTS.f16,
		fontFamily: FONTS.regular,
		textAlign: 'center',
		marginBottom: GAPS.g16,
	},
	deleteButton: {
		backgroundColor: COLORS.red,
		paddingVertical: GAPS.g16,
		borderRadius: RADIUS.r10,
		alignItems: 'center',
		marginBottom: GAPS.g16,
	},
	buttonText: {
		color: COLORS.white,
		fontSize: FONTS.f16,
		fontFamily: FONTS.semibold,
	},
	cancelButton: {
		alignItems: 'center',
	},
	cancelButtonText: {
		color: COLORS.grey,
		fontSize: FONTS.f16,
		fontFamily: FONTS.regular,
	},
});
