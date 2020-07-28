import React from 'react';
import { StyleSheet, View } from 'react-native';

import CustomText from '../../custom/CustomText';

interface Props {
  type: string;
}

const styles = StyleSheet.create({
  layout: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

const AuthScreen: React.FC<Props> = () => {
  return (
    <View style={styles.layout}>
      <CustomText type="bold" >      
    Auth Screen
      </CustomText>
    </View>
  );
};



export default AuthScreen;
