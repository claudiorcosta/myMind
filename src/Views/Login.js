import React, {useState, useContext} from 'react';

import {StyleSheet, View, Button, TextInput, Image, Text} from 'react-native';

import {
  FacebookSocialButton,
  GoogleSocialButton,
} from 'react-native-social-buttons';

import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../navigation/AuthProvider';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, googleLogin, fbLogin} = useContext(AuthContext);

  const goToRegister = () => {
    navigation.navigate('Registration');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#36A2D0', '#D4FFFC']} style={styles.container}>
        <Image source={require('../../assets/logo.png')} />
        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Button
          color="#33A6D7"
          title="Login"
          onPress={() => login(email, password)}
        />
        <Text style={styles.text} onPress={goToRegister}>
          Click here to register
        </Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  text: {
    color: 'blue',
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 10,
  },
});

export default Login;
