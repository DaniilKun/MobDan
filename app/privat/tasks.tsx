import { COLORS } from '@/shared/tokens';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function TasksPage() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Тут будут таски!</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.black,
	},
	text: {
		color: COLORS.white,
		fontSize: 24,
		fontWeight: 'bold',
	},
});
