import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

interface Props {
    name: string,
    size: number,
    color: string,
    animation: string, //
}

const CustomIcon: React.FC<Props> = ({name, size, color, animation}) => {
    return  (
        <Animatable.Text animation={animation} easing="ease-in-cubic" delay={1000}iterationCount="infinite" style={{ 'textAlign': 'center' }}><Ionicons name={name} color={color} size={size}/></Animatable.Text>
    )
  
}



export default CustomIcon