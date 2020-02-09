import React from 'react';
import { StyleSheet, Text, View, ShadowPropTypesIOS } from 'react-native';

import Header from './components/Header';

export default function App() {
  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      <Text>Testing Text Here</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
