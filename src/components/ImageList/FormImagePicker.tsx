import React from 'react';
import { useFormikContext } from 'formik';

import ErrorMessage from '../forms/ErrorMessage';
import ImageInputList from './ImageInputList';

interface Props {
  name: any;
  numberPhoto?: number;
}

type handle = (uri: string) => void;

const FormImagePicker: React.FC<Props> = ({ name, numberPhoto }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext<
    string[]
  >();
  const imageUris: any = values[name];

  const handleAdd: handle = (uri: string) => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const handleRemove: handle = (uri: string) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri: string) => imageUri !== uri)
    );
  };

  return (
    <React.Fragment>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
        numberPhoto={numberPhoto}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </React.Fragment>
  );
};

export default FormImagePicker;
