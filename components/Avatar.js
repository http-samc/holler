import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { ReactSVG } from 'react-svg';

const Avatar = (props) => {
    return (
        <View style={styles.avatarContainer}>
            <ReactSVG src={props.uri} />
        </View>
    )
}

export default Avatar

const styles = StyleSheet.create({
    avatarContainer: {
        width: 20,
        height: 20,
        margin: 5
    }
});
