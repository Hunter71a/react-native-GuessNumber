import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';

import Colors from '../constants/colors';
import TitleText from '../components/TitleText';

const Header = props => {
    return (
        <View style={{
            ...styles.headerBase,
            ...Platform.select({ 
                ios: styles.headerIOS, 
                android: styles.headerAndroid
            })
        }}>
            <TitleText style={styles.title}>{props.title}</TitleText>
        </View>

    );
};

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: Dimensions.get('window').height < 600 ? 70 : 80,

        paddingTop: Dimensions.get('window').height < 600 ? 30 : 20,
        // backgroundColor: '#f7287b',  maintain previous colors for reference
        // backgroundColor: '#b9f0f0',  maintain previous colors for reference
        // backgroundColor: Platform.OS === "android" ?  Colors.primary : 'white',
        // borderBottomColor: Platform.OS === "ios" ? '#ccc' : 'transparent',
        // borderBottomWidth: Platform.OS === "ios" ? 1 : 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerAndroid: {
        backgroundColor: Colors.primary,
    },
    headerIOS: {
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    title: {
        color: Platform.OS === 'ios' ? Colors.primary : 'white',
    }
});



export default Header;

