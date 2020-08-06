import React from 'react';

import { render, waitFor } from '@testing-library/react-native';

import MyComunitiesScreen from '../MyComunitiesScreen';

test('it renders MyComunities', async () => {
  const {getByText} = render( <MyComunitiesScreen type="bold"/>);
  await waitFor(() => getByText('MyComunities Screen'));
}); 