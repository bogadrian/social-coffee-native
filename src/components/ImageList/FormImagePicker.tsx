import React from 'react';
import { useFormikContext } from 'formik';

import ErrorMessage from '../forms/ErrorMessage';
import ImageInputList from './ImageInputList';

interface Props {
  name: string
}

const FormImagePicker: React.FC<Props> = ({ name }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];
 

  const handleAdd = uri => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const handleRemove = uri => {
   
    setFieldValue(
      name,
      imageUris.filter(imageUri => imageUri !== uri)
    );
  };

  return (
    <React.Fragment>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </React.Fragment>
  );
}

export default FormImagePicker;
