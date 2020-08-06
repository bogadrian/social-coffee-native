import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native'
import MapView, { Marker } from "react-native-maps"
const screen = Dimensions.get("window");
import * as Yup from "yup";

import Color from '../../../constants/Color';

import { AppForm, AppFormField} from "../../../components/forms";
import SubmitButton from '../../../components/forms/SubmitButton'

import CustomLayout from '../../../custom/CustomLayout';
import CustomText from '../../../custom/CustomText';

interface Props {}

const validationSchema = Yup.object().shape({
  city: Yup.string().required().min(4).label('Address'), 
});

const Localization: React.FC<Props> = () => {
return  (
       
         <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
          <CustomLayout style={styles.customLayout}>
          <View style={styles.container}>
            <CustomText type="bold" style={styles.title}>Let's find where are you located!</CustomText>
            <View style={styles.subtitleContainer}>
            <CustomText type="thin-italic" style={styles.subtitle}>Pleae write a city, a street or any address you want and may be found on Google Maps!</CustomText></View>
            
               <View style={styles.form}>
            <AppForm
        initialValues={{ city: ""}}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
     
          autoCapitalize="none"
          autoCorrect={false}
          icon="map-search"
          keyboardType="default"
          name="city"
          placeholder="Your Address"
          textContentType="addressCity"
        />
        
         <SubmitButton buttonWidth='40%' style={styles.button}  size={15} color={Color.secondary} fontSize={14} animation="fadeIn" textType="bold" text="Find on Maps" />
         </AppForm>
         </View>
                <MapView
              style={styles.map}
              region={{
                latitude: 45.2144585,
                longitude: 9.5113977,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
              zoomEnabled={false}
              scrollEnabled={false}
            >
              <Marker
                coordinate={{
                  latitude: 45.2144585,
                  longitude: 9.5113977,
                }}
              />
            </MapView>
            <CustomText type="bold" style={styles.textEnd}>Is this place correct? </CustomText>
            </View>
        </CustomLayout>
          </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    marginTop: 30,
    marginBottom: 50,
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20
  },
form: {
 
width: '90%',
  alignItems: 'center',
  justifyContent: 'center'
},
    map: {
        width: screen.width *0.94,
        height: Math.round(screen.height * 0.60),
        alignSelf: 'center',
      },
      title: {
        alignItems: "center",
      textAlign: "center",
      fontSize:20,
      marginBottom: 5
      }, 
      subtitle: {
        textAlign: "center",
        fontSize: 18
      },
      subtitleContainer: {
        width: '90%'
      },
      customLayout: {
        flex: 1,
      },
      button: {
        marginBottom: 20,  
        alignSelf:"center"
      },
      textEnd: {
        marginTop: 20,
        marginBottom: 80,
        fontSize: 20,
        textAlign: "center",
      }
})

export default Localization;