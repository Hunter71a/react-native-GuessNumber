import { StyleSheet } from 'react-native';

import Colors from '../constants/colors';


export default StyleSheet.create({
  bodyText: {
    fontFamily: 'open-sans',
    color: 'red'
  }, 
  highlight: {
    color: Colors.primary,
    textShadowColor: 'black',
   // textShadowRadius: 70
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: "cover",
  },
  imageContainer: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'black',
    width: 200,
    height: 200,
    overflow: 'hidden',
    marginTop: 30,
    padding: 30,
  },

  label: {
    fontSize: 20,
    fontFamily: 'tomorrow',
    marginVertical: 20
  },   
  title: {
    fontFamily: 'slackey',
    fontSize: 27,
    marginVertical: 10
  }
});