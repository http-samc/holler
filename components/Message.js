import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { SvgUri } from 'react-native-svg';

const Message = (props) => {
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
        padding: 5,
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
        marginHorizontal: 10
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
