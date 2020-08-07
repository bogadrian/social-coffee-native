import React, {useState, useEffect} from 'react';
import {  Text, View, StyleSheet, Dimensions, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import MapView, {  PROVIDER_GOOGLE } from "react-native-maps"
import * as Location from 'expo-location'

const screen = Dimensions.get("window");

import marker from '../assets/markers/marker4.png'

import Color from '../constants/Color'

import CustomTextAnimated from './CustomTextAnimated'

interface Props {}

interface StateRegion {
latitude: number | undefined, 
longitude: number | undefined, 
latitudeDelta: number, 
longitudeDelta: number
}
const  latitudeDelta = 0.0922
const longitudeDelta = 0.0421

const CustomDragMarker: React.FC<Props> = props => {
  const [loading, setLoading] = useState<boolean>(true)
  const [location, setLocation] = useState<{latitude: number, longitude: number} >(null);
  const [address, setAddress] = useState<object>(null);
  const [errorMsg, setErrorMsg] = useState<string>(null);
  const [coordsOnMarkerChange, setCoordsOnMarkerChange] = useState<object>(null)
  
  let latitude, longitude;
  if (location) {
    latitude = location.latitude
    longitude = location.longitude
  }else {
    latitude = 37.776406
    longitude = 122.458202
  }
  
  const [region, setRegion] = useState<StateRegion>({
           latitude,
           longitude,
           latitudeDelta,
           longitudeDelta
        })
        
    useEffect(() => {
      let update = true
      if (update) {
         (async () => {
               setLoading(true)
          try {
              let { status } = await Location.requestPermissionsAsync();

                if (status !== 'granted') {
                  alert("You can't register on this app; we are sorry ... ")
                  
                }
                let location = await Location.getCurrentPositionAsync(); 

                const {latitude, longitude} = await location.coords
                let address = await Location.reverseGeocodeAsync({latitude, longitude});

                if (location) {
                setLocation({latitude, longitude});
                setAddress(address[0])
                setRegion({latitude, longitude, latitudeDelta, longitudeDelta});
                setLoading(false)
                
              }
          }catch (err) {
            console.log(err)
          }
              
           
      })();
      }
        return function cleanup() {
          update = false
        }
     
    }, []);

  const onRegionChange = e => {
    setRegion(e)
    const lat = e.latitude;
    const log = e.longitude
    setCoordsOnMarkerChange({lat, log})
  }
  
     const okPressed = () => {
    console.log(coordsOnMarkerChange)
      // call redux action with lat and long from coordsOnMarkerChange
  }

  if(loading) {
    return <View style={styles.activity}>
            <ActivityIndicator size="large" />
            <CustomTextAnimated animation="pulse" type="extra-bold-italic" style={styles.text} >
        Waiting for the Maps ...
        </CustomTextAnimated>
          </View>
  }
      return (   
     <View style={{position: 'relative',}}>
       <MapView
        provider={PROVIDER_GOOGLE}
         style={styles.map}
         zoomEnabled={true}
         scrollEnabled={true} 
         initialRegion={region}
         onRegionChangeComplete={onRegionChange}
       />
      <View style={styles.markerFixed}>
            <TouchableOpacity onPress={okPressed} style={styles.touchble}>
            <Text style={styles.ok}>OK &#x1F44C;</Text>
            <Image style={styles.marker} source={marker} /> 
            </TouchableOpacity>
      
        </View>
    </View>
       )
  }
  


const styles = StyleSheet.create({
  activity: {
    width: screen.width *0.94,
    height: Math.round(screen.height * 0.40),
    alignSelf: 'center',
    position: 'relative',
    marginTop: 40
  },
    map: {
        width: screen.width *0.94,
        height: Math.round(screen.height * 0.60),
        alignSelf: 'center',
        position: 'relative',
    
      }, 
       markerFixed: {
        left: '50%', 
        top: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',  
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
      touchble:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 5,
    }, 
    text: {
      fontSize: 18, 
      letterSpacing: 2,
      color: Color.tertiary,
      padding: 4,
      textAlign: "center",
      marginTop: 30
    }
})
export default CustomDragMarker