import React from 'react';
import { Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface Props {
  type: string,
  style?: {},
  animation?: string
  
}

const CustomTextAnimated: React.FC<Props> = props => {
  const setFontType = (type: string) => {
    switch (type) {
      case 'black':
        return 'raleway-black';
      case 'bold':
        return 'raleway-bold';
      case 'italic':
        return 'raleway-italic';
      case 'medium':
        return 'raleway-medium';
      case 'light':
        return 'raleway-light';
      case 'semibold':
        return 'raleway-semibold';
      case 'extra-bold':
        return 'raleway-extra-bold';
      case 'extra-light':
        return 'raleway-extra-light';
      case 'thin':
        return 'raleway-thin';
      case 'thin-italic':
        return 'raleway-thin-italic';
      case 'bold-italic':
        return 'raleway-bold-italic';
      case 'extra-bold-italic':
        return 'raleway-extra-bold-italic';
      default:
        return 'raleway-regular';
    }
  };
  const font = setFontType(props.type ? props.type : 'normal');
  const style = [{ fontFamily: font, color: 'white' }, props.style || {}];
  return  (
       <Animatable.View animation={props.animation} easing="ease-in-cubic" delay={1000}      iterationCount="infinite" >
          <Text style={[...style, styles.text]}>{props.children}</Text>
      </Animatable.View>);
};
const styles = StyleSheet.create({
  text: {alignItems: 'center', justifyContent: 'center'}
})
export default CustomTextAnimated;
