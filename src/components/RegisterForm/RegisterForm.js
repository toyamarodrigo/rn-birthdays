import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import { validateEmail } from '../../utils/validation';
import firebase from '../../utils/firebase';

export const RegisterForm = ({ changeForm }) => {
  const [formData, setFormData] = useState(InitialValues);
  const [formError, setFormError] = useState({});

  const register = () => {
    let errors = {};
    if (!formData.email || !formData.password || !formData.repeatPassword) {
      if (!formData.email) errors.email = true;
      if (!formData.password) errors.password = true;
      if (!formData.repeatPassword) errors.repeatPassword = true;
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
    } else if (formData.password != formData.repeatPassword) {
      errors.password = true;
      errors.repeatPassword = true;
    } else if (formData.password.length < 6) {
      errors.password = true;
      errors.repeatPassword = true;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then((res) => {
          console.log('Account Created');
        })
        .catch((error) => {
          setFormError({ email: true, password: true, repeatPassword: true });
        });
    }

    setFormError(errors);
  };

  return (
    <>
      <TextInput
        style={[styles.input, formError.email && styles.error]}
        placeholder="Email"
        placeholderTextColor="#969696"
        onChange={(e) =>
          setFormData({ ...formData, email: e.nativeEvent.text })
        }
      />
      <TextInput
        style={[styles.input, formError.password && styles.error]}
        placeholder="Password"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={(e) =>
          setFormData({ ...formData, password: e.nativeEvent.text })
        }
      />
      <TextInput
        style={[styles.input, formError.repeatPassword && styles.error]}
        placeholder="Repeat password"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={(e) =>
          setFormData({ ...formData, repeatPassword: e.nativeEvent.text })
        }
      />
      <TouchableOpacity>
        <Text style={styles.btnText} onPress={register}>
          Register
        </Text>
      </TouchableOpacity>
      <View style={styles.login}>
        <TouchableOpacity onPress={changeForm}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

function InitialValues() {
  return {
    email: '',
    password: '',
    repeatPassword: '',
  };
}

const styles = StyleSheet.create({
  btnText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    height: 50,
    color: '#fff',
    width: '80%',
    marginBottom: 25,
    backgroundColor: '#1e3040',
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#1e3040',
  },
  login: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  error: {
    borderColor: '#940c0c',
  },
});
