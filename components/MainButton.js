import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ColorPropType } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import ColorSheet from '../constants/colors';

const MainButton = props => {
  return (
    <TouchableOpacity activeOpacity={0.4} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: ColorSheet.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'tomorrow',
    fontSize: 18,
  },

});

export default MainButton;
