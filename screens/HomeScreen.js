// React imports
import React, { useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useFonts } from 'expo-font';

// Custom components
import Message from '../components/Message';

// Firebase imports
import { auth, firestore, firebase } from '../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

// Util imports
import getAvatar from '../utils/avatar';
import { SafeAreaView } from 'react-native-safe-area-context';
avatar = null;

// TODO: Force view rerender on timer

const HomeScreen = () => {
    if (avatar == null) {
        email = auth.currentUser?.email;
        if (email !== undefined)
            avatar = getAvatar(auth.currentUser?.email);
    }
    const navigation = useNavigation();

    // Use state for message input binding
    const [msgDraft, setMsgDraft] = useState('');

    // Configure Firestore realtime message query
    const messagesRef = firestore.collection("messages");
    const query = messagesRef
        .orderBy('createdAt')
        .limit(25);
    const [messages] = useCollectionData(query, { idField: 'id' });

    // Configure fonts
    const [loaded] = useFonts({
        MontserratRegular: require('../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
        MontserratBold: require('../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
    });

    // Handle Errs after all hooks declared to avoid problems
    if (messages === undefined)
        return null

    if (!loaded) {
        return null;
    }

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    const sendMessage = async () => {
        msgFinal = msgDraft;
        setMsgDraft('');
        await messagesRef.add({
            body: msgFinal,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            ttl: Math.round(Date.now() / 1000) + 5,
            avatar: avatar
        });
    }

    const renderStart = Math.round(Date.now() / 1000);

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Text style={styles.title}>Holler</Text>
            </SafeAreaView>
            <ScrollView style={styles.chatScrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.msgsContainer}>
                    {
                        messages.map((msg) => {
                            //if (msg.ttl <= renderStart) return;
                            return <Message
                                message={msg.body}
                                avatar={msg.avatar}
                                key={msg.id}
                                inbound={Boolean(
                                    msg.avatar === avatar
                                )}
                            />
                        })
                    }
                </View>
            </ScrollView>

            <View style={styles.sendMessageContainer}>

                <TextInput
                    placeholder="📝 Say something nice!"
                    autoCapitalize='none'
                    value={msgDraft}
                    onChangeText={text => setMsgDraft(text)}
                    style={styles.input} />

            </View>

            <TouchableOpacity
                onPress={sendMessage}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Send Message</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleSignOut}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
        </View>

    )
}

export default HomeScreen

const styles = StyleSheet.create({
    msgsContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 20,
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#222"
    },
    title: {
        fontSize: 35,
        color: "white",
        fontFamily: 'MontserratBold'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        fontFamily: 'MontserratRegular'
    },
    chatScrollView: {
        width: '100%',
        alignSelf: 'center'
    }
});