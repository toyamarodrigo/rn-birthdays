import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export const AddBirthday = () => {
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Ovie"
          placeholderTextColor="#969696"
        />
        <TextInput
          style={styles.input}
          placeholder="god"
          placeholderTextColor="#969696"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    color: '#fff',
    width: '80%',
    marginBottom: 25,
    backgroundColor: '#1e3040',
    paddingHorizontal: 20,
    borderRadius: 50,
    borderWidth: 1,
    fontSize: 18,
    borderColor: '#1e3040',
  },
});
