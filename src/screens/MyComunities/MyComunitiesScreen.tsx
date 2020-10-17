import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
//import CustomText from '../../custom/CustomText';
import CustomLayout from '../../custom/CustomLayout';
//import CustomButton from '../../custom/CustomButton';

import MyCommunity from './components/MyCommunity';
import CommunityMap from './components/CommunityMap';

export const { width, height } = Dimensions.get('window');

//import { useNavigation } from '@react-navigation/native';

//import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  type?: string;
  route: any;
  navigation: any;
}

const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height
  },
  text: {
    fontSize: 20,
    color: 'white',
    width: width * 0.8,
    textAlign: 'center'
  }
});

const MyComunitiesScreen: React.FC<Props> = ({ route }) => {
  //const navigation = useNavigation();
  const [mapString, setMapString] = useState<string>();
  const isFocused = useIsFocused();
  console.log('uuuuu', isFocused);

  useEffect(() => {
    let map;
    if (route.params) {
      map = route.params.map;
      setMapString(map);
    }
  }, [isFocused]);

  console.log(mapString);
  if (mapString === 'map') {
    return <CommunityMap />;
  }

  return (
    <CustomLayout style={styles.layout}>
      {/* check the user comunities array and return a list of them with FlatLis. If no comunityies at all, return : You are not in any community yet! Pleae consider requirenig to aderate to a community. Go to find community page. take the user to myCommuity whan clicking on one of the communities. */}

      <MyCommunity communityId={/* pass the community id here*/ '1234'} />
    </CustomLayout>
  );
};

export default MyComunitiesScreen;
