import React from 'react'

import {View, StyleSheet} from 'react-native'

interface Props {
    style?: {}
}

const styles = StyleSheet.create({
    divider: {
        margin: 10,
        height: 5,
        width: '90%',
        backgroundColor: 'white'
    }
})

const Divider: React.FC<Props> = props => {
    return (
        <View style={[styles.divider, props.style]}></View>
    )
}

export default Divider;