import React from 'react';
import { Formik } from 'formik';

interface Props {
  initialValues: any,
  onSubmit: (value: any) => void,
  validationSchema: {},
  children: any,
  oteherProps?: any
}

const AppForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  validationSchema,
  children
}) => {
  console.log(onSubmit)
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
