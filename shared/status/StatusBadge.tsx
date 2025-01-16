import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import { COLORS, FONTS, GAPS, RADIUS } from '@/shared/tokens';
import { getStatusColor } from '../statusHelpers';

interface StatusBadgeProps {
	statusId: number;
	statusName: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ statusId, statusName }) => {
	return (
		<View style={[styles.badge, { backgroundColor: getStatusColor(statusId) }]}>
			<Text style={styles.badgeText}>{statusName}</Text>
		</View>
	);
};

export default StatusBadge;

const styles = StyleSheet.create({
	badge: {
		paddingVertical: GAPS.g4,
		paddingHorizontal: GAPS.g8,
		borderRadius: RADIUS.r10,
	},
	badgeText: {
		color: COLORS.black,
		fontSize: FONTS.f16,
		fontFamily: FONTS.semibold,
		textAlign: 'center',
	},
});
