import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../../constants/styles';

interface Props {
  icon?: string;
  handleShow: any;
  show?: boolean;
  otherProps?: any;
  style?: {};
  multiline?: boolean;
}

const AppTextInput: React.FC<Props> = ({
  icon,
  show,
  style,
  multiline,
  handleShow,
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
        <TouchableOpacity onPress={handleShow}>
          <Text style={styles.show}>Show</Text>
        </TouchableOpacity>
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
  show: {
    marginRight: 20,
    marginLeft: -50
  }
});

export default AppTextInput;
