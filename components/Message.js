import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useFonts } from 'expo-font';

const Message = (props) => {
    // Configure fonts
    const [loaded] = useFonts({
        MontserratSemiBold: require('../assets/fonts/Montserrat/Montserrat-SemiBold.ttf'),
    });

    return (
        <View style={[styles.messageContainer, props.inbound ? styles.inbound : styles.outbound]}>
            <View style={styles.imageContainer}>
                {/* <SvgUri
                    style={styles.avatar}
                    source={{ uri: `${props.avatar}` }}
                /> */}
            </View>
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
    },
    imageContainer: {
        width: 20,
        height: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5
    },
    avatar: {
    },
});
