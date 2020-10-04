import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import CustomText from '../../custom/CustomText';
import CustomLayout from '../../custom/CustomLayout';
import CustomButton from '../../custom/CustomButton';

export const { width, height } = Dimensions.get('window');

import { useNavigation } from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  type?: string;
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

const MyComunitiesScreen: React.FC<Props> = () => {
  const navigation = useNavigation();
  const handleScan = () => {
    // pass the user.menuUrl here as param when comunity is ready
    navigation.navigate('Scan');
  };
  return (
    <CustomLayout style={styles.layout}>
      <CustomText type="extra-bold" style={styles.text}>
        My Community
      </CustomText>
      <CustomText type="extra-bold" style={styles.text}>
        Scan The Menu
      </CustomText>
      <TouchableOpacity onPress={handleScan}>
        <MaterialCommunityIcons color="white" name="camera" size={200} />
      </TouchableOpacity>
      <CustomButton
        buttonWidth="50%"
        name="camera"
        size={18}
        color="cyan"
        fontSize={12}
        textType="bold"
        text="Scan"
        onPress={handleScan}
      />
    </CustomLayout>
  );
};

export default MyComunitiesScreen;
