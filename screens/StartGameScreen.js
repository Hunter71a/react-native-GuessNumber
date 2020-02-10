import React, {useState} from 'react';
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback } from 'react-native';

import Card from '../components/Card'
import Colors from '../constants/colors';
import Input from '../components/Input';


const StartGameScreen = props => {
    
    const [enteredValue, setEnteredValue] = useState('');
    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };
    
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
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
                    <View style={styles.button}>
                        <Button title="Reset" onPress={() => { }} color={Colors.accent} />
                    </View>
                    <View style={styles.button}>
                        <Button title="Confirm" onPress={() => { }} color={Colors.primary} />
                    </View>
                </View>
            </Card>

        </View>

    );

};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'

    },
    input: {
        width: '50%',
        textAlign: 'center'
    },
    inputContainer: {
        width: 300,
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
        fontSize: 20
    },

    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 25,
        marginVertical: 15
    },
    button: {
        margin: 10,
        width: '33%',
        borderRadius: 10,
        backgroundColor: 'red'
    }
});

export default StartGameScreen;