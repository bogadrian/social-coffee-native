import React from 'react';

import {Ionicons}  from '@expo/vector-icons';

interface Props {
    name: string,
    size: number,
    color: string,
}

const CustomIcon: React.FC<Props> = ({name, size, color}) => {
    return   <Ionicons name={name} color={color} size={size}/>
}

export default CustomIcon