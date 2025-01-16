import { COLORS, FONTS, GAPS, RADIUS } from '@/shared/tokens';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { useRouter } from 'expo-router';
import { logout } from '@/entities/auth/model/authSlice';
import LogoutConfirmationModal from './modal-exit';
import { deleteUser, fetchUser, updateUser } from '@/entities/user/userSlice';
import EditProfileModal from './modal-edit-profile';

export default function Profile() {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();

	const user = useSelector((state: RootState) => state.user.user);

	const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
	const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
	const [isEditModalVisible, setEditModalVisible] = useState(false);

	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	const handleGoBack = () => {
		router.back();
	};

	const handleLogout = () => {
		dispatch(logout());
		router.replace('/login');
	};

	const handleDeleteUser = () => {
		dispatch(deleteUser())
			.unwrap()
			.then(() => {
				alert('Account successfully deleted');
				router.replace('/login');
			})
			.catch((error) => {
				alert(`Account deletion error: ${error}`);
			});
	};

	const handleSaveChanges = (username: string, email: string) => {
		dispatch(updateUser({ username, email }))
			.unwrap()
			.then(() => {
				Alert.alert('Profile has been successfully updated');
			})
			.catch((error) => {
				Alert.alert(`Profile update error: ${error}`);
			});
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
				<Text style={styles.backButtonText}>← Назад</Text>
			</TouchableOpacity>

			<View style={styles.profileContainer}>
				<Image source={require('@/assets/images/Profile.png')} style={styles.profileIcon} />
				<Text style={styles.username}>{user?.username || 'Name not found'}</Text>
			</View>

			<View style={styles.infoContainer}>
				<Text style={styles.infoLabel}>Email:</Text>
				<Text style={styles.infoValue}>{user?.email || 'Email not found'}</Text>

				<Text style={styles.infoLabel}>Username:</Text>
				<Text style={styles.infoValue}>{user?.username || 'Name not found'}</Text>
			</View>

			<TouchableOpacity onPress={() => setEditModalVisible(true)} style={styles.editButton}>
				<Text style={styles.editButtonText}>Edit Profile</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => router.push('/privat/profile/change-password')}
				style={styles.passwordButton}
			>
				<Text style={styles.passwordButtonText}>Change password</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => setLogoutModalVisible(true)} style={styles.logoutButton}>
				<Text style={styles.logoutButtonText}>EXIT</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => setDeleteModalVisible(true)} style={styles.deleteButton}>
				<Text style={styles.deleteButtonText}>Delete an account</Text>
			</TouchableOpacity>

			<LogoutConfirmationModal
				visible={isLogoutModalVisible}
				onConfirm={handleLogout}
				onCancel={() => setLogoutModalVisible(false)}
			/>

			<LogoutConfirmationModal
				visible={isDeleteModalVisible}
				title="Are you sure you want to delete your account?"
				description="This action cannot be canceled."
				onConfirm={handleDeleteUser}
				onCancel={() => setDeleteModalVisible(false)}
			/>

			<EditProfileModal
				visible={isEditModalVisible}
				onClose={() => setEditModalVisible(false)}
				onSave={handleSaveChanges}
				initialUsername={user?.username || ''}
				initialEmail={user?.email || ''}
			/>
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
	profileContainer: {
		alignItems: 'center',
		marginBottom: GAPS.g16,
	},
	profileIcon: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginBottom: GAPS.g8,
	},
	username: {
		color: COLORS.white,
		fontSize: FONTS.f24,
		fontFamily: FONTS.semibold,
		textAlign: 'center',
	},
	infoContainer: {
		backgroundColor: COLORS.violetDark,
		padding: GAPS.g16,
		borderRadius: RADIUS.r10,
		marginBottom: GAPS.g16,
	},
	infoLabel: {
		color: COLORS.white,
		fontSize: FONTS.f18,
		fontFamily: FONTS.semibold,
		marginBottom: GAPS.g4,
	},
	infoValue: {
		color: COLORS.grey,
		fontSize: FONTS.f16,
		fontFamily: FONTS.regular,
		marginBottom: GAPS.g16,
	},
	editButton: {
		backgroundColor: COLORS.primary,
		paddingVertical: GAPS.g16,
		paddingHorizontal: GAPS.g8,
		borderRadius: RADIUS.r10,
		alignItems: 'center',
		marginTop: GAPS.g8,
	},
	editButtonText: {
		color: COLORS.white,
		fontSize: FONTS.f18,
		fontFamily: FONTS.semibold,
	},
	passwordButton: {
		backgroundColor: COLORS.blue,
		paddingVertical: GAPS.g16,
		paddingHorizontal: GAPS.g8,
		borderRadius: RADIUS.r10,
		alignItems: 'center',
		marginTop: GAPS.g8,
	},
	passwordButtonText: {
		color: COLORS.white,
		fontSize: FONTS.f18,
		fontFamily: FONTS.semibold,
	},
	logoutButton: {
		backgroundColor: COLORS.orange,
		paddingVertical: GAPS.g16,
		paddingHorizontal: GAPS.g8,
		borderRadius: RADIUS.r10,
		alignItems: 'center',
		marginTop: GAPS.g8,
	},
	logoutButtonText: {
		color: COLORS.white,
		fontSize: FONTS.f18,
		fontFamily: FONTS.semibold,
	},
	deleteButton: {
		backgroundColor: COLORS.red,
		paddingVertical: GAPS.g16,
		paddingHorizontal: GAPS.g8,
		borderRadius: RADIUS.r10,
		alignItems: 'center',
		marginTop: GAPS.g8,
	},
	deleteButtonText: {
		color: COLORS.white,
		fontSize: FONTS.f18,
		fontFamily: FONTS.semibold,
	},
});
