import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ColorPropType, TouchableNativeFeedback, Platform } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import ColorSheet from '../constants/colors';

const MainButton = props => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }


  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent activeOpacity={0.4} onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: ColorSheet.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden'

  },
  buttonText: {
    color: 'white',
    fontFamily: 'tomorrow',
    fontSize: 18,
  },

});

export default MainButton;
