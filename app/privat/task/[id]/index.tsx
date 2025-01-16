import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ActivityIndicator,
	TouchableOpacity,
	Image,
	TextInput,
	Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchTasks, updateTask } from '@/entities/tasks/tasksSlice';
import { COLORS, FONTS, GAPS, RADIUS } from '@/shared/tokens';
import { getStatusColor } from '@/shared/statusHelpers';

export default function TaskDetails() {
	const { id } = useLocalSearchParams();
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();

	const task = useSelector((state: RootState) =>
		state.tasks.tasks.find((t) => t.id === Number(id)),
	);
	const statuses = useSelector((state: RootState) => state.status.statuses);

	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [statusId, setStatusId] = useState('0');

	useEffect(() => {
		if (!task) {
			dispatch(fetchTasks());
		} else {
			setTitle(task.title);
			setDescription(task.description || '');
			setStatusId(task.status_task.toString());
		}
	}, [dispatch, task]);

	const handleSave = async () => {
		if (!title.trim()) {
			alert('The task name cannot be empty!');
			return;
		}
		if (!task) {
			alert('The issue was not found!');
			return;
		}

		const taskData = {
			title: title.trim(),
			description: description.trim(),
			status_task: parseInt(statusId, 10),
		};

		try {
			await dispatch(updateTask({ id: task.id, taskData })).unwrap();
			setIsEditing(false);
			Alert.alert('The task has been successfully updated!');
		} catch (error) {
			Alert.alert(`An error occurred when updating the issue. ${error}`);
		}
	};

	if (!task) {
		return (
			<View style={styles.loaderContainer}>
				<ActivityIndicator size="large" color={COLORS.primary} />
				<Text style={styles.loaderText}>Task loading...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
				<Text style={styles.backButtonText}>← Back</Text>
			</TouchableOpacity>

			{!isEditing && (
				<TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
					<Image source={require('@/assets/images/edit.png')} style={styles.editIcon} />
				</TouchableOpacity>
			)}

			{isEditing ? (
				<View>
					<Text style={styles.fieldTitle}>Title:</Text>
					<TextInput
						style={styles.input}
						value={title}
						onChangeText={setTitle}
						placeholder="Enter the name"
						placeholderTextColor={COLORS.grey}
					/>

					<Text style={styles.fieldTitle}>Description:</Text>
					<TextInput
						style={[styles.input, styles.textArea]}
						value={description}
						onChangeText={setDescription}
						placeholder="Enter a description"
						placeholderTextColor={COLORS.grey}
						multiline
					/>

					<Text style={styles.fieldTitle}>Status:</Text>
					<View style={styles.pickerContainer}>
						<Picker
							selectedValue={statusId}
							style={styles.picker}
							dropdownIconColor={COLORS.white}
							mode="dropdown"
							onValueChange={(itemValue) => setStatusId(itemValue)}
						>
							{statuses.map((status) => (
								<Picker.Item
									key={status.status_task[0]}
									label={status.status_task[1]}
									value={status.status_task[0].toString()}
									color={COLORS.white}
								/>
							))}
						</Picker>
					</View>

					<TouchableOpacity onPress={handleSave} style={styles.saveButton}>
						<Text style={styles.saveButtonText}>Save</Text>
					</TouchableOpacity>
				</View>
			) : (
				<View>
					<View style={styles.fieldContainer}>
						<Text style={styles.fieldTitle}>Title:</Text>
						<Text style={styles.fieldValue}>{task.title}</Text>
					</View>

					<View style={styles.fieldContainer}>
						<Text style={styles.fieldTitle}>Description:</Text>
						<Text style={styles.fieldValue}>
							{task.description || 'The description is missing'}
						</Text>
					</View>

					<View style={styles.fieldContainer}>
						<Text style={styles.fieldTitle}>Status:</Text>
						<View
							style={[
								styles.fieldValueStatus,
								{ backgroundColor: getStatusColor(parseInt(statusId, 10)) },
							]}
						>
							<Text>
								{statuses.find((s) => s.status_task[0] === parseInt(statusId, 10))
									?.status_task[1] || 'Is unknown'}
							</Text>
						</View>
					</View>
				</View>
			)}
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
	fieldContainer: {
		backgroundColor: COLORS.violetDark,
		padding: GAPS.g16,
		borderRadius: RADIUS.r10,
		marginBottom: GAPS.g16,
	},
	fieldTitle: {
		color: COLORS.white,
		fontSize: FONTS.f18,
		fontFamily: FONTS.semibold,
		marginBottom: GAPS.g4,
	},
	fieldValue: {
		borderRadius: RADIUS.r10,
		color: COLORS.grey,
		fontSize: FONTS.f16,
		fontFamily: FONTS.regular,
	},
	fieldValueStatus: {
		borderRadius: RADIUS.r10,
		alignItems: 'center',
		justifyContent: 'center',
		color: COLORS.black,
		fontSize: FONTS.f16,
		fontFamily: FONTS.regular,
	},
	input: {
		backgroundColor: COLORS.violetDark,
		color: COLORS.white,
		padding: GAPS.g8,
		borderRadius: RADIUS.r10,
		fontFamily: FONTS.regular,
		marginBottom: GAPS.g16,
	},
	textArea: {
		height: 100,
		textAlignVertical: 'top',
	},
	pickerContainer: {
		backgroundColor: COLORS.violetDark,
		borderRadius: RADIUS.r10,
		marginBottom: GAPS.g16,
	},
	picker: {
		color: COLORS.white,
		height: 200,
		width: '100%',
	},
	editButton: {
		position: 'absolute',
		top: GAPS.g16,
		right: GAPS.g16,
		backgroundColor: COLORS.violetDark,
		padding: GAPS.g8,
		borderRadius: RADIUS.r10,
	},
	editIcon: {
		width: 24,
		height: 24,
		resizeMode: 'contain',
	},
	saveButton: {
		backgroundColor: COLORS.primary,
		paddingVertical: GAPS.g16,
		borderRadius: RADIUS.r10,
		alignItems: 'center',
	},
	saveButtonText: {
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
