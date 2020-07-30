import React from 'react'
import {View, StyleSheet} from 'react-native'

import Color from '../../constants/Color'

interface Props {}

const InfoCard: React.FC<Props> = (props) => {
    return (
    <View style={styles.container}>
        
        
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: '95%',
        borderWidth: 1,
        marginTop: 30,
        borderColor: 'white',
        backgroundColor: Color.backGroundPrimary,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 40
    }
})
export default InfoCard