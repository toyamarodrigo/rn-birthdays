import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LoginForm } from '../LoginForm';
import { RegisterForm } from '../RegisterForm';

export const Auth = () => {
  const [isLogged, setIsLogged] = useState(true);

  const changeForm = () => {
    setIsLogged(!isLogged);
  };

  return (
    <View style={styles.view}>
      <Image style={styles.logo} source={require('../../assets/logo.png')} />
      {isLogged ? (
        <LoginForm changeForm={changeForm} />
      ) : (
        <RegisterForm changeForm={changeForm} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    height: 240,
    marginVertical: 50,
  },
});
