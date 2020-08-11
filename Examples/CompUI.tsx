import React from 'react';
import { StyleSheet, View } from 'react-native';

import CustomText from '../src/custom/CustomText';
import CustomTextAnimated from '../src/custom/CustomTextAnimated';
import CustomButton from '../src/custom/CustomButton'
import CustomCard from '../src/custom/CustomCard';



interface Props {  
}

const styles = StyleSheet.create({
  text: {
    color: 'red', fontSize: 30},
    buttonContainers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
    justifyContent: 'center'
  },
  card: {
    color: 'red', fontSize: 20,
  }
});

const CompUI: React.FC<Props> = () => {
  return (
    
    <React.Fragment>
       <CustomTextAnimated animation="pulse" type="extra-bold-italic" style={styles.text} >
        Hello World
        </CustomTextAnimated>
        <View style={styles.buttonContainers}>
            <CustomButton  buttonWidth='30%' name="account-heart-outline" size={15} color='white' fontSize={14}animation="fadeIn" textType="bold" text="Press" onPress={() => console.log('pressed')}/>
            <CustomButton buttonWidth='30%' name="account-heart-outline" size={15} color='red' fontSize={14} animation="pulse" textType="bold" text="Stop" onPress={() => console.log('pressed')}/>
            <CustomButton buttonWidth='30%' name="account-heart-outline" size={15} color='yellow' fontSize={14} animation="tada" textType="bold" text="Go Now" onPress={() => console.log('pressed')}/>
        </View> 
        <CustomCard  style={styles.text} text="some title" cardStyle={styles.card} image={require('../assets/Coffee.jpg')}/>
    </React.Fragment>
  
  );
};

export default CompUI;
