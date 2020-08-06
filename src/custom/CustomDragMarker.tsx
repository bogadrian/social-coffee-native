import React, {useState} from 'react';
import {  Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps"

const screen = Dimensions.get("window");

import marker from '../assets/markers/marker4.png'

import Color from '../constants/Color'

interface Props {}

interface StateRegion {
latitude: number, 
longitude: number, 
latitudeDelta: number, 
longitudeDelta: number
}


const  latitudeDelta = 0.0922
const longitudeDelta = 0.0421

const CustomDragMarker: React.FC<Props> = props => {
    
    const [region, setReg] = useState<StateRegion>({
           latitude: 45.2144585,
           longitude: 9.5113977,
           latitudeDelta,
           longitudeDelta
        })
    
  
    const okPressed = () => {
      console.log(region, 'ok pressed')
      // call redux action with lat and long
  }
  
  const onRegionChange = region => {
    setReg(region)
  
  }

    return (   
    <React.Fragment>    
      <MapView
        provider={PROVIDER_GOOGLE}
         style={styles.map}
         zoomEnabled={true}
         scrollEnabled={true} 
         initialRegion={region}
         onRegionChangeComplete={onRegionChange}
       >
        <View style={styles.markerFixed}>
            <TouchableOpacity onPress={okPressed} style={styles.touchble}>
             <Text style={styles.ok}>OK &#x1F44C;</Text>
            </TouchableOpacity>
            <Image style={styles.marker} source={marker} /> 
        </View>
      </MapView>
    </React.Fragment>
       )
}

const styles = StyleSheet.create({
    map: {
        width: screen.width *0.94,
        height: Math.round(screen.height * 0.60),
        alignSelf: 'center',
        position: 'relative'
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
        marginLeft: -24,
        padding: 10,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 20,
        overflow: 'hidden'
      },
      touchble:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 20,
        margin: 0,
        padding: 0,
        opacity: 0.9,
        backgroundColor: 'rgba(0,0,0,0.1) ',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 20,
        marginBottom: 5    
    }
})
export default CustomDragMarker