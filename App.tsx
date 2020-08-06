import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import AppNavigator from './src/navigation/AppNavigator';

const fetchFonts = () => {
  return Font.loadAsync({
       'raleway-black': require('./src/assets/fonts/Raleway-Black.ttf'),
      'raleway-bold': require('./src/assets/fonts/Raleway-Bold.ttf'),
     'raleway-italic': require('./src/assets/fonts/Raleway-Italic.ttf'),
      'raleway-medium':require('./src/assets/fonts/Raleway-Medium.ttf'),
      'raleway-light':require('./src/assets/fonts/Raleway-Light.ttf'),
      'raleway-semibold':require('./src/assets/fonts/Raleway-SemiBold.ttf'),
       'raleway-extra-bold':require('./src/assets/fonts/Raleway-ExtraBold.ttf'),
     'raleway-extra-light':require('./src/assets/fonts/Raleway-ExtraLight.ttf'),
      'raleway-thin':require('./src/assets/fonts/Raleway-Thin.ttf'),
      'raleway-thin-italic':require('./src/assets/fonts/Raleway-ThinItalic.ttf'),
      'raleway-bold-italic':require('./src/assets/fonts/Raleway-BoldItalic.ttf'),
    'raleway-extra-bold-italic':require('./src/assets/fonts/Raleway-ExtraBoldItalic.ttf'),
      'raleway-regular':require('./src/assets/fonts/Raleway-Regular.ttf'),
  });
};

const App: React.FC = () => {
  const [fontLoaded, setFontLoaded] = useState(false); 
  
  if (!fontLoaded) {
  return (
    <AppLoading
      startAsync={fetchFonts}
      onFinish={() => {
        setFontLoaded(true);
      }}
    />
  );
}
  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'blue'
  }
});

export default App;
