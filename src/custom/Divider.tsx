import React from 'react';

import { View, StyleSheet } from 'react-native';

interface Props {
  style?: any;
}

const styles = StyleSheet.create({
  divider: {
    margin: 10,
    height: 5,
    width: '90%',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'transparent',
    borderRadius: 8
  }
});

const Divider: React.FC<Props> = props => {
  return <View style={[styles.divider, props.style]}></View>;
};

export default Divider;
