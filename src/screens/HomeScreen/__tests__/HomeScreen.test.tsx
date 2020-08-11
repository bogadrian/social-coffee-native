import React from 'react';

import { render  } from '@testing-library/react-native';

import HomeScreen from '../HomeScreen';

test('it renders HomeScreen', () => {
  render( <HomeScreen navigation="bold" />);
});