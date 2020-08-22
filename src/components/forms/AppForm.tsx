import React from 'react';
import { Formik } from 'formik';

interface Props {
  initialValues: Element,
  onSubmit: () => void,
  validationSchema: {},
  children: React.ReactChild,
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
