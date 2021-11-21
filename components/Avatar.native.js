import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { SvgUri } from 'react-native-svg';

const Avatar = (props) => {
    return (
        <View style={styles.avatarContainer}>
            <SvgUri
                width="100%"
                height="100%"
                uri={props.uri}
            />
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
