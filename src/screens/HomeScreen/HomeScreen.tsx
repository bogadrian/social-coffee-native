import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import Color from '../../constants/Color';

import CustomText from '../../custom/CustomText';
import CustomButton from '../../custom/CustomButton'
import CustomCard from '../../custom/CustomCard';
import CustomLayout from '../../custom/CustomLayout';



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

const HomeScreen: React.FC<Props> = () => {
  return (
    
    <CustomLayout>
        <Animatable.View animation="pulse" easing="ease-in-cubic" delay={1000}iterationCount="infinite" ><CustomText type="extra-bold-italic" style={styles.text} >
        Hello World
        </CustomText></Animatable.View>
        <View style={styles.buttonContainers}>
            <CustomButton  buttonWidth='30%' name="ios-person-add" size={15} color='white' fontSize={14}animation="jello" textType="bold" text="Press" onPress={() => console.log('pressed')}/>
            <CustomButton buttonWidth='30%' name="ios-person-add" size={15} color='red' fontSize={14} animation="jello" textType="bold" text="Stop" onPress={() => console.log('pressed')}/>
            <CustomButton buttonWidth='30%' name="ios-person-add" size={15} color='yellow' fontSize={14} animation="jello" textType="bold" text="Go Now" onPress={() => console.log('pressed')}/>
        </View> 
        <CustomCard  style={styles.text} text="some title" cardStyle={styles.card} image={require('../../../assets/Coffee.jpg')}/>
    </CustomLayout>
  
  );
};


export default HomeScreen;
