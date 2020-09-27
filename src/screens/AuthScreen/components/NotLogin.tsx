import React from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
export const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';

import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { cleanUserErrors } from '../../../redux/user/reducer.actions';

import Color from '../../../constants/Color';
import CustomLayout from '../../../custom/CustomLayout';
import CustomButton from '../../../custom/CustomButton';

interface Props {
  cleanUserErrors: () => AnyAction;
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
    textAlign: 'center',
    marginBottom: 20
  }
});

const NotLogin: React.FC<Props> = ({ cleanUserErrors }) => {
  const navigation = useNavigation();

  const handleClick = () => {
    cleanUserErrors();
    navigation.navigate('Account', { screen: 'Account' });
  };

  return (
    <CustomLayout style={styles.layout}>
      <Text style={styles.text}>You are not logged in. Please Login!</Text>
      <CustomButton
        buttonWidth="50%"
        name="account-heart-outline"
        size={20}
        color={Color.tertiary}
        fontSize={14}
        textType="bold"
        text="Go To Login"
        onPress={() => handleClick()}
      />
    </CustomLayout>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      cleanUserErrors
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(NotLogin);
