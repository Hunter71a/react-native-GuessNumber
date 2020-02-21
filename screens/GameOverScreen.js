import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import BodyText from '../components/BodyText';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';
import TitleText from '../components/TitleText';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <TitleText>Game Over: I WON!</TitleText>
      <View style={styles.imageContainer}>
      <Image 
      fadeDuration={1000}
      source={require('../assets/img/success.png')}   load from local image
     //   source={{ uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'}} // load from web
      style={styles.image}
      resizeMode={"cover"} />
      </View>
      <View style={styles.resultContainer}>
      <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber} </Text>rounds to guess the
       number <Text style={styles.highlight}>{props.userNumber}</Text></ BodyText>
      </View>
      <Button title="NEW GAME" onPress={props.onRestart} />    
    </View>
  );
};

const styles = StyleSheet.create({
  highlight: {
    color: Colors.primary,

   // fontFamily: 'opens-sans-bold'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    borderRadius: 133,
    borderWidth: 3,
    borderColor: 'black',
    width: 266,
    height: 266,
    overflow: 'hidden',
  },
  resultContainer:{
    marginHorizontal: 30,
    marginVertical: 10,
  },
  resultText: {
textAlign: 'center'


  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

});

export default GameOverScreen;