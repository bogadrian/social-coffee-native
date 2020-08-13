import React from 'react';
import {  Dimensions,  StyleSheet, View } from 'react-native';

import SwiperFlatList from 'react-native-swiper-flatlist';

import InfoCard from './InfoCard/InfoCard'
import InfoCard4 from './InfoCard/infoCard4'

const WalkThrough: React.FC = () => {
 
    return (
      <View style={styles.container}>
        <SwiperFlatList
          showPagination
          paginationActiveColor="red"
          paginationDefaultColor="white"
        >
          <View style={[styles.child, { backgroundColor: 'white' }]}>
            <InfoCard />  
          </View>
          <View style={[styles.child, { backgroundColor: 'white' }]}>
            <InfoCard />  
          </View>
          <View style={[styles.child, { backgroundColor: 'white' }]}>
            <InfoCard />  
          </View>
          <View style={[styles.child, { backgroundColor: 'white' }]}>
            <InfoCard4 />  
          </View>
        </SwiperFlatList>
      </View>
    );
  }


export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  child: {
    height,
    width,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center'
  }
});
export default WalkThrough;
