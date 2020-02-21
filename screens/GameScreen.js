import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Button, Alert, Image} from 'react-native';

import BodyText from '../components/BodyText';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import NumberContainer from '../components/NumberContainer';


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
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1, 100, props.userChoice)
    );
    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < props.userChoice) ||
            (direction === 'higher' && currentGuess > props.userChoice)
        ) {
            const randomAlert = Math.floor(Math.random() * 3) + 1;
            if (randomAlert === 1) {
                Alert.alert('Error Alert!', 'Are you having trouble remembering the number you chose?', [
                    { text: 'Try Again', style: 'cancel' }
                ]);
            }
            if (randomAlert === 2) {
                Alert.alert('Are you serious?',
                    'By your vacant gaze I can only assume you have forgotten which number you picked. It\'s "' + props.userChoice + '" if that helps.', [
                    { text: 'Soory!', style: 'cancel' }
                ]);
            }
            if (randomAlert === 3) {
                Alert.alert('Wrong Button!',
                    'In case you forgot, the number you chose is "' + props.userChoice + '"', [
                    { text: 'Return', style: 'cancel' }
                ]);
            }
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;

        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(curRounds => curRounds + 1);
    };
    // /*      
    //       const randomAlert = Math.floor(Math.random() * 3) + 1;
    //             if (randomAlert === 1) {
    //                 Alert.alert('Error alert!',  message='Are you having trouble remembering the number you chose?');}
    //         Alert.alert('Wrong button', message='Are you sure that is correct button to press?');

    //     };*/

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.label}>Opponent's Guess: </Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
                <Button title="HIGHER" onPress={nextGuessHandler.bind(this, 'higher')} />
            </Card>
            <View style={DefaultStyles.imageContainer}>
                <Image 
                    fadeDuration={1000}
                    source={require('../assets/img/question-mark.png')}
                    style={DefaultStyles.image}
                    resizeMode={"center"}
                />
            </View>
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