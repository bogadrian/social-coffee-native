import React from 'react'
import {View, StyleSheet, Button} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native';

import Color from '../../constants/Color'

 interface Props {}
 
const InfoCard4: React.FC<Props> = () => {
  const navigation = useNavigation();
  
const storeInfo = async () => {  
        try {
           await AsyncStorage.setItem('Info', JSON.stringify(false))
           
           navigation.navigate('Home Stack', {screen: 'My Tabs'})
        }catch (err) {
            console.log(err)
        }
    }
   
return (
    <View style={styles.container}>
        <Button title="close" onPress={storeInfo} />   
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: '95%',
        borderWidth: 1,
        marginTop: 30,
        borderColor: 'white',
        backgroundColor: Color.backGroundPrimary,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 40
    }
})

  export default InfoCard4

