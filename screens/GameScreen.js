import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';


const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice)
    );

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice)         
        || (direction === 'higher' && currentGuess > props.userChoice))
        Alert.alert('Are you sure that is correct?')
    };

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess: </Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower' )} />
                <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'higher')} />
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    },
    screen: {
        flex: 1, 
        padding: 10,
        alignItems: 'center'
    }
});

export default GameScreen;