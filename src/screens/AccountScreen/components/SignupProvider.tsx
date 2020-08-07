import React, { PureComponent } from 'react';
import { Text, Dimensions, Image, StyleSheet, View, ScrollView, } from 'react-native';

import SwiperFlatList from 'react-native-swiper-flatlist';

interface Props {}

import Localization from './Localization'
import FormInfo from './FormInfo'
import Images from './Images'


const SignupProvider: React.FC<Props> = () => {
 
    return (
     
      <View style={styles.container}>
        <ScrollView>
        <SwiperFlatList
          showPagination
          paginationActiveColor="red"
          paginationDefaultColor="white"
        >
          <View style={[styles.child, { backgroundColor: 'white' }]}>
            <Localization />  
          </View>
          <View style={[styles.child, { backgroundColor: 'white' }]}>
            <FormInfo />  
          </View>
          <View style={[styles.child, { backgroundColor: 'white' }]}>
            <Images />  
          </View>
        </SwiperFlatList>
        </ScrollView>
      </View>
     
    );
  }


export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

  container: {  
    backgroundColor: 'white',
    flex: 1,  
    height: height * 0.9,
  
  },
  child: {
    flex: 1,
    height: height * 0.96,
    width,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center'
  }
});
export default SignupProvider;
