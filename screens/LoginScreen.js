import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native'
import { auth } from '../firebase'
import { useFonts } from 'expo-font';

const wrongPassword = 'auth/wrong-password';
const notFound = 'auth/user-not-found';
const badEmail = 'auth/invalid-email';
const badPass = 'auth/weak-password';

// TODO: implement shared preferences to use 'remember me'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    // Configure fonts
    const [loaded] = useFonts({
        MontserratRegular: require('../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
        MontserratBold: require('../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
    });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })

        return unsubscribe
    }, [])

    if (!loaded) {
        return null;
    }

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
            })
            .catch(error => {
                if (error.message.includes(wrongPassword))
                    alert('Incorrect password!')
                else if (error.message.includes(notFound))
                    alert('User not found! Check that your email is correct.')
                else if (error.message.includes(badEmail))
                    alert('Please enter a valid email address!')
                else if (error.message.includes(badPass))
                    alert('Passwords must be at least 6 characters long,')
                else
                    alert('Unknown error. Please make sure you are connected to the Internet.')
            });
    }

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
            })
            .catch(error => {
                if (error.message.includes(wrongPassword))
                    alert('Incorrect password!')
                else if (error.message.includes(notFound))
                    alert('User not found! Check that your email is correct.')
                else if (error.message.includes(badEmail))
                    alert('Please enter a valid email address!')
                else if (error.message.includes(badPass))
                    alert('Passwords must be at least 6 characters long,')
                else
                    alert('Unknown error. Please make sure you are connected to the Internet.')
            });
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={(Platform.OS == "ios" ? "padding" : undefined)}
        >
            <View>
                <Text style={styles.title}>Welcome to Holler.</Text>
                <Text style={styles.subtitle}>speak what's on your mind</Text>
            </View>
            <View style={styles.form}>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="white"
                        autoCapitalize='none'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="white"
                        autoCapitalize='none'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleSignUp}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Register</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#222',
        padding: 10
    },
    inputContainer: {
        width: '80%'
    },
    subtitle: {
        fontSize: 22,
        color: "#5D7EA2",
        fontFamily: 'MontserratBold'
    },
    title: {
        fontSize: 55,
        color: "white",
        fontFamily: 'MontserratBold',
        marginBottom: 15
    },
    form: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        maxWidth: 500
    },
    input: {
        borderColor: '#0782F9',
        borderWidth: 2,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        fontFamily: 'MontserratRegular',
        color: 'white'
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#2294fb',
        width: '50%',
        padding: 15,
        borderRadius: 10,
        margin: 5,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#2294fb',
        fontWeight: '700',
        fontSize: 16,
    },
});