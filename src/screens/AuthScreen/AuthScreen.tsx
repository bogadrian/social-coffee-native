import React from 'react';
import { StyleSheet, Text } from 'react-native';

import CustomLayout from '../../custom/CustomLayout'

interface Props {
  type: string;
}

const styles = StyleSheet.create({
  layout: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

const AuthScreen: React.FC<Props> = () => {
  return (
    <CustomLayout style={styles.layout}>
      <Text>Settings Screen here</Text>
    </CustomLayout>
  );
};

export default AuthScreen;
