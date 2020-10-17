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
}

const styles = StyleSheet.create({
  activity: {
    width: width * 0.94,
    height: Math.round(height * 0.4),
    color: 'white',
    alignSelf: 'center',

    marginTop: 40
  },

  markerFixed: {},
  marker: {
    height: 44,
    width: 32
  },
  ok: {
    backgroundColor: Color.backGroundPrimary,
    color: 'white',
    marginLeft: -8,
    padding: 10,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    overflow: 'hidden'
  },
  touchble: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 5
  },
  text: {
    fontSize: 18,
    letterSpacing: 2,
    color: Color.tertiary,
    padding: 4,
    textAlign: 'center',
    marginTop: 30
  },
  text1: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center'
  }
});

const MarkerComp: React.FC<Props> = props => {
  const okPressed = () => {};
  return (
    <View style={styles.markerFixed}>
      <TouchableOpacity onPress={okPressed} style={styles.touchble}>
        <Text style={styles.ok}>°name of the provider</Text>
        <Image style={styles.marker} source={marker} />
      </TouchableOpacity>
    </View>
  );
};

export default MarkerComp;
