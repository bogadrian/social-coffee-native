import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import CustomButton from '../../custom/CustomButton';

import * as Linking from 'expo-linking';

export const ScanMenuScreeen = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<string | boolean>();
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: any) => {
    setScanned(true);
    Linking.openURL(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === '') {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={
          scanned ? () => console.log('It was scanned!') : handleBarCodeScanned
        }
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 100
          }}
        >
          <CustomButton
            name="search-web"
            buttonWidth="70%"
            size={18}
            color="cyan"
            fontSize={14}
            textType="regular"
            text="Tap To Scan Again"
            onPress={() => setScanned(false)}
          />
          <View style={{ marginTop: 40 }}>
            <CustomButton
              name="close"
              buttonWidth="40%"
              size={18}
              color="coral"
              fontSize={14}
              textType="regular"
              text="Close"
              onPress={() => navigation.navigate('Home')}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ScanMenuScreeen;
