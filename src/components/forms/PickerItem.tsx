import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "../../custom/CustomText";

interface Props {
  label: string,
  onPress: () => void,
}

const PickerItem: React.FC<Props> =({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <CustomText  type="extra-bold-italic" style={styles.text} >
        {label}
        </CustomText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});

export default PickerItem;
