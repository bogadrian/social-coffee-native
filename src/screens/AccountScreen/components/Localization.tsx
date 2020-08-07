import React from 'react';
import { View,  StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'

import * as Yup from "yup";

export const { width, height } = Dimensions.get('window');

import Color from '../../../constants/Color';

import { AppForm, AppFormField} from "../../../components/forms";
import SubmitButton from '../../../components/forms/SubmitButton'

import CustomLayout from '../../../custom/CustomLayout';
import CustomText from '../../../custom/CustomText';
import CustomDragMarker from '../../../custom/CustomDragMarker'

interface Props {}

const validationSchema = Yup.object().shape({
  city: Yup.string().required().min(4).label('Address'), 
});

const Localization: React.FC<Props> = () => {
  
  
return  (
       
         <View style={styles.container}>
          <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
            <ScrollView>
          <CustomLayout>
    
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
             <View style={{position: 'relative'}}>
                <CustomDragMarker />
              </View>
                
            <CustomText type="regular" style={styles.textEnd}> Please press OK if it is the right address </CustomText>
           
        </CustomLayout></ScrollView>
          </TouchableWithoutFeedback>
          </View>
          
    )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width
  },
  form: {
  width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  title: {
    alignItems: "center",
  textAlign: "center",
  fontSize:20,
  marginTop: 10,
  marginBottom: 5
  
  }, 
  subtitle: {
    textAlign: "center",
    fontSize: 18
  },
  subtitleContainer: {
    width: '90%'
  },
  button: {
    marginBottom: 20,  
    alignSelf:"center"
  },
  textEnd: {
    marginTop: 20,
    marginBottom: 80,
    fontSize: 14,
    textAlign: "center",
  }
})

export default Localization;