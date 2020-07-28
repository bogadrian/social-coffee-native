import React from 'react'

import {View, StyleSheet} from 'react-native'

interface Props { 
  style?: any,
    children: any
}

const styles = StyleSheet.create({
    layout: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2A335A'
    },
  });
  
const CustomLayout: React.FC<Props>= (props) => {
    return (
      <View style={[styles.layout, props.style] }>{props.children}</View>   
    )
}


  
  export default CustomLayout;