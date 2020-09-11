import React from 'react';
import { Formik } from 'formik';

interface Props {
  initialValues: any,
  onSubmit: (values: any) => void,
  validationSchema: any,
  children?: any,
  oteherProps?: any
}

const AppForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  validationSchema,
  children
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <React.Fragment>{children}</React.Fragment>}
    </Formik>
  );
};

export default AppForm;
