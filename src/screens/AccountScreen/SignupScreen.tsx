import React from 'react';

import {StyleSheet, View} from 'react-native'
import { useNavigation } from '@react-navigation/native';

import Color from '../../constants/Color'

import CustomLayout from "../../custom/CustomLayout";
import CustomText from "../../custom/CustomText";
import CustomButton from "../../custom/CustomButton";
import Divider from "../../custom/Divider";

interface Props {}

const styles = StyleSheet.create({
    text1: {
        fontSize: 20,
        marginBottom: 10,
    },
    text2: {
        fontSize: 14,
        marginBottom: 10
    },
    container: {
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    divider: {
        marginBottom: 20, 
        marginTop: 20
    },
    lastButton: {
        marginTop: 80
    }
}) 

const SignupScreen: React.FC<Props> = () => {
    const navigation = useNavigation();
    
   return ( 
   <CustomLayout style={styles.container}>
        <CustomText type="extra-bold-italic" style={styles.text1} >
        SignUp as Regular User
        </CustomText> 
        <CustomText type="thin" style={styles.text2} >
        What is a Regular User?
        </CustomText> 
        <CustomButton  buttonWidth='50%' name="ios-person-add" size={15} color={Color.tertiary} fontSize={14} animation="tada" textType="bold" text="User Signup" onPress={() => navigation.navigate('SignupUser')}/>
        <Divider style={styles.divider}/>
        <CustomText type="extra-bold-italic" style={styles.text1} >
        SignUp as Coffe Provider
        </CustomText> 
        <CustomText  type="thin" style={styles.text2} >
        What is a Coffe Provider?
        </CustomText> 
        <CustomButton  buttonWidth='50%' name="ios-person-add" size={15} color='coral' fontSize={14} textType="bold" text="Provider Signup" onPress={() => navigation.navigate('SignupProvider')}/>
        <CustomButton  buttonWidth='40%' style={styles.lastButton} name="ios-person-add" size={15} color='white' fontSize={14} textType="bold" text="Back to Login" onPress={() => navigation.navigate('Account')}/>
   </CustomLayout>
   )
}

export default SignupScreen