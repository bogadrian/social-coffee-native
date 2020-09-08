import React, {useState, useEffect} from 'react';
import {  Text, View, StyleSheet, Dimensions, Image, TouchableOpacity, ActivityIndicator, Alert} from 'react-native'
import MapView, {  PROVIDER_GOOGLE } from "react-native-maps"
import * as Location from 'expo-location'


const screen = Dimensions.get("window");

import marker from '../assets/markers/marker4.png'

import Color from '../constants/Color'

import CustomTextAnimated from './CustomTextAnimated'
import CustomText from './CustomText'

interface Props {}

interface ILocation { 
latitude: number , 
longitude: number , 
}

interface StateRegion {
  latitude: number , 
  longitude: number , 
latitudeDelta: number, 
longitudeDelta: number
}
const  latitudeDelta = 0.0922
const longitudeDelta = 0.0421

const CustomDragMarker: React.FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [location, setLocation] = useState<ILocation>();
 
  const [address, setAddress] = useState<any>(null);
 
  let latitude, longitude;
  if (location) {
    latitude = location.latitude
    longitude = location.longitude
  }else {
    latitude = 37.776406
    longitude = 122.458202
  }
  
  const [region, setRegion] = useState<StateRegion >({
           latitude,
           longitude,
           latitudeDelta,
           longitudeDelta
        })
        
  useEffect(() => {
     let update = true
        
         const fetchLoc = async () => {    
               setLoading(true)
          try {
              let { status } = await Location.requestPermissionsAsync();

                if (status !== 'granted') {
                  Alert.alert("You can't register on this app; we are sorry ... ")   
                }
                
                let location = await Location.getCurrentPositionAsync({
                  accuracy: Location.Accuracy.Highest
                }); 
             
                const {latitude, longitude} = await location.coords
               
                if (location && update) {
                setLocation({latitude, longitude});
                setRegion({latitude, longitude, latitudeDelta, longitudeDelta});
                setLoading(false)   
              }
          }catch (err) {
            console.log(err)
          }     
      };
      fetchLoc()
      
        return () => {
         update = false
        }  
  }, []);

  const onRegionChange: (e: any) => void =  e => {
    setRegion(e)
    const latitude = e.latitude;
    const longitude = e.longitude
    setLocation({latitude, longitude})
    const findAddress = async () => {
      let address = await Location.reverseGeocodeAsync({latitude, longitude});
      setAddress(address)
    }
    findAddress()
  }
  
  const addressFixed: (address: any, location?: {latitude: number, longitude: number}) => void = (address, location) => {
     
    const {country, city, street} = address[0]
    const {latitude, longitude } = location
   console.log(location)
   console.log(address[0])
   //save address and latitude, longitude to redux
  }
 
  const okPressed = async () => { 
     let {country, city, street} = address[0]
     if (country === null) country = 'No Country'
     if (city === null) city = 'No City'
     if (street === null) street = 'No Street'
     
      Alert.alert(
        "Is this address right?",
        `If the address you chose on the map is right, press ok, otherise return to the map and try again! 
        
        Country: ${country}, 
        City: ${city} 
        Street: ${street}`,
        [
          { text: "OK", onPress: () => addressFixed(address, location) },
          {
            text: "Try Again",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          } 
        ],
        { cancelable: false }
        )      // call redux action with lat and long from coordsOnMarkerChange
  }

  if(loading) {
    return (<View style={styles.activity}>
            <ActivityIndicator size="large" color="white"/>
            <CustomTextAnimated animation="pulse" type="extra-bold-italic" style={styles.text} >
        Waiting for the Maps ...
        </CustomTextAnimated>
            <CustomText  type="extra-bold-italic" style={styles.text1} >
       May take a few Seconds
        </CustomText>
          </View>)
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
    color: 'white',
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
    },
    text1: {
      fontSize: 14, 
      color: 'white',
      textAlign: "center"
    }
})

export default CustomDragMarker