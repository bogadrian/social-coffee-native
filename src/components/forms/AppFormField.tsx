import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "./AppTextInput";
import ErrorMessage from "./ErrorMessage";

interface Props {
  onBlur?: (value: boolean) => void,
  onChangeText?: (value: string) => void, 
  autoCapitalize: string,
  autoCorrect: boolean,
  icon: string,
  keyboardType?: string,
  name: string,
  secureTextEntry?: boolean,
  placeholder: string,
  textContentType: string,
  otherProps?: Object
}

const AppFormField: React.FC<Props> = ({ name, ...otherProps }) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <React.Fragment>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </React.Fragment>
  );
}

export default AppFormField;
