import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Birthday = ({ birthday }) => {
  return (
    <View>
      <Text>
        {birthday.firstName} {birthday.lastName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});
