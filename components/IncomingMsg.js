import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const IncomingMsg = (props) => {
    return (
        <View style={styles.messageContainer}>
            <Text style={styles.messageBody}>{props.message}</Text>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.avatar}
                    source={{ uri: props.avatar }}
                />
            </View>
        </View>
    )
}

export default IncomingMsg

const styles = StyleSheet.create({
    messageContainer: {

    },
    messageBody: {

    },
    imageContainer: {

    },
    avatar: {
        width: 20,
        height: 20
    },
});
