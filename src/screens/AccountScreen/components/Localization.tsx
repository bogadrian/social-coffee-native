import React from 'react';
import { View,  StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native'

import * as Yup from "yup";

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
         
                <CustomDragMarker />
                
            <CustomText type="bold" style={styles.textEnd}>Is this place correct? </CustomText>
            </View>
        </CustomLayout>
          </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
  customLayout: {
    flexGrow: 1,
    width: '100%'
  },
  container: {
    flexGrow: 1,
    width: '100%',
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