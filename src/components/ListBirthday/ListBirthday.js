import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import moment from 'moment';
import { ActionBar } from '../ActionBar';
import { AddBirthday } from '../AddBirthday';
import { Birthday } from '../Birthday';
import firebase from '../../utils/firebase';
import 'firebase/firestore';

const db = firebase.firestore(firebase);

export const ListBirthday = ({ user }) => {
  const [showList, setShowList] = useState(false);
  const [birthdays, setBirthdays] = useState([]);
  const [passedBirthdays, setPassedBirthdays] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    setBirthdays([]);
    setPassedBirthdays([]);
    db.collection(user.uid)
      .orderBy('dateBirth', 'asc')
      .get()
      .then((res) => {
        const items = [];
        res.forEach((item) => {
          const data = item.data();
          data.id = item.id;
          items.push(data);
        });
        formatData(items);
      });
    setReloadData(false);
  }, [reloadData]);

  const formatData = (items) => {
    const currentDate = moment().set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    const birthdayTempArray = [];
    const passedBirthdayTempArray = [];
    items.forEach((item) => {
      const dateBirth = new Date(item.dateBirth.seconds * 1000);
      const dateBirthday = moment(dateBirth);
      const currentYear = moment().get('year');
      dateBirthday.set({ year: currentYear });

      const diffDate = currentDate.diff(dateBirthday, 'days');
      const itemTemp = item;
      itemTemp.dateBirth = dateBirthday;
      itemTemp.days = diffDate;

      if (diffDate <= 0) {
        birthdayTempArray.push(itemTemp);
      } else {
        passedBirthdayTempArray.push(itemTemp);
      }
    });
    setBirthdays(birthdayTempArray);
    setPassedBirthdays(passedBirthdayTempArray);
  };

  const deleteBirthday = (birthday) => {
    Alert.alert(
      'Remove birthday',
      `Are you sure you want to remove ${birthday.firstName} ${birthday.lastName}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => {
            db.collection(user.uid)
              .doc(birthday.id)
              .delete()
              .then(() => {
                setReloadData();
              })
              .catch((err) => {
                console.log('Error', err);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.viewContainer}>
      {showList ? (
        <ScrollView style={styles.scrollView}>
          {birthdays.map((birthday, index) => (
            <Birthday
              key={index}
              birthday={birthday}
              deleteBirthday={deleteBirthday}
            />
          ))}
          {passedBirthdays.map((passedBirthday, index) => (
            <Birthday
              key={index}
              birthday={passedBirthday}
              deleteBirthday={deleteBirthday}
            />
          ))}
        </ScrollView>
      ) : (
        <AddBirthday
          user={user}
          setShowList={setShowList}
          setReloadData={setReloadData}
        />
      )}
      <ActionBar showList={showList} setShowList={setShowList} />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    alignItems: 'center',
    height: '100%',
  },
  scrollView: {
    marginBottom: 50,
    width: '100%',
  },
});
