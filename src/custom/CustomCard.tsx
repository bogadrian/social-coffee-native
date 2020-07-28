import React from 'react';
import { View,  StyleSheet, Image } from 'react-native'

import CustomText from './CustomText'

interface Props {
 cardStyle?: {},
 style: {},
 text: {},
 image: HTMLImageElement
}

const CustomCard: React.FC<Props> = ({cardStyle, text, image, style}) => {
return (
       <View style={[styles.card, cardStyle]}>
           <Image source={image} style={[styles.image]}/>
           <View style={styles.textContainer}>
           <CustomText type="extra-bold" style={[style, styles.customTitle]}>{text}</CustomText>
           <CustomText type="regular" style={[style, styles.customSubTitle]}>{text}</CustomText>
           </View>
       </View>
      )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        width: '90%',
        backgroundColor: 'white',
        marginBottom: 20,
        marginTop: 10,
        overflow: 'hidden',  
    }, image: {
        width: '100%',
        height: 200
    },
    customTitle: {
        color: 'blue', marginLeft: 10
    }, 
    customSubTitle: {
        color: 'brown', marginLeft: 10
    },
    textContainer: {
        padding: 10
    }
})

export default CustomCard;