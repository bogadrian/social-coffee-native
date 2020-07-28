import React from 'react';
import { StyleSheet, View, Button, TouchableOpacity } from 'react-native';

import Color from '../constants/Color'
import CustomText from './CustomText';
import CustomIcon from './CustomIcon'

interface Props { 
textType: string,
textStyle?: {},
text: string, 
color: string,
name?: string, 
animation?: string, 
size?: number,
fontSize: number,
buttonWidth: string,
onPress: (NativeSyntheticEvent) => void
}

const styles = StyleSheet.create({
 
  button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderRadius: 4,
    margin: 5,
    padding: 6,
    borderWidth: 1,
    opacity: 0.9,
    backgroundColor: 'rgba(240,47,23,0.1) ',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20
  },
  
 
});

export const CustomButton: React.FC<Props> = ({name, animation, size, textType, color, text, onPress, fontSize, buttonWidth}) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, {'borderColor': color, 'width': buttonWidth}]}>
    <CustomIcon name={name} size={size} color={color} animation={animation}/>
    <CustomText  type={textType} style={{color, fontSize}}>{text}</CustomText>
  </TouchableOpacity>
);



export default CustomButton;