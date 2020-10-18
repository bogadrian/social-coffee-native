import React from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';

export const { width, height } = Dimensions.get('window');
import marker from '../assets/markers/marker4.png';

import Color from '../constants/Color';

interface Props {
  style?: any;
  name: string;
}

const styles = StyleSheet.create({
  activity: {
    width: width * 0.94,
    height: Math.round(height * 0.4),
    color: 'white',
    alignSelf: 'center',

    marginTop: 40
  },

  markerContainer: {
    // width: 100,
    // height: 100
  },
  marker: {
    height: 44,
    width: 32
  },
  ok: {
    backgroundColor: Color.backGroundPrimary,
    color: 'white',
    marginBottom: -10,
    padding: 10,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const MarkerComp: React.FC<Props> = ({ name }) => {
  return (
    <View style={styles.markerContainer}>
      <Text style={styles.ok}>{name}</Text>
      <Image style={styles.marker} source={marker} />
    </View>
  );
};

export default MarkerComp;
