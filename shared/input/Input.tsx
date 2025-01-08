import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, TextInputProps, View, Text } from 'react-native';
import { COLORS, RADIUS } from '../tokens';
import EyeOpenIcon from '@/assets/icons/eye-open';
import EyeClosedIcon from '@/assets/icons/eye-closed';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface InputProps<T extends FieldValues> extends TextInputProps {
	name: Path<T>; // ✅ Исправлено: Используем Path<T>
	control: Control<T>;
	isPassword?: boolean;
	rules?: object;
}

const Input = <T extends FieldValues>({
	name,
	control,
	isPassword,
	rules,
	...props
}: InputProps<T>) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true);

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
				<View style={styles.container}>
					<TextInput
						secureTextEntry={isPassword && !isPasswordVisible}
						style={[styles.input, error ? styles.inputError : null]}
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						placeholderTextColor={COLORS.grey}
						{...props}
					/>
					{isPassword && (
						<Pressable
							style={styles.eyeIcon}
							onPress={() => setIsPasswordVisible(!isPasswordVisible)}
						>
							{isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
						</Pressable>
					)}
					{error && <Text style={styles.errorText}>{error.message}</Text>}
				</View>
			)}
		/>
	);
};

export default Input;

const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
	},
	input: {
		height: 58,
		borderRadius: RADIUS.r10,
		backgroundColor: COLORS.violetDark,
		paddingHorizontal: 24,
		fontSize: 16,
		color: COLORS.grey,
		fontFamily: 'FiraSans',
	},
	inputError: {
		borderColor: COLORS.red,
		borderWidth: 1,
	},
	eyeIcon: {
		position: 'absolute',
		right: 0,
		paddingHorizontal: 20,
		paddingVertical: 17,
	},
	errorText: {
		color: COLORS.red,
		fontSize: 14,
		marginTop: 5,
		paddingHorizontal: 5,
	},
});
