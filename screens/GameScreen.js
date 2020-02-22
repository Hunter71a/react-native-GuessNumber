import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import BodyText from '../components/BodyText';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
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

const renderListItem = (value, numOfRounds) => (
    <View key={value} style={styles.listItem}>
        <BodyText>Guess: {value} </BodyText>
        <BodyText> Try: {numOfRounds}</BodyText>
    </View>
);

const GameScreen = props => {


    const initialGuess = generateRandomBetween(1, 100, props.userChoice);

    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
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
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(
            currentLow.current,
            currentHigh.current,
            currentGuess
        );
        setCurrentGuess(nextNumber);
        // setRounds(curRounds => curRounds + 1);
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
    };

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.label}>Opponent's Guess: </Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.list}>
                <ScrollView >
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                    {/* <View key={guess}>
                        <Text>{guess}</Text>
                    </View>)} */}
                </ScrollView>
            </View>

            <View style={DefaultStyles.imageContainer}>
                <Image
                    fadeDuration={1000}
                    source={require('../assets/img/robot.png')}
                    style={DefaultStyles.image}
                //  resizeMode={"center"}
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
        width: 350,
        maxWidth: '85%'
    },
    list: {
        flex: 1,
        width: '80%',
        maxHeight: '30%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: -2,
        marginVertical: -3,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    }
});

export default GameScreen;