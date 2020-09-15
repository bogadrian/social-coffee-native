import React from "react";
import { StyleSheet } from "react-native";

import CustomText from "../../custom/CustomText";

interface Props {
  error: string | undefined | boolean;
  visible: boolean | undefined
}

const ErrorMessage: React.FC<Props> =({ error, visible }) =>{
  if (!visible || !error) return null;

  return <CustomText type="regular" style={styles.error}>{error}</CustomText>;
}

const styles = StyleSheet.create({
  error: { color: "red" },
});

export default ErrorMessage;
