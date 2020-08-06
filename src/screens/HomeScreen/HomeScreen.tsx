import React from 'react';
import { ScrollView } from 'react-native';

import CustomLayout from '../../custom/CustomLayout';
import HomeNonAuth from './components/HomeNonAuth'

interface Props {  
  navigation: any
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const auth = true
  
  {!auth && navigation.navigate('My Comunities')}
  return (   
    <CustomLayout>
      <ScrollView>
      {auth &&<HomeNonAuth />}
    </ScrollView>  
    </CustomLayout>
  );
};


export default HomeScreen;
