import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { COLORS, RADIUS } from '../tokens';
import EyeOpenIcon from '@/assets/icons/eye-open';
import EyeClosedIcon from '@/assets/icons/eye-closed';

const Input = ({ isPassword, ...props }: TextInputProps & { isPassword?: boolean }) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true);
	return (
		<View>
			<TextInput
				secureTextEntry={isPassword && !isPasswordVisible}
				style={styles.input}
				{...props}
				placeholderTextColor={COLORS.grey}
			/>
			{isPassword && (
				<Pressable style={styles.eyeIcon} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
					{isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
				</Pressable>
			)}
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	input: {
		height: 58,
		borderRadius: RADIUS.r10,
		backgroundColor: COLORS.violetDark,
		paddingHorizontal: 24,
		fontSize: 16,
		color: COLORS.grey,
		fontFamily: 'FiraSans',
	},
	eyeIcon: {
		position: 'absolute',
		right: 0,
		paddingHorizontal: 20,
		paddingVertical: 17,
	},
});
