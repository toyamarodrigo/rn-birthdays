import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import firebase from '../../utils/firebase';
import 'firebase/firestore';

export const AddBirthday = ({ user, setShowList, setReloadData }) => {
  const [formData, setFormData] = useState({});
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [formError, setFormError] = useState({});

  const db = firebase.firestore(firebase);

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleOnConfirm = (date) => {
    const dateBirth = date;
    dateBirth.setHours(0);
    dateBirth.setMinutes(0);
    dateBirth.setSeconds(0);
    setFormData({ ...formData, dateBirth });
    hideDatePicker();
  };

  const handleOnChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const handleOnSubmit = () => {
    let errors = {};
    if (!formData.firstName || !formData.lastName || !formData.dateBirth) {
      if (!formData.firstName) errors.firstName = true;
      if (!formData.lastName) errors.lastName = true;
      if (!formData.dateBirth) errors.dateBirth = true;
    } else {
      const data = formData;
      data.dateBirth.setYear(0);
      db.collection(user.uid)
        .add(data)
        .then((res) => {
          setReloadData(true);
          setShowList(true);
        })
        .catch((err) =>
          setFormError({ firstName: true, lastName: true, dateBirth: true })
        );
    }
    setFormError(errors);
  };

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={[styles.input, formError.firstName && styles.error]}
          placeholder="First Name"
          placeholderTextColor="#969696"
          onChange={(e) => handleOnChange(e, 'firstName')}
        />
        <TextInput
          style={[styles.input, formError.lastName && styles.error]}
          placeholder="Last Name"
          placeholderTextColor="#969696"
          onChange={(e) => handleOnChange(e, 'lastName')}
        />
        <View
          style={[
            styles.input,
            styles.datepicker,
            formError.dateBirth && styles.error,
          ]}
        >
          <Text
            style={{
              color: formData.dateBirth ? '#fff' : '#969696',
              fontSize: 18,
            }}
            onPress={showDatePicker}
          >
            {formData.dateBirth
              ? moment(formData.dateBirth).format('LL')
              : 'Birthday'}
          </Text>
        </View>
        <TouchableOpacity onPress={handleOnSubmit}>
          <Text style={styles.addButton}>Create birthday</Text>
        </TouchableOpacity>
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
  addButton: {
    fontSize: 18,
    color: '#fff',
  },
  error: {
    borderColor: 'red',
  },
});
