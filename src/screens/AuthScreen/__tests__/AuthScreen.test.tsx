import React from 'react';

import { render,  } from '@testing-library/react-native';

import AuthScreen from '../AuthScreen';

test('it renders AuthScreen', () => {
  render( <AuthScreen type="bold"/>);
});