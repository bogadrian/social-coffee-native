import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//import defaultStyles from '../constants/styles';
import Color from '../constants/Color';

export const { width, height } = Dimensions.get('window');

import CustomText from './CustomText';
import CustomButton from './CustomButton';

interface Props {
  handleButton1?: (NativeSyntheticEvent: any) => void;
  handleButton2?: (NativeSyntheticEvent: any) => void | undefined;
  button1?: string;
  button2?: string;
  buttonSize: number;
  buttonColor1?: string;
  buttonColor2?: string;
  buttonWidth: string;
  headText: string;
  backColor1?: string;
  backColor2?: string;
  name1?: string;
  name2?: string;
  iconName: string;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: height * 0.2,
    width: width * 0.9,
    borderRadius: 20,
    borderColor: 'grey',
    borderWidth: 2
  },
  text: {
    color: Color.backGroundPrimary,
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center'
  },
  icon: {
    alignSelf: 'flex-start',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: -50,
    marginRight: 10
  },
  button1: {},
  button2: {}
});
const CustomBox: React.FC<Props> = ({
  handleButton1,
  handleButton2,
  button1,
  button2,
  buttonSize,
  buttonColor1,
  buttonColor2,
  buttonWidth,
  headText,
  backColor1,
  backColor2,
  name1,
  name2,
  iconName
}) => {
  return (
    <View style={styles.container}>
      <CustomText type="bold" style={styles.text}>
        {headText}
      </CustomText>
      <View style={styles.icon}>
        <MaterialCommunityIcons
          name={iconName}
          size={80}
          color={Color.backGroundPrimary}
        />
      </View>
      <View style={styles.buttonContainer}>
        {button1 && (
          <CustomButton
            buttonWidth={buttonWidth}
            size={buttonSize}
            name={name1!}
            style={styles.button1}
            color={buttonColor1!}
            fontSize={14}
            textType="regular"
            text={button1}
            onPress={handleButton1!}
            backColor={backColor1}
          />
        )}
        {button2 && (
          <CustomButton
            name={name2!}
            buttonWidth={buttonWidth}
            size={buttonSize}
            style={styles.button2}
            color={buttonColor2!}
            fontSize={14}
            textType="regular"
            text={button2}
            onPress={handleButton2!}
            backColor={backColor2}
          />
        )}
      </View>
    </View>
  );
};

export default CustomBox;
