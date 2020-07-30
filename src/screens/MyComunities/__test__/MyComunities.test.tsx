import React from 'react';

import { render } from 'react-native-testing-library';

import MyComunitiesScreen from '../MyComunitiesScreen';

test('it renders MyComunities', () => {
  render( <MyComunitiesScreen type="bold"/>);
});