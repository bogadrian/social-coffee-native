import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import CustomTextAnimated from './CustomTextAnimated';
import CustomIcon from './CustomIcon';

interface Props {
  textType: string;
  style?: any;
  textStyle?: string;
  text: string;
  color: string;
  name: string;
  animation?: string;
  size: number;
  fontSize: number;
  buttonWidth: string;
  backColor?: string;
  onPress: (NativeSyntheticEvent: any) => void;
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderRadius: 8,
    margin: 5,
    padding: 6,
    borderWidth: 1,
    opacity: 0.9,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20
  },
  text: { justifyContent: 'center', alignItems: 'center' }
});

export const CustomButton: React.FC<Props> = ({
  name,
  animation,
  size,
  style,
  textType,
  color,
  text,
  onPress,
  fontSize,
  backColor,
  buttonWidth
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      style,
      styles.button,
      {
        borderColor: color,
        width: buttonWidth,
        backgroundColor: backColor ? backColor : 'rgba(0,0,0,0.1)'
      }
    ]}
  >
    <CustomIcon name={name} size={size} color={color} />
    <CustomTextAnimated
      animation={animation}
      type={textType}
      style={[{ color, fontSize }, styles.text]}
    >
      {text}
    </CustomTextAnimated>
  </TouchableOpacity>
);

export default CustomButton;
