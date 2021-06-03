import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

export const AddBirthday = () => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(true);

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleOnConfirm = (date) => {
    console.log(moment(date).format('LL'));
    hideDatePicker();
  };

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#969696"
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#969696"
        />
        <View style={[styles.input, styles.datepicker]}>
          <Text style={styles.textDate} onPress={showDatePicker}>
            Birthday
          </Text>
        </View>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleOnConfirm}
        onCancel={hideDatePicker}
      />
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
  datepicker: {
    justifyContent: 'center',
  },
  textDate: {
    color: '#969696',
    fontSize: 18,
  },
});
