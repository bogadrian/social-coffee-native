import React, { PureComponent } from 'react';
import { Text, Dimensions, Image, StyleSheet, View, ScrollView, } from 'react-native';

import SwiperFlatList from 'react-native-swiper-flatlist';

import Color from '../../../constants/Color'

interface Props {}

import Localization from './Localization'
import FormInfo from './FormInfo'

const SignupProvider: React.FC<Props> = () => {
 
    return (
 
     
       
        <SwiperFlatList
          showPagination
          paginationActiveColor="red"
          paginationDefaultColor="white"
          style={styles.list}
        >
          <View style={styles.child}>
            <Localization />  
          </View>
          <View style={styles.child }>
            <FormInfo />  
          </View>
        </SwiperFlatList>
      
    
  
    );
  }


export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

  
  list: {
  
  },
  child: {
    flexGrow: 1,
    height: height * 0.94,
    width,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: Color.backGroundPrimary
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center'
  }
});
export default SignupProvider;
