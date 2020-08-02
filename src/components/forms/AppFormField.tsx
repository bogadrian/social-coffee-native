import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "./AppTextInput";
import ErrorMessage from "./ErrorMessage";

interface Props {
  name: string,
  otherProps: any,
  icon: any,
  onBlur: () => void,
  onChangeText: (value: string) => void,
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
