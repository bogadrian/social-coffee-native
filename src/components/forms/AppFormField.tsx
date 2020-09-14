import React from 'react';
import { useFormikContext } from 'formik';

import AppTextInput from './AppTextInput';
import ErrorMessage from './ErrorMessage';

interface Props {
  onBlur?: (value: boolean) => void;
  onChangeText?: (value: string) => void;
  autoCapitalize: string;
  autoCorrect: boolean;
  icon: string;
  show?: boolean;
  keyboardType?: string;
  name: any;
  handleShow?: any;
  secureTextEntry?: boolean;
  placeholder: string;
  textContentType: string;
  otherProps?: Object;
}

const AppFormField: React.FC<Props> = ({ name, handleShow, ...otherProps }) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext<
    string[]
  >();

  return (
    <React.Fragment>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        handleShow={handleShow}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </React.Fragment>
  );
};

export default AppFormField;
