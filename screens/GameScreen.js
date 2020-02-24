import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, FlatList, Alert, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import BodyText from '../components/BodyText';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton.android';
import NumberContainer from '../components/NumberContainer';
import {ScreenOrientation} from 'expo'; 


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

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>Attempt: {listLength - itemData.index} </BodyText>
        <BodyText>Guess: {itemData.item}</BodyText>
    </View>
);

const GameScreen = props => {
 //   ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        const updateLayout = () =>  {
            setAvailableDeviceHeight(Dimensions.get('window').height);
            setAvailableDeviceWidth(Dimensions.get('window').width);
        };
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

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
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
    };

    let listContainerStyle = styles.listContainer;


    if (Dimensions.get('window').width < 350) {
        listContainerStyle = styles.listContainerBig;
    }

    if (Dimensions.get('window').height < 400) {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.label}>Opponent's Guess: </Text>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
                        <Ionicons name="md-add" size={24} color="white" />
                    </MainButton>
                </View>
                <View style={listContainerStyle}>
                    {/* <ScrollView contentContainerStyle={styles.list} >
                     {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))} 
                    <View key={guess}>
                        <Text>{guess}</Text>
                    </View>)}
                </ScrollView> */}
                    <FlatList
                        keyExtractor={item => item}
                        data={pastGuesses}
                        renderItem={renderListItem.bind(this, pastGuesses.length)}
                        contentContainerStyle={styles.list}
                    />
                </View>
{/* 
                <View style={DefaultStyles.imageContainer}>
                    <Image
                        fadeDuration={1000}
                        source={require('../assets/img/robot.png')}
                        style={DefaultStyles.image}
                    //  resizeMode={"center"}
                    />
                </View> */}
            </View>
        );
    };

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.label}>Opponent's Guess: </Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            {/* <Card style={[...styles.buttonContainer, {marginTop: availableDeviceHeight > 600 ? 20 : 5}]}> */}
             <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={listContainerStyle}>
                {/* <ScrollView contentContainerStyle={styles.list} >
                     {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))} 
                    <View key={guess}>
                        <Text>{guess}</Text>
                    </View>)}
                </ScrollView> */}
                <FlatList
                    keyExtractor={item => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
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
        width: 350,
        maxWidth: '85%'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around', 
        width: '80%',  
    },
    list: {
        flexGrow: 1,
        //  alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listContainer: {
        flex: 1,
        width: '60%',
        //maxHeight: '30%'
    },
    listContainerBig: {
        flex: 1,
        width: '80%',
        minHeight: 32,
        //maxHeight: '30%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: -2,
        marginVertical: -3,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    }
});

export default GameScreen;