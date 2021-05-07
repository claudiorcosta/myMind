import React, {useState, useContext} from 'react';
import {StyleSheet, View, Button, TextInput, Image, Text} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../navigation/AuthProvider';

const Registration = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [displayName, setdisplayName] = useState();

  const {register} = useContext(AuthContext);

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#36A2D0', '#D4FFFC']} style={styles.container}>
        <Image source={require('../../assets/logo.png')} />
        <TextInput
          placeholder="Name"
          onChangeText={(text) => setdisplayName(text)}
          value={displayName}
        />

        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        <Button
          color="#33A6D7"
          title="Register"
          onPress={() => register(displayName, email, password)}
        />
        <Text style={styles.text} onPress={goToLogin}>
          Click here to login
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

export default Registration;
