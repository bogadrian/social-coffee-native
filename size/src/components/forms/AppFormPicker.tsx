import React from "react";
import { useFormikContext } from "formik";

import AppPicker from "./AppPicker";
import ErrorMessage from "./ErrorMessage";

interface Props {
  items: string[];
  name: any;
  placeholder: string
}

const AppFormPicker: React.FC<Props> = ({ items, name, placeholder })=> {
  const { errors, setFieldValue, touched, values } = useFormikContext<string[]>();

  return (
    <>
      <AppPicker
        items={items}
        onSelectItem={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        selectedItem={values[name]}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
