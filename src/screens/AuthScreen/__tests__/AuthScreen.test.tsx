import React from 'react';

import { render } from 'react-native-testing-library';

import AuthScreen from '../AuthScreen';

test('it renders AuthScreen', () => {
  render( <AuthScreen type="bold"/>);
});