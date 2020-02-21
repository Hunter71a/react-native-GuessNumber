import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../constants/colors';
import TitleText from '../components/TitleText';

const Header = props => {
    return(
        <View style={styles.header}>
            <TitleText>{props.title}</TitleText>
        </View>

    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        // backgroundColor: '#f7287b',  maintain previous colors for reference
        // backgroundColor: '#b9f0f0',  maintain previous colors for reference
        backgroundColor: Colors.primary, 
        alignItems: 'center',
        justifyContent: 'center'
    }
});



export default Header;

