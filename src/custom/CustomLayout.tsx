import React from 'react'

import {View, StyleSheet, ScrollView} from 'react-native'

interface Props { 
  style?: any,
  children: any
}

const styles = StyleSheet.create({
    layout: {
      backgroundColor: '#2A335A',
    },
  });
  
const CustomLayout: React.FC<Props>= (props) => {
    return (
      <ScrollView>
      <View style={[styles.layout, props.style] }>{props.children}</View>
       </ScrollView>  
    )
}


  
  export default CustomLayout;