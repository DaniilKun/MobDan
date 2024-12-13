import Input from '@/shared/input/Input';
import { COLORS, GAPS } from '@/shared/tokens';
import { FC } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

const index: FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logo}>
          <Image source={require('../assets/images/logo.png')} style={styles.logoImg} />
          <Text style={styles.logoTxt}>MobDan</Text>
        </View>
        <View style={styles.form}>
          {/* <TextInput placeholder="Email" style={styles.input} />
          <TextInput placeholder="Password" style={styles.input} /> */}
          <Input placeholder="Email"/>
          <Input placeholder="Password"/>
          <Button title="Войти" />
        </View>
        <Text style={styles.helpTxt}>Восстановить пароль</Text>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 55,
    justifyContent: 'center',
    backgroundColor: COLORS.black,
  },
  content: {
    alignItems: 'center',
    gap: GAPS.g50,
  },
  logo: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoImg: {
    width: 100,
    height: 100,
  },
  logoTxt: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  form: {
    alignSelf: 'stretch',
    gap: GAPS.g16,
  },
  helpTxt:{
    fontFamily: "Fira Sans",
fontSize: 18,
fontWeight: "400",
fontStyle: "normal",
textAlign: "center",
color: COLORS.link,
  }
});
