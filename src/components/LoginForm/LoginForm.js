import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export const LoginForm = ({ changeForm }) => {
  return (
    <View>
      <Text>LoginForm...</Text>
      <TouchableOpacity onPress={changeForm}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  }
});
