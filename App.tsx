import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import AppNavigator from './src/navigation/AppNavigator';

const fetchFonts = () => {
  return Font.loadAsync({
       'raleway-black': require('./assets/fonts/Raleway-Black.ttf'),
      'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
     'raleway-italic': require('./assets/fonts/Raleway-Italic.ttf'),
      'raleway-medium':require('./assets/fonts/Raleway-Medium.ttf'),
      'raleway-light':require('./assets/fonts/Raleway-Light.ttf'),
      'raleway-semibold':require('./assets/fonts/Raleway-SemiBold.ttf'),
       'raleway-extra-bold':require('./assets/fonts/Raleway-ExtraBold.ttf'),
     'raleway-extra-light':require('./assets/fonts/Raleway-ExtraLight.ttf'),
      'raleway-thin':require('./assets/fonts/Raleway-Thin.ttf'),
      'raleway-thin-italic':require('./assets/fonts/Raleway-ThinItalic.ttf'),
      'raleway-bold-italic':require('./assets/fonts/Raleway-BoldItalic.ttf'),
    'raleway-extra-bold-italic':require('./assets/fonts/Raleway-ExtraBoldItalic.ttf'),
      'raleway-regular':require('./assets/fonts/Raleway-Regular.ttf'),
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
