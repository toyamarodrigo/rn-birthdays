import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export const Birthday = ({ birthday, deleteBirthday }) => {
  const infoDays = () => {
    if (birthday.days === 0) {
      return <Text style={{ color: '#fff' }}>Today 🎉</Text>;
    } else {
      const days = -birthday.days;
      return (
        <View style={styles.textCurrent}>
          <Text>{days}</Text>
          <Text>{days === 1 ? 'Day' : 'Days'}</Text>
        </View>
      );
    }
  };

  const passed = birthday.days > 0 ? true : false;
  return (
    <TouchableOpacity
      style={[
        styles.card,
        passed
          ? styles.passed
          : birthday.days === 0
          ? styles.actual
          : styles.current,
      ]}
      onPress={() => deleteBirthday(birthday)}
    >
      <Text style={styles.userName}>
        {birthday.firstName} {birthday.lastName}
      </Text>
      {passed ? <Text style={{ color: '#fff' }}>Passed</Text> : infoDays()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 15,
  },
  actual: {
    backgroundColor: '#559204',
  },
  passed: {
    backgroundColor: '#820000',
  },
  current: {
    backgroundColor: '#1ae1f2',
  },
  userName: {
    color: '#fff',
    fontSize: 16,
  },
  textCurrent: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 80,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
