import React from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
export const { width, height } = Dimensions.get('window');



import CustomLayout from '../../../custom/CustomLayout'

interface Props {
  user: any
}

const styles = StyleSheet.create({
  layout: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', height },
  text: { 
    fontSize: 20, 
    color: 'white',
    width: width * 0.80,
    textAlign: 'center',
  }
});

const AuthScreen: React.FC<Props> = ({user}) => {
  
 console.log(user)
  return (
    <CustomLayout style={styles.layout}>
      <Text style={styles.text}>The Settings Here. implemnet update me, my blocked ppl, delete, logout. my comunities no, that has its own screen.   </Text>
    </CustomLayout>
  );
};


export default AuthScreen;
