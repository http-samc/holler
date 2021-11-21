// React imports
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useFonts } from 'expo-font';
import { Icon } from 'react-native-elements';

// Custom components
import Message from '../components/Message';

// Firebase imports
import { auth, firestore, firebase } from '../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

// Util imports
import getAvatar from '../utils/getAvatar';
import { SafeAreaView } from 'react-native-safe-area-context';
var avatar = null;
var email = null;

// TODO: Force view rerender on timer
// TODO: Handle auth callbacks
// FIXME: Memory leak

const HomeScreen = () => {
    if (avatar == null) {
        email = auth.currentUser?.email;
        if (email !== undefined)
            avatar = getAvatar(auth.currentUser?.email);
    }
    const navigation = useNavigation();

    // Use state for message input binding
    const [msgDraft, setMsgDraft] = useState('');

    // Scroll to bottom hook
    //var scrollView = useRef();

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
    if (messages === undefined || !loaded)
        return null

    // Functions
    //const scrollToBottom = () => scrollView.current.scrollToEnd({ animated: true });

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    const sendMessage = async () => {
        var msgFinal = msgDraft;
        setMsgDraft('');
        await messagesRef.add({
            body: msgFinal,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            ttl: Math.round(Date.now() / 1000) + 5,
            avatar: avatar
        });
        //scrollToBottom();
    }

    var renderStart = Math.round(Date.now() / 1000);

    // TODO: scroll to bottom on send msg
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <SafeAreaView>
                <Text style={styles.title}>Holler</Text>
            </SafeAreaView>
            <ScrollView
                //ref={scrollView}
                style={styles.chatScrollView}
                showsVerticalScrollIndicator={false}>
                <View style={styles.msgsContainer}>
                    {
                        messages.map((msg) => {
                            if (msg.ttl <= renderStart) return;
                            return <Message
                                message={msg.body}
                                uri={msg.avatar}
                                key={msg.id}
                                inbound={Boolean(
                                    msg.avatar === avatar
                                )}
                            />
                        })
                    }
                </View>
            </ScrollView>

            <View style={styles.actionBar}>

                <TextInput
                    placeholder="what's on your mind?"
                    placeholderTextColor="white"
                    autoCapitalize='none'
                    textAlign="left"
                    value={msgDraft}
                    onChangeText={text => setMsgDraft(text)}
                    style={styles.input} />

                <TouchableOpacity
                    onPress={sendMessage}
                    style={styles.button}
                >
                    <Icon style={styles.icon} name="send" color="white" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSignOut}
                    style={styles.button}
                >
                    <Icon name="logout" color="white" />
                </TouchableOpacity>

            </View>

        </KeyboardAvoidingView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    msgsContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 20,
        width: '100%',
        height: '100%',
        maxWidth: 700,
        alignSelf: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#222",
    },
    title: {
        fontSize: 55,
        color: "white",
        fontFamily: 'MontserratBold'
    },
    button: {
        backgroundColor: '#5D7EA2',
        padding: 5,
        borderRadius: 10,
        margin: 5,
        alignItems: 'center',
    },
    chatScrollView: {
        width: '100%',
        alignSelf: 'center'
    },
    actionBar: {
        flexDirection: 'row',
        padding: 20,
        marginBottom: 10,
        alignItems: 'center'
    },
    input: {
        fontFamily: 'MontserratRegular',
        color: 'white',
        width: '65%',
        borderColor: '#5D7EA2',
        borderWidth: 2,
        borderRadius: 10,
        marginRight: 5,
        padding: 7
    }
});