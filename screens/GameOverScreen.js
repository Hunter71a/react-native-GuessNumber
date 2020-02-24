import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView, SafeAreaView } from 'react-native';

import BodyText from '../components/BodyText';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton.android';
import TitleText from '../components/TitleText';

const GameOverScreen = props => {
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);


  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);

    };
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });



  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>Game Over: I WON!</TitleText>
        <View style={{
          ...styles.imageContainer, ...{
            width: availableDeviceWidth * 0.7,
            height: availableDeviceWidth * 0.7,
            borderRadius: (availableDeviceWidth * 0.7) / 2,
            marginVertical: availableDeviceHeight / 30
          }
        }}>
          <Image
            fadeDuration={1000}
            source={require('../assets/img/success.png')} load from local image
            //   source={{ uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'}} // load from web
            style={styles.image}
            resizeMode={"cover"} />
        </View>
        <View style={{
          ...styles.resultContainer,
          ...{ marginVertical: availableDeviceHeight / 60 }}}>
          <BodyText style={{
            ...styles.resultText, ...{
              fontSize: availableDeviceHeight < 400 ? 16 : 20 }}}>
            Your phone needed <Text style={styles.highlight}>{props.roundsNumber} </Text>rounds to guess the
       number <Text style={styles.highlight}>{props.userNumber}</Text></ BodyText>
        </View>
        <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView>
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
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 3,
    borderColor: 'black',
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30,
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 60,
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 15 : 17,


  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },

});

export default GameOverScreen;