import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../../constants/styles";

interface Props {
  icon: string,
  otherProps?: any
  style?: {}
}

const AppTextInput: React.FC<Props> =({ icon, ...otherProps }) => {
  return (
    <View style={ styles.container}>
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
        style={defaultStyles.text}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
