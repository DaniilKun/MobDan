import { COLORS } from '@/shared/tokens';
import { Link } from 'expo-router';
import { Text } from 'react-native';

const Restore = () => {
	return (
		<Link href={'/'}>
			<Text style={{ color: COLORS.white }}>Restore</Text>
		</Link>
	);
};

export default Restore;
