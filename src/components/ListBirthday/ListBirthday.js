import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import moment from 'moment';
import { ActionBar } from '../ActionBar';
import { AddBirthday } from '../AddBirthday';
import firebase from '../../utils/firebase';
import 'firebase/firestore';

const db = firebase.firestore(firebase);

export const ListBirthday = ({ user }) => {
  const [showList, setShowList] = useState(false);
  const [birthdays, setBirthdays] = useState([]);
  const [passedBirthdays, setPassedBirthdays] = useState([]);

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
  }, []);

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

      console.log('birthdays', birthdays);
      console.log('passedBirthdays', passedBirthdays);

      setBirthdays(birthdayTempArray);
      setPassedBirthdays(passedBirthdayTempArray);
    });
  };

  return (
    <View style={styles.viewContainer}>
      {showList ? (
        <>
          <Text>LIST</Text>
        </>
      ) : (
        <AddBirthday user={user} setShowList={setShowList} />
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
});
