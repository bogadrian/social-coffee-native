import React from 'react';
import { useFormikContext } from 'formik';

import AppTextInput from './AppTextInput';
import ErrorMessage from './ErrorMessage';

interface Props {
  onBlur?: (value: boolean) => void;
  onChangeText?: (value: string) => void;
  autoCapitalize: string;
  autoCorrect: boolean;
  icon?: string;
  show?: boolean;
  keyboardType?: string;
  name: any;
  handleShow?: any;
  secureTextEntry?: boolean;
  placeholder: string;
  textContentType: string;
  otherProps?: {};
  style?: any;
  multiline?: boolean;
}

const AppFormField: React.FC<Props> = ({
  name,
  handleShow,
  multiline,
  style,
  ...otherProps
}) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext<
    string[]
  >();

  return (
    <React.Fragment>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        handleShow={handleShow}
        style={style}
        multiline={multiline}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </React.Fragment>
  );
};

export default AppFormField;
