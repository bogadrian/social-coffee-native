import React from 'react';

import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Color from '../constants/Color';

export const { width, height } = Dimensions.get('window');

interface Props {
  style?: any;
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: Color.backGroundPrimary,
    flex: 1
  }
});

const CustomLayout: React.FC<Props> = props => {
  return (
    <ScrollView contentContainerStyle={[styles.layout, props.style]}>
      {props.children}
    </ScrollView>
  );
};

export default CustomLayout;
