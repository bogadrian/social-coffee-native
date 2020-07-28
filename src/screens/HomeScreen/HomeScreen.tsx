import React from 'react';
import { StyleSheet, View } from 'react-native';

import Color from '../../constants/Color';

import CustomText from '../../custom/CustomText';
import CustomButton from '../../custom/CustomButton'
import CustomIcon from '../../custom/CustomIcon';
import CustomLayout from '../../custom/Layout';



interface Props {
  
}

const styles = StyleSheet.create({
  text: {color: 'red', fontSize: 30},
  buttonContainers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
    justifyContent: 'center'
  }
});

const HomeScreen: React.FC<Props> = () => {
  return (
    
    <CustomLayout>
        <CustomText type="extra-bold-italic" style={styles.text} >
        Hello World
        </CustomText>
        <View style={styles.buttonContainers}>
            <CustomButton  buttonWidth='30%' name="ios-person-add" size={20} color='white' fontSize={18}animation="jello" textType="bold" text="Press me" onPress={() => console.log('pressed')}/>
            <CustomButton buttonWidth='30%' name="ios-person-add" size={20} color='red' fontSize={18} animation="jello" textType="bold" text="Stop" onPress={() => console.log('pressed')}/>
            <CustomButton buttonWidth='30%' name="ios-person-add" size={20} color='yellow' fontSize={18} animation="jello" textType="bold" text="Go Now" onPress={() => console.log('pressed')}/>
        </View> 
    </CustomLayout>
  
  );
};


export default HomeScreen;
