import { FC } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { COLORS, RADIUS } from '../tokens';

const Input: FC = (props: TextInputProps) => {
  return (
    <TextInput style={styles.input} {...props} placeholderTextColor={COLORS.grey}/>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 58,
    borderRadius: RADIUS.r10,
    backgroundColor: COLORS.violetDark,
    // shadowColor: 'rgba(0, 0, 0, 0.04)',
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowRadius: 32,
    // shadowOpacity: 1,
    paddingHorizontal: 24,
    fontSize:16,
  },
});