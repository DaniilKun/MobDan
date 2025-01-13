import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, GAPS, RADIUS } from '@/shared/tokens';

interface LogoutConfirmationModalProps {
	visible: boolean;
	title?: string;
	description?: string;
	onConfirm: () => void;
	onCancel: () => void;
}

const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
	visible,
	title = 'Are you sure you want to get out?',
	description = 'You will be redirected to the login page.',
	onConfirm,
	onCancel,
}) => {
	return (
		<Modal visible={visible} transparent animationType="fade">
			<View style={styles.overlay}>
				<View style={styles.modalContainer}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.description}>{description}</Text>
					<View style={styles.buttonsContainer}>
						<TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
							<Text style={styles.buttonText}>Yes</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
							<Text style={styles.buttonText}>No</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default LogoutConfirmationModal;

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.backFon,
	},
	modalContainer: {
		width: '80%',
		backgroundColor: COLORS.violetDark,
		padding: GAPS.g16,
		borderRadius: RADIUS.r10,
		alignItems: 'center',
	},
	title: {
		color: COLORS.white,
		fontSize: FONTS.f18,
		fontFamily: FONTS.semibold,
		marginBottom: GAPS.g8,
	},
	description: {
		color: COLORS.grey,
		fontSize: FONTS.f16,
		fontFamily: FONTS.regular,
		marginBottom: GAPS.g16,
		textAlign: 'center',
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	confirmButton: {
		flex: 1,
		backgroundColor: COLORS.red,
		padding: GAPS.g16,
		borderRadius: RADIUS.r10,
		marginRight: GAPS.g8,
		alignItems: 'center',
	},
	cancelButton: {
		flex: 1,
		backgroundColor: COLORS.grey,
		padding: GAPS.g16,
		borderRadius: RADIUS.r10,
		alignItems: 'center',
	},
	buttonText: {
		color: COLORS.white,
		fontSize: FONTS.f16,
		fontFamily: FONTS.semibold,
	},
});
