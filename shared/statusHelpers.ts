// utils/statusHelpers.ts
import { COLORS } from '@/shared/tokens';

export const getStatusColor = (statusId: number) => {
	switch (statusId) {
		case 0:
			return COLORS.yellow;
		case 1:
			return COLORS.green;
		case 2:
			return COLORS.orange;
		case 3:
			return COLORS.Aqua;
		default:
			return COLORS.grey;
	}
};
