import React from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';

const TitleText = props => <Text style={{...styles.title, ...props.style}}>{props.children}</Text>;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'slackey',
    fontSize: Dimensions.get('window').height > 600 ?  27 : 20,
    marginVertical: 10
  }
});

export default TitleText;