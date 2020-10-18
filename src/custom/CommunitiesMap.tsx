import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from 'react-native';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

import axios from 'axios';

import { URL } from '../constants/variables';

import useDebounce from '../customHooks/useDebounce';

const screen = Dimensions.get('window');

import Color from '../constants/Color';

import CustomTextAnimated from './CustomTextAnimated';
import CustomText from './CustomText';

import MarkerComp from './Marker';

interface ILocation {
  latitude: number;
  longitude: number;
}

interface Props {
  reg: ILocation | undefined;
}
const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;

const CommunitiesMap: React.FC<Props> = ({ reg }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [location, setLocation] = useState<ILocation>();
  const [results, setResults] = useState<any>([]);

  const debouncedLocation = useDebounce(location, 500);

  const [region, setRegion] = useState<any>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });

  const onRegionChange = (e: any): void => {
    const latitude = e.latitude;
    const longitude = e.longitude;
    setLocation({ latitude, longitude });
  };

  useEffect(() => {
    let update = true;
    const fetchLoc = async () => {
      setLoading(true);
      try {
        let { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
          Alert.alert("You can't register on this app; we are sorry ... ");
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest
        });

        let { latitude, longitude } = await location.coords;

        if ((update && location) || (update && reg)) {
          reg !== undefined
            ? setRegion({
                latitude: reg.latitude,
                longitude: reg.longitude,
                latitudeDelta,
                longitudeDelta
              })
            : setRegion({ latitude, longitude, latitudeDelta, longitudeDelta });
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchLoc();

    return () => {
      update = false;
    };
  }, [reg]);

  useEffect(() => {
    const searchMap = async (location: any) => {
      let latitude, longitude;
      if (location) {
        latitude = location.latitude;
        longitude = location.longitude;
      }

      const lnglat = `${longitude},${latitude}`;

      try {
        const url = `${URL}/api/v1/geo/providers-within/500/center/${lnglat}`;
        const response = await axios.get(url);

        setResults(response.data.data.data);
      } catch (err) {
        console.log(err);
        setResults([]);
      }
    };
    searchMap(debouncedLocation);
  }, [debouncedLocation]);

  if (loading) {
    return (
      <View style={styles.activity}>
        <ActivityIndicator size="large" color="white" />
        <CustomTextAnimated
          animation="pulse"
          type="extra-bold-italic"
          style={styles.text}
        >
          Waiting for the Maps ...
        </CustomTextAnimated>
        <CustomText type="extra-bold-italic" style={styles.text1}>
          May take a few Seconds
        </CustomText>
      </View>
    );
  }
  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        zoomEnabled={true}
        scrollEnabled={true}
        initialRegion={region}
        onRegionChangeComplete={onRegionChange}
      >
        {results.map((res: any, index: number) => (
          <Marker
            key={index}
            coordinate={{
              latitude: res.position.coordinates[0],
              longitude: res.position.coordinates[1]
            }}
            onPress={() => console.log(res.name)}
          >
            <MarkerComp name={res.name} />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  activity: {
    width: screen.width * 0.94,
    height: Math.round(screen.height * 0.4),
    color: 'white',
    alignSelf: 'center',
    position: 'relative',
    marginTop: 40
  },
  map: {
    width: screen.width * 0.94,
    height: Math.round(screen.height * 0.6),
    alignSelf: 'center',
    position: 'relative'
  },
  markerFixed: {
    left: '50%',
    top: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute'
  },
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

export default CommunitiesMap;
