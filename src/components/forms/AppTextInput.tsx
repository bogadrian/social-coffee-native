import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';

import { switchText } from '../../redux/handleTextPassword/textPassword.actions';

import { connect } from 'react-redux';
import defaultStyles from '../../constants/styles';

import Color from '../../constants/Color';

interface Props {
  icon?: string;
  show?: boolean;
  otherProps?: any;
  style?: {};
  multiline?: boolean;
  switchText: () => AnyAction;
}

const AppTextInput: React.FC<Props> = ({
  icon,
  show,
  style,
  multiline,
  switchText,
  ...otherProps
}) => {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={style ? style : defaultStyles.text}
        multiline={multiline}
        {...otherProps}
      />
      {show && (
        <View style={styles.showContainer}>
          <TouchableOpacity onPress={switchText}>
            <MaterialCommunityIcons
              name="eye"
              size={30}
              color={Color.backGroundPrimary}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '98%'
  },
  icon: {
    marginRight: 10
  },
  show: { marginTop: 5 },
  showContainer: {
    marginRight: -20,
    marginLeft: -100,
    width: 120,
    height: 32,
    alignItems: 'center'
  }
});
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      switchText
    },
    dispatch
  );
export default connect(null, mapDispatchToProps)(AppTextInput);
