import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts } from 'expo-font';
import Avatar from './Avatar';

const Message = (props) => {
    // Configure fonts
    const [loaded] = useFonts({
        MontserratSemiBold: require('../assets/fonts/Montserrat/Montserrat-SemiBold.ttf'),
    });

    if (!loaded)
        return null;

    return (
        <View style={[styles.messageContainer, props.inbound ? styles.inbound : styles.outbound]}>
            <Avatar uri={props.avatar} />
            <Text style={styles.messageBody}>{props.message}</Text>
        </View>
    )
}

export default Message

const styles = StyleSheet.create({
    messageContainer: {
        maxWidth: '70%',
        padding: 10,
        borderRadius: 10,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
    },
    outbound: {
        alignSelf: 'flex-start',
        backgroundColor: '#747474'
    },
    inbound: {
        alignSelf: 'flex-end',
        backgroundColor: '#2294fb'
    },
    messageBody: {
        paddingHorizontal: 10,
        fontFamily: 'MontserratSemiBold',
        color: 'white'
    }
});
