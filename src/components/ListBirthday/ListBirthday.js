import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ActionBar } from '../ActionBar';
import { AddBirthday } from '../AddBirthday';

export const ListBirthday = () => {
  const [showList, setShowList] = useState(false);
  return (
    <View style={styles.viewContainer}>
      {showList ? (
        <>
          <Text>LIST</Text>
          <Text>LIST</Text>
          <Text>LIST</Text>
          <Text>LIST</Text>
          <Text>LIST</Text>
        </>
      ) : (
        <AddBirthday />
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
