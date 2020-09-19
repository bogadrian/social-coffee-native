import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import CustomText from '../../../custom/CustomText';
import CustomLayout from '../../../custom/CustomLayout';
import CustomButton from '../../../custom/CustomButton';

export const { width, height } = Dimensions.get('window');

interface Props {}

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
    width: width * 0.6,
    textAlign: 'center',
    marginBottom: 30
  }
});

const ConfirmEmail: React.FC<Props> = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Account');
  };

  return (
    <CustomLayout style={styles.layout}>
      <CustomText type="extra-bold" style={styles.text}>
        Your email has been confirmed! Please login now!
      </CustomText>
      <CustomButton
        name="account-heart-outline"
        buttonWidth="50%"
        size={18}
        color="cyan"
        fontSize={14}
        textType="regular"
        text="Go to Login"
        onPress={handlePress}
      />
    </CustomLayout>
  );
};

export default ConfirmEmail;
