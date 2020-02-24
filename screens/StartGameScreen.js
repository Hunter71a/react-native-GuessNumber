import React, { useState, useEffect } from 'react';
import { View, Keyboard, StyleSheet, Text, Button, TouchableWithoutFeedback, Alert, Image, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';

import BodyText from '../components/BodyText';
import Card from '../components/Card'
import Colors from '../constants/colors';
import ImageFrame from '../components/ImageFrame'
import Input from '../components/Input';
import MainButton from '../components/MainButton.android';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';


const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    // const updateLayout = () => {
    //     setButtonWidth(Dimensions.get('window').width / 4);
    // };

    // Dimensions.addEventListener('change', updateLayout);

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Number has to be between 1 and 99.',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            );
            return;
        }
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        setConfirmed(true);
        Keyboard.dismiss();
    };



    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        };
    });

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <BodyText>You selected</ BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}
                >START GAME
                </MainButton>
            </Card >
        );
    }

    let unconfirmed;

    if (!confirmed) {
        unconfirmed = (
            // <ImageFrame source={require('../assets/img/question_mark.png')}>
            //  create image component not completed
            //     </ImageFrame>
            <View style={styles.imageContainer}>
                <Image
                    fadeDuration={1000}
                    source={require('../assets/img/question_mark.png')}
                    style={styles.image}
                    resizeMode={"center"}
                />
            </View>
        );
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a New Game!</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input
                                style={styles.input}
                                blurOnSubmit
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType="number-pad"
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{ width: buttonWidth }}>
                                    <Button
                                        title="Reset"
                                        onPress={resetInputHandler}
                                        color={Colors.accent} />
                                </View>
                                <View style={{ width: buttonWidth }}>
                                    <Button
                                        title="Confirm"
                                        onPress={confirmInputHandler}
                                        color={Colors.primary} />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                        {unconfirmed}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    // button: {
    //     margin: 10,
    //     width: Dimensions.get('window').width / 4,
    //     borderRadius: 10,
    //     backgroundColor: 'red'
    // },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'

    },

    image: {
        width: '100%',
        height: '100%',
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

    input: {
        width: '50%',
        textAlign: 'center'
    },
    inputContainer: {
        width: '80%',
        minWidth: 300,
        maxWidth: '80%',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, hight: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 10,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        fontSize: 35,
        fontFamily: 'rajdhani'
    },
    label: {
        fontSize: 20,
        fontFamily: 'tomorrow'
    },
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'

    },
    title: {
        fontSize: Dimensions.get('window').height > 600 ? 28 : 20,
        marginVertical: Dimensions.get('window').height > 600 ? 28 : 10,
        fontFamily: 'rajdhani',

    }
});

export default StartGameScreen;