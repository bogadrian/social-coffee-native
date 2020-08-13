import React from 'react';
import { ScrollView } from 'react-native';


import CustomLayout from '../../custom/CustomLayout';
import HomeNonAuth from './components/HomeNonAuth'

interface Props {  
  navigation: any,
  isInfo: boolean
}

const HomeScreen: React.FC<Props> = ({navigation, isInfo}) => {
  const auth = true
  
  console.log(isInfo)
  {!auth && navigation.navigate('My Comunities')}
  return (   
    <CustomLayout>
      <ScrollView>
      {auth && <HomeNonAuth />}
    </ScrollView>  
    </CustomLayout>
  );
};


export default HomeScreen;
