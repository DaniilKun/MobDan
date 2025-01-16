import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { COLORS, FONTS, GAPS, RADIUS } from '@/shared/tokens';

interface EditProfileModalProps {
	visible: boolean;
	onClose: () => void;
	onSave: (username: string, email: string) => void;
	initialUsername: string;
	initialEmail: string;
}

export default function EditProfileModal({
	visible,
	onClose,
	onSave,
	initialUsername,
	initialEmail,
}: EditProfileModalProps) {
	const [username, setUsername] = useState(initialUsername);
	const [email, setEmail] = useState(initialEmail);

	const handleSave = () => {
		if (!username.trim() || !email.trim()) {
			Alert.alert('All fields are required to fill in');
			return;
		}
		onSave(username.trim(), email.trim());
		onClose();
	};

	return (
		<Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Text style={styles.modalTitle}>Edit Profile</Text>

					<TextInput
						style={styles.input}
						value={username}
						onChangeText={setUsername}
						placeholder="Enter a new username"
						placeholderTextColor={COLORS.grey}
					/>

					<TextInput
						style={styles.input}
						value={email}
						onChangeText={setEmail}
						placeholder="Enter a new email address"
						placeholderTextColor={COLORS.grey}
					/>

					{/* ✅ Кнопки на одном уровне */}
					<View style={styles.buttonContainer}>
						<TouchableOpacity onPress={handleSave} style={styles.saveButton}>
							<Text style={styles.saveButtonText}>Save</Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={onClose} style={styles.cancelButton}>
							<Text style={styles.cancelButtonText}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.backFon,
	},
	modalContent: {
		backgroundColor: COLORS.black,
		padding: GAPS.g16,
		borderRadius: RADIUS.r10,
		width: '80%',
	},
	modalTitle: {
		color: COLORS.white,
		fontSize: FONTS.f18,
		fontFamily: FONTS.semibold,
		marginBottom: GAPS.g16,
		textAlign: 'center',
	},
	input: {
		backgroundColor: COLORS.violetDark,
		color: COLORS.white,
		padding: GAPS.g8,
		borderRadius: RADIUS.r10,
		marginBottom: GAPS.g16,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	saveButton: {
		backgroundColor: COLORS.green,
		paddingVertical: GAPS.g16,
		paddingHorizontal: GAPS.g16,
		borderRadius: RADIUS.r10,
		flex: 1,
		marginRight: GAPS.g8,
		alignItems: 'center',
	},
	saveButtonText: {
		color: COLORS.black,
		fontSize: FONTS.f18,
		fontFamily: FONTS.regular,
	},
	cancelButton: {
		backgroundColor: COLORS.red,
		paddingVertical: GAPS.g16,
		paddingHorizontal: GAPS.g16,
		borderRadius: RADIUS.r10,
		flex: 1,
		marginLeft: GAPS.g8,
		alignItems: 'center',
	},
	cancelButtonText: {
		color: COLORS.black,
		fontSize: FONTS.f18,
		fontFamily: FONTS.regular,
	},
});
